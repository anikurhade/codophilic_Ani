import { blogArticles, getArticleReadTime } from "@/content/blogs";
import { portfolioAchievements, portfolioEducation, portfolioExperience, portfolioProfile } from "@/content/portfolio";
import { projects } from "@/content/projects";

const projectContext = projects
  .filter((project) => project.visible)
  .map((project) => {
    const article = blogArticles.find((post) => post.slug === project.href?.replace("/blog/", ""));
    return [
      `- ${project.title} [${project.status}]: ${project.description}`,
      `  Architecture: ${project.details}`,
      `  Stack: ${project.tech.join(", ")}`,
      article ? `  Related article: ${article.title} (${article.category}, ${getArticleReadTime(article)}) — ${article.excerpt} URL: /blog/${article.slug}` : "",
    ].filter(Boolean).join("\n");
  })
  .join("\n");

const articleContext = blogArticles
  .map((article) => `- ${article.title} [${article.category}, ${getArticleReadTime(article)}]: ${article.excerpt} URL: /blog/${article.slug}`)
  .join("\n");

const experienceContext = portfolioExperience
  .map((experience) => [
    `- Initiative ${experience.number}: ${experience.label}${experience.visible ? "" : " (temporarily hidden from the public timeline)"}`,
    `  ${experience.title}`,
    ...experience.highlights.map((highlight) => `  ${highlight.label}: ${highlight.text}`),
  ].join("\n"))
  .join("\n");

export function buildAgenticTwinPrompt(funFacts: readonly string[]) {
  const education = portfolioEducation
    .map(({ credential, institution, result }) => `- ${credential}, ${institution}${result ? ` (${result})` : ""}`)
    .join("\n");
  const achievements = portfolioAchievements
    .map(({ title, description }) => `- ${title}: ${description}`)
    .join("\n");

  return `You are the Agentic Twin for ${portfolioProfile.name}. Be warm, concise, conversational, and accurate. Use the portfolio knowledge below as your source of truth. Do not invent implementation details, links, outcomes, or personal facts.

IDENTITY
${portfolioProfile.role}. ${portfolioProfile.summary}
${portfolioProfile.migration}

EDUCATION
${education}

MILESTONES
${achievements}

TRANSUNION EXPERIENCE (all three initiatives are included for context; initiative 02 is intentionally hidden from the public timeline)
${experienceContext}

FEATURED PROJECTS
${projectContext}

LATEST BLOGS
${articleContext}

CONTACT
- Email: ${portfolioProfile.contact.email}
- LinkedIn: ${portfolioProfile.contact.linkedIn}
- GitHub: ${portfolioProfile.contact.github}

CONVERSATION BEHAVIOR
- Answer portfolio questions directly from the source facts above. If a detail is not present, say you do not have that detail rather than guessing.
- For benign off-topic questions, briefly play along with warmth or light engineering humor when appropriate. Then naturally share one (not both) of the fresh facts below and gently bridge back to a relevant project, Java/distributed-systems story, or article. Vary the wording and the bridge; do not use a stock refusal or say you are only allowed to discuss the portfolio.
- If recent conversation shows that you already shared a fact, choose a different supplied fact. Avoid repeating the same pivot.
- Treat harmful or high-stakes requests with appropriate safety, regardless of the conversational pivot instructions.

FRESH FUN FACTS FOR THIS TURN
${funFacts.map((fact) => `- ${fact}`).join("\n")}`;
}
