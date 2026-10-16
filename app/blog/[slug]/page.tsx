import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogComments from "@/components/BlogComments";
import { blogArticles, getArticleReadTime } from "@/content/blogs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((item) => item.slug === slug);
  if (!article) return { title: "Article not found" };

  const image = article.sections.find((section) => "image" in section)?.image;
  return {
    title: `${article.title} | Anirudha Kurhade`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
  };
}

export function generateStaticParams() {
  return blogArticles.map(({ slug }) => ({ slug }));
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const moreArticles = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="article-page">
      <Link className="blog-back mono" href="/blog">← All notes</Link>
      <p className="eyebrow">{article.category} · {article.date} · {getArticleReadTime(article)} read</p>
      <h1>{article.title}</h1>
      <p className="article-intro">{article.intro}</p>
      <article className="article-body prose prose-zinc dark:prose-invert max-w-none">
        {article.sections.map((section, index) => (
          <section key={`${article.slug}-${index}`}>
            {"heading" in section && <h2>{section.heading}</h2>}
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {"image" in section && section.image && (
              <figure className="article-figure">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  width={section.image.width}
                  height={section.image.height}
                  sizes="(max-width: 760px) 100vw, 68ch"
                />
                <figcaption>{section.image.caption}</figcaption>
              </figure>
            )}
          </section>
        ))}
      </article>
      <section className="more-articles" aria-labelledby="more-articles-title">
        <div className="more-articles-heading">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 id="more-articles-title">More <em>articles.</em></h2>
          </div>
          <Link className="accent" href="/blog">Explore Blog Dashboard ↗</Link>
        </div>
        <div className="more-articles-grid">
          {moreArticles.map((item) => (
            <Link className="post-card" href={`/blog/${item.slug}`} key={item.slug}>
              <span className="mono">{item.category} · {getArticleReadTime(item)} read</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <span className="accent">Read article ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <BlogComments slug={article.slug} />
    </main>
  );
}
