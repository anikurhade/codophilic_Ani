"use client";

import { FormEvent, useEffect, useState } from "react";

type Comment = {
  id: string;
  author_name: string | null;
  linkedin_url: string | null;
  body: string;
  created_at: string;
};

function isComment(value: unknown): value is Comment {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "string"
    && (candidate.author_name === null || typeof candidate.author_name === "string")
    && (candidate.linkedin_url === null || typeof candidate.linkedin_url === "string")
    && typeof candidate.body === "string"
    && typeof candidate.created_at === "string";
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? "Could not load comments.");
        if (!Array.isArray(payload.comments) || !payload.comments.every(isComment)) {
          throw new Error("Comments service returned an invalid response.");
        }
        setComments(payload.comments);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Could not load comments.");
      } finally {
        setLoading(false);
      }
    };
    void loadComments();
  }, [slug]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          body,
          anonymous,
          authorName: anonymous ? null : name,
          linkedinUrl: anonymous ? null : linkedinUrl,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Your comment could not be submitted.");
      if (!isComment(payload.comment)) throw new Error("Comments service returned an invalid response.");
      setComments((current) => [...current, payload.comment]);
      setBody("");
      setName("");
      setLinkedinUrl("");
      setNotice("Your comment has been posted.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Your comment could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="blog-comments" aria-labelledby="comments-title">
      <div className="blog-comments-heading">
        <p className="eyebrow">Join the conversation</p>
        <h2 id="comments-title">Comments</h2>
      </div>
      <form className="comment-form" onSubmit={submit}>
        <label className="comment-anonymous">
          <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} />
          Comment anonymously
        </label>
        {!anonymous && (
          <div className="comment-identity">
            <label>
              Name
              <input required minLength={1} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
              LinkedIn profile URL
              <input required type="url" placeholder="https://www.linkedin.com/in/your-profile" value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} />
            </label>
          </div>
        )}
        <label>
          Your comment
          <textarea required minLength={1} maxLength={2000} rows={5} value={body} onChange={(event) => setBody(event.target.value)} />
        </label>
        <button className="comment-submit" type="submit" disabled={submitting}>
          {submitting ? "Posting…" : "Post comment"}
        </button>
        <p className="comment-feedback" role="status">{error || notice}</p>
      </form>
      <div className="comment-list" aria-live="polite">
        {loading ? <p>Loading comments…</p> : comments.length === 0 ? <p>No comments yet. Start the conversation.</p> : comments.map((comment) => (
          <article className="comment-card" key={comment.id}>
            <div className="comment-author">
              <strong>{comment.author_name ?? "Anonymous"}</strong>
              {comment.linkedin_url && <a className="linkedin-badge" href={comment.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn profile for ${comment.author_name}`}>in</a>}
              <time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString()}</time>
            </div>
            <p>{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
