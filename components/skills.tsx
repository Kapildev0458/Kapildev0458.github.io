import { skills } from "@/lib/skills";

export function Skills() {
  return (
    <section id="skills">
      <p className="eyebrow">Skills</p>
      <h2>What I work with</h2>
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group}>
            <h3>{g.group}</h3>
            <div className="tags">
              {g.items.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
