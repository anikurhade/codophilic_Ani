export const portfolioProfile = {
  name: "Anirudha Kurhade",
  role: "Java, Spring Boot & Distributed Systems Engineer",
  summary:
    "I build Java and Spring Boot backends, distributed data pipelines, and Apache Spark/PySpark reconciliation systems. I apply custom AI tools to practical engineering bottlenecks rather than treating AI as a substitute for systems engineering.",
  migration:
    "Enterprise C-to-Java modernization and reconciliation involving more than 300 million financial records.",
  contact: {
    email: "anikurhade2002@gmail.com",
    linkedIn: "https://www.linkedin.com/in/anikurhade/",
    github: "https://github.com/anikurhade",
  },
} as const;

export const portfolioEducation: readonly {
  credential: string;
  institution: string;
  result?: string;
  dates?: string;
}[] = [
  { credential: "PGCP in AI Engineering and AIOps", institution: "IIT Roorkee" },
  { credential: "BTech in Computer Engineering", institution: "VIIT", result: "9.4 GPA" },
  {
    credential: "Diploma in Computer Engineering",
    institution: "Government Polytechnic Pune",
    result: "96.47%",
    dates: "Jun 2018 - Jun 2021",
  },
] as const;

export const portfolioAchievements = [
  {
    title: "AWS Summit Mumbai 2026",
    description: "AI Prompt Injection Challenge Winner.",
  },
] as const;

export const portfolioCoreStack = [
  "Java",
  "Spring Boot",
  "Apache Spark",
  "Microservices",
  "PySpark",
  "Applied GenAI (LangGraph)",
] as const;

export const portfolioExperience = [
  {
    number: "01",
    visible: true,
    label: "DATA TRANSFORM MODERNIZATION & PRISM AI",
    title: "Modernizing financial data systems at enterprise scale.",
    highlights: [
      {
        label: "Role & Scope",
        text: "Spearheaded the legacy migration of business rules from C to Java, architecting a validation engine capable of processing 300M+ records across massive financial files for multiple banking clients.",
      },
      {
        label: "The Data Compare Engine",
        text: "Engineered a batch-capable data comparison program to run field-by-field validations between legacy and modernized outputs, reconciling 1,000+ assets containing millions of records in a matter of hours.",
      },
      {
        label: "PRISM AI Agent",
        text: "Architected PRISM, a specialized AI agent equipped with data architecture context. It identifies validation discrepancies and helps generate targeted PySpark queries from comparison logs.",
      },
    ],
  },
  {
    number: "02",
    visible: false,
    label: "AI-DRIVEN WORKSPACE ORCHESTRATION / ATLASSIAN ROVO",
    title: "Turning operational silos into an intelligent coordination layer.",
    highlights: [
      {
        label: "Problem & Vision",
        text: "Identified operational silos within the Pune Impact Business Group (IBG) and proposed a centralized coordination platform.",
      },
      {
        label: "The Execution",
        text: "Designed an automated AI workflow using Atlassian Rovo, Jira, and Confluence.",
      },
      {
        label: "Agent Capabilities",
        text: "The workflow uses meeting-minutes context to draft event plans, Jira stories and subtasks, deadlines, delay alerts, and Confluence execution reports.",
      },
    ],
  },
  {
    number: "03",
    visible: true,
    label: "INTERNAL ASSET TAGGING & RBAC DASHBOARD",
    title: "Replacing fragmented audits with a secure source of truth.",
    highlights: [
      {
        label: "End-to-End Ownership",
        text: "Drove the product lifecycle from identifying facility auditing bottlenecks and pitching a solution to business stakeholders through deployment.",
      },
      {
        label: "The Platform",
        text: "Developed and hosted a Streamlit QR creation and scanning application on internal TransUnion servers, replacing isolated Excel workflows with a centralized dashboard and role-based access control for Pune asset audits.",
      },
    ],
  },
] as const;
