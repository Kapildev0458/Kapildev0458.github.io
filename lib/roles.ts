// Each role is one "view" of the hero. Switching it changes the headline,
// the intro, the sample output card and which projects are shown first.

export type RoleId = "ml" | "genai" | "data";

export type Role = {
  id: RoleId;
  label: string;
  headline: { before: string; em: string; after: string };
  lede: string;
  sample: {
    file: string;
    model: string;
    // [key, value]: the value is written as JSON (quoted strings, bare numbers).
    lines: [string, string][];
  };
};

export const roles: Role[] = [
  {
    id: "ml",
    label: "AI/ML Engineer",
    headline: { before: "I build AI systems that work on ", em: "real data", after: "." },
    lede:
      "I'm Kapil, an AI/ML engineer and M.E. Computer Science graduate from BITS Pilani. I fine-tune LLMs, build data and document-AI pipelines, and ship models into real tools.",
    sample: {
      file: "invoice_scan.jpg → verdict",
      model: "2× ViT + OpenCV forensics",
      lines: [
        ["verdict", '"Suspicious"'],
        ["risk_score", "64"],
        ["c2pa_credentials", '"not found"'],
        ["jpeg_artifacts", '"high"'],
        ["text_skew", '"irregular"'],
      ],
    },
  },
  {
    id: "genai",
    label: "GenAI & Agents",
    headline: { before: "I fine-tune LLMs and connect agents to ", em: "real tools", after: "." },
    lede:
      "I train small LLMs with LoRA for focused tasks, build RAG and LangGraph agent pipelines, and give agents safe access to real systems through MCP servers and a gateway.",
    sample: {
      file: "agent → mcp-gateway",
      model: "tools/call",
      lines: [
        ["server", '"store-mcp"'],
        ["tool", '"orders.list"'],
        ["acting_as", '"member@team"'],
        ["status", '"processing"'],
        ["audit_log", '"recorded"'],
      ],
    },
  },
  {
    id: "data",
    label: "Data Science",
    headline: { before: "I turn messy documents into ", em: "clean data", after: "." },
    lede:
      "I build pipelines that turn PDFs and images into structured, checkable data, and train and evaluate models end to end, from preprocessing to accuracy on unseen data.",
    sample: {
      file: "sanction_letter.pdf → JSON",
      model: "Qwen2.5-1.5B + LoRA",
      lines: [
        ["lender", '"Example Finance Ltd"'],
        ["borrower", '"ABC Traders Pvt Ltd"'],
        ["sanctioned_amount", '"₹25,00,000"'],
        ["interest_rate", '"14.5% p.a."'],
        ["tenure_months", '"12"'],
      ],
    },
  },
];
