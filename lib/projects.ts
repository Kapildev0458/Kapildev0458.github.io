import type { RoleId } from "./roles";

export type Project = {
  title: string;
  meta: string;
  summary: string;
  points: string[];
  tags: string[];
  roles: RoleId[];
  fact: { num: string; label: string };
  link?: { href: string; label: string };
  note?: string;
};

export const projects: Project[] = [
  {
    title: "Loan Letter Extraction with a Fine-tuned LLM",
    meta: "Apr – May 2026 · Built at Oxyzo",
    summary:
      "Loan sanction letters come as PDFs in many different layouts. Checking them by hand is slow. I trained a small LLM to read them and return clean, structured JSON that the team can check against their records.",
    points: [
      "Made a training dataset by turning PDF text and expected answers into JSONL chat format.",
      "Fine-tuned Qwen2.5-1.5B-Instruct with LoRA, 4-bit quantization and long-context training.",
      "The output is used for data checks and to find mismatches.",
    ],
    tags: ["Qwen2.5", "LoRA", "Unsloth", "TRL SFTTrainer", "Python"],
    roles: ["genai", "data", "ml"],
    fact: { num: "5", label: "document formats from different lenders" },
    note: "Company project · code is private",
  },
  {
    title: "AI-Generated Document Detector",
    meta: "May – Jun 2026 · Built at Oxyzo",
    summary:
      "Fake or AI-made documents are a real risk in lending. This system checks images and PDFs and labels each one as Real, Suspicious or Fake, with a risk score from 0 to 100.",
    points: [
      "Combines two fine-tuned Vision Transformer models with forensic checks done in OpenCV.",
      "Forensic checks look at text layout, skew, margins, JPEG artifacts, noise and frequency patterns (FFT/DCT).",
      "Reads C2PA content credentials to flag files that are marked as AI-generated.",
    ],
    tags: ["Vision Transformers", "Hugging Face", "OpenCV", "C2PA", "Python"],
    roles: ["ml", "data"],
    fact: { num: "0–100", label: "risk score, with 3 verdicts: Real, Suspicious, Fake" },
    note: "Company project · code is private",
  },
  {
    title: "WooCommerce Hosting with a Team MCP Gateway",
    meta: "Oct 2026",
    summary:
      "A platform that hosts online stores on Kubernetes and lets a team's AI agents work with store data safely through one gateway.",
    points: [
      "Deployed WooCommerce with Helm charts to kind and k3s, with Ingress, storage, Secrets and health probes.",
      "Wrote a custom MCP server for products and orders, and a gateway that joins 3+ MCP servers behind one endpoint.",
      "React dashboard with admin and member roles, revocable API keys, a full audit log of tool calls, and an LLM chat agent that acts as the logged-in user.",
    ],
    tags: ["Kubernetes", "Helm", "MCP", "React", "LLM agents"],
    roles: ["genai"],
    fact: { num: "3+", label: "MCP servers behind one endpoint" },
    link: { href: "https://github.com/Kapildev0458", label: "View on GitHub ↗" },
  },
  {
    title: "Human Activity Recognition from Video",
    meta: "Jan – Feb 2025",
    summary: "A deep learning model that watches a short video and says what action the person is doing.",
    points: [
      "Built and compared two models, ConvLSTM and LRCN, on a subset of the UCF50 dataset.",
      "Handled video preprocessing, training and evaluation.",
      "Made a pipeline that predicts actions on new, unseen videos.",
    ],
    tags: ["TensorFlow", "Keras", "OpenCV", "scikit-learn"],
    roles: ["ml", "data"],
    fact: { num: "83.6%", label: "test accuracy with the LRCN model" },
    link: { href: "https://github.com/Kapildev0458", label: "View on GitHub ↗" },
  },
];
