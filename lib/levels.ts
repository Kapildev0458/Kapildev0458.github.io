// The level-up timeline: education, work and projects in order,
// each with the skills it "unlocked". The last entry is the level in progress.

export type Level = {
  when: string;
  title: string;
  org: string;
  points: string[];
  unlocked: string[];
  sideQuest?: string;
  inProgress?: boolean;
};

export const levels: Level[] = [
  {
    when: "2018 – 2022",
    title: "B.Tech Computer Science & Engineering",
    org: "University College of Engineering and Technology, Bikaner · CGPA 8.1",
    points: ["Computer science fundamentals: programming, data structures and databases."],
    unlocked: ["C", "C++", "SQL"],
  },
  {
    when: "2024 – 2026",
    title: "M.E. Computer Science",
    org: "BITS Pilani, Goa Campus · CGPA 8.36",
    points: ["Went deep on machine learning, deep learning and neural networks."],
    unlocked: ["Python", "Deep learning", "TensorFlow", "Keras"],
    sideQuest: "Human activity recognition from video: ConvLSTM vs LRCN, 83.6% test accuracy.",
  },
  {
    when: "Jan – Jun 2026",
    title: "SDE Intern",
    org: "Oxyzo (fintech) · Gurugram",
    points: [
      "Built the AI-generated document detection system: fine-tuned Vision Transformers, OpenCV forensic features and C2PA checks.",
      "Built the LLM-based sanction letter extraction system with Qwen2.5, LoRA and Unsloth.",
    ],
    unlocked: ["LLM fine-tuning", "LoRA", "Vision Transformers", "OpenCV", "C2PA"],
    sideQuest: "Changed all data tables on internal platforms to a card layout on mobile.",
  },
  {
    when: "Oct 2026",
    title: "WooCommerce hosting + team MCP gateway",
    org: "Personal project",
    points: ["Hosted stores on Kubernetes and gave a team's AI agents safe, audited access through one MCP gateway."],
    unlocked: ["Kubernetes", "Helm", "MCP", "React"],
  },
  {
    when: "Now",
    title: "Next level",
    org: "Learning in progress",
    points: ["Building the skills to design and ship AI systems end to end, not just the models."],
    unlocked: ["System design", "Docker", "JavaScript", "React", "Next.js"],
    inProgress: true,
  },
];
