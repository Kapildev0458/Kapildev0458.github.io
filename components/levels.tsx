import { levels } from "@/lib/levels";

export function Levels() {
  return (
    <section id="levels">
      <p className="eyebrow">Journey</p>
      <h2>Levelling up</h2>
      <ol className="levels">
        {levels.map((l, i) => (
          <li key={l.title} className={l.inProgress ? "level now" : "level"}>
            <div className="badge" aria-hidden="true">
              {l.inProgress ? "▶" : String(i + 1).padStart(2, "0")}
            </div>
            <div className="level-body">
              <p className="level-tag">
                {l.inProgress ? "level " + String(i + 1).padStart(2, "0") + " · in progress" : "level " + String(i + 1).padStart(2, "0")}
                <span>{l.when}</span>
              </p>
              <h3>{l.title}</h3>
              <p className="org">{l.org}</p>
              <ul>
                {l.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="unlocked">
                <span className="unlocked-label">{l.inProgress ? "unlocking" : "unlocked"}</span>
                {l.unlocked.map((s) => (
                  <span className="plus" key={s}>
                    +{s}
                  </span>
                ))}
              </div>
              {l.sideQuest && (
                <p className="side-quest">
                  <span>side quest</span> {l.sideQuest}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
