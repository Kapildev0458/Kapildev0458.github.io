export type Track = "ml" | "genai" | "data";

export const tracks: { id: Track; label: string }[] = [
  { id: "ml", label: "AI/ML" },
  { id: "genai", label: "GenAI & agents" },
  { id: "data", label: "Data science" },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  meta: string;
  summary: string;
  points: string[];
  tags: string[];
  tracks: Track[];
  fact: { num: string; label: string };
  link?: { href: string; label: string };
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "loan-letter-extraction",
    title: "Loan letter extraction with a fine-tuned LLM",
    year: "2026",
    tagline: "Qwen2.5-1.5B + LoRA turns sanction letter PDFs into JSON.",
    meta: "Apr – May 2026 · Built at Oxyzo",
    summary:
      "Loan sanction letters come as PDFs in many different layouts. Checking them by hand is slow. I trained a small LLM to read them and return clean, structured JSON that the team can check against their records.",
    points: [
      "Made a training dataset by turning PDF text and expected answers into JSONL chat format.",
      "Fine-tuned Qwen2.5-1.5B-Instruct with LoRA, 4-bit quantization and long-context training.",
      "The output is used for data checks and to find mismatches.",
    ],
    tags: ["Qwen2.5", "LoRA", "Unsloth", "TRL SFTTrainer", "Python"],
    tracks: ["genai", "data", "ml"],
    fact: { num: "5", label: "document formats from different lenders" },
    note: "Company project · code is private",
  },
  {
    slug: "ai-document-detector",
    title: "AI-generated document detector",
    year: "2026",
    tagline: "Two ViTs + image forensics give a 0–100 risk score.",
    meta: "May – Jun 2026 · Built at Oxyzo",
    summary:
      "Fake or AI-made documents are a real risk in lending. This system checks images and PDFs and labels each one as Real, Suspicious or Fake, with a risk score from 0 to 100.",
    points: [
      "Combines two fine-tuned Vision Transformer models with forensic checks done in OpenCV.",
      "Forensic checks look at text layout, skew, margins, JPEG artifacts, noise and frequency patterns (FFT/DCT).",
      "Reads C2PA content credentials to flag files that are marked as AI-generated.",
    ],
    tags: ["Vision Transformers", "Hugging Face", "OpenCV", "C2PA", "Python"],
    tracks: ["ml", "data"],
    fact: { num: "0–100", label: "risk score, with 3 verdicts: Real, Suspicious, Fake" },
    note: "Company project · code is private",
  },
  {
    slug: "mcp-gateway",
    title: "WooCommerce hosting with a team MCP gateway",
    year: "2026",
    tagline: "Stores on Kubernetes; 3+ MCP servers behind one endpoint.",
    meta: "Oct 2026 · Personal project",
    summary:
      "A platform that hosts online stores on Kubernetes and lets a team's AI agents work with store data safely through one gateway.",
    points: [
      "Deployed WooCommerce with Helm charts to kind and k3s, with Ingress, storage, Secrets and health probes.",
      "Wrote a custom MCP server for products and orders, and a gateway that joins 3+ MCP servers behind one endpoint.",
      "React dashboard with admin and member roles, revocable API keys, a full audit log of tool calls, and an LLM chat agent that acts as the logged-in user.",
    ],
    tags: ["Kubernetes", "Helm", "MCP", "React", "LLM agents"],
    tracks: ["genai"],
    fact: { num: "3+", label: "MCP servers behind one endpoint" },
    link: { href: "https://github.com/Kapildev0458", label: "View on GitHub ↗" },
  },
  {
    slug: "human-activity-recognition",
    title: "Human activity recognition from video",
    year: "2025",
    tagline: "ConvLSTM vs LRCN on UCF50; 83.6% test accuracy.",
    meta: "Jan – Feb 2025",
    summary: "A deep learning model that watches a short video and says what action the person is doing.",
    points: [
      "Built and compared two models, ConvLSTM and LRCN, on a subset of the UCF50 dataset.",
      "Handled video preprocessing, training and evaluation.",
      "Made a pipeline that predicts actions on new, unseen videos.",
    ],
    tags: ["TensorFlow", "Keras", "OpenCV", "scikit-learn"],
    tracks: ["ml", "data"],
    fact: { num: "83.6%", label: "test accuracy with the LRCN model" },
    link: { href: "https://github.com/Kapildev0458", label: "View on GitHub ↗" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
