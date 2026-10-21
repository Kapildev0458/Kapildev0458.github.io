export const profile = {
  name: "Kapil Dev",
  shortName: "Kapil",
  email: "kapildev19012000@gmail.com",
  github: "https://github.com/Kapildev0458",
  linkedin: "https://www.linkedin.com/in/kapil--dev/",
  resume: "/Kapil_Dev_Resume.pdf",
  status: "Open to AI/ML & data roles · India",
};

// The two sides of the home page. The switch in the hero flips between them.
export type Side = "pro" | "personal";

export const sides: { id: Side; label: string; line: string; own: string }[] = [
  {
    id: "pro",
    label: "professional",
    line: "AI/ML engineer. I build AI systems that work on real data.",
    own: "M.E. Computer Science from BITS Pilani. At Oxyzo I fine-tuned an LLM to read loan letters and built a detector for AI-generated documents. Lately I've been connecting AI agents to real tools with MCP, and learning to ship whole systems: system design, Docker and React.",
  },
  {
    id: "personal",
    label: "personal",
    line: "Off the clock: writing down what I learn while building.",
    own: "This side is the rest of me: notes from what I'm building and learning, and a place to leave me a message.",
  },
];
