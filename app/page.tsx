import { Levels } from "@/components/levels";
import { Footer, Nav } from "@/components/nav";
import { Note } from "@/components/note";
import { RoleSections } from "@/components/role-sections";
import { Skills } from "@/components/skills";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="wrap" id="top">
        <RoleSections />
        <Levels />
        <Skills />
        <Writing />
        <Note />
        <Footer />
      </main>
    </>
  );
}
