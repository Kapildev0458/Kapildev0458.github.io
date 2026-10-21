// The level-up journey: one level per stage, shown one at a time while the
// section is scrolled. The last entry is the level in progress.

export type Level = {
  tag: string; // short label under the XP bar
  period: string;
  title: string;
  org: string;
  place: string;
  points: string[];
  unlocked: string[];
  sideQuest?: string;
  inProgress?: boolean;
};

export const levels: Level[] = [
  {
    tag: "B.Tech",
    period: "2018 – 2022",
    title: "B.Tech, Computer Science & Engineering",
    org: "UCET Bikaner",
    place: "CGPA 8.1",
    points: ["Computer science fundamentals: programming, data structures and databases."],
    unlocked: ["C", "C++", "SQL", "Java"],
  },
  {
    tag: "BITS Pilani",
    period: "2024 – 2026",
    title: "M.E., Computer Science",
    org: "BITS Pilani",
    place: "Goa Campus · CGPA 8.36",
    points: ["Went deep on machine learning, deep learning and neural networks."],
    unlocked: ["Python", "Deep learning", "TensorFlow", "Keras"],
    sideQuest: "Human activity recognition from video: ConvLSTM vs LRCN, 83.6% test accuracy.",
  },
  {
    tag: "Oxyzo",
    period: "Jan – Jun 2026",
    title: "SDE Intern",
    org: "Oxyzo",
    place: "Fintech · Gurugram",
    points: [
      "Built the AI-generated document detector: fine-tuned Vision Transformers, OpenCV forensic features and C2PA checks.",
      "Fine-tuned Qwen2.5-1.5B with LoRA and Unsloth to turn loan sanction letters into structured JSON.",
    ],
    unlocked: ["LLM fine-tuning", "LoRA", "ViT", "OpenCV", "C2PA"],
    sideQuest: "Changed all data tables on internal platforms to a card layout on mobile.",
  },
  {
    tag: "MCP gateway",
    period: "Oct 2026",
    title: "WooCommerce hosting + team MCP gateway",
    org: "Personal project",
    place: "Kubernetes · MCP",
    points: [
      "Hosted stores on Kubernetes with Helm, and gave a team's AI agents safe, audited access through one MCP gateway.",
    ],
    unlocked: ["Kubernetes", "Helm", "MCP", "React"],
  },
  {
    tag: "Next",
    period: "Now",
    title: "Next level, in progress",
    org: "Learning",
    place: "Shipping AI systems end to end",
    points: ["Building the skills to design and ship whole AI systems, not just the models."],
    unlocked: ["System design", "Docker", "JavaScript", "Next.js"],
    inProgress: true,
  },
];

export const education = [
  { when: "2024–26", what: "M.E., Computer Science", where: "BITS Pilani, Goa Campus · CGPA 8.36" },
  { when: "2018–22", what: "B.Tech, Computer Science & Engineering", where: "UCET Bikaner · CGPA 8.1" },
];
