import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Contact from "./components/Contact.js";
import Experience, { type ExperienceProps } from "./components/Experience.js";
import Language, { type LanguageProps } from "./components/Language.js";
import Skill, { type SkillProps } from "./components/Skill.js";

const PAGE_HEIGHT_MM = 297;
const PAGE_HEIGHT_PX = (PAGE_HEIGHT_MM * 96) / 25.4;
const SIDEBAR_WIDTH = "30%";

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    background: `linear-gradient(to right, #C5BBA8 ${SIDEBAR_WIDTH}, #FFFFFF ${SIDEBAR_WIDTH})`,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#000",
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: { fontSize: 12, fontWeight: "bold", marginTop: 20, marginBottom: 5 },
  main: {
    paddingTop: 20,
    width: "70%",
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottom: "1px solid #000",
    paddingBottom: 4,
  },
} as const;

function usePageCount() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useLayoutEffect(() => {
    const columns = [sidebarRef.current, mainRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const update = () => {
      const height = Math.max(...columns.map((el) => el.offsetHeight));
      setPageCount(Math.max(1, Math.ceil(height / PAGE_HEIGHT_PX)));
    };
    update();
    const observer = new ResizeObserver(update);
    for (const el of columns) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { sidebarRef, mainRef, pageCount };
}

export default function Resume() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true }) as SkillProps[];
  const languages = t("languages", { returnObjects: true }) as LanguageProps[];
  const experiences = t("experiences", { returnObjects: true }) as ExperienceProps[];
  const { sidebarRef, mainRef, pageCount } = usePageCount();

  return (
    <div
      className="resume-page"
      style={{ ...styles.page, minHeight: `${pageCount * PAGE_HEIGHT_MM}mm` }}
    >
      {Array.from({ length: pageCount - 1 }, (_, i) => (
        <div
          key={`page-break-${i + 2}`}
          className="page-break no-print"
          style={{ top: `${(i + 1) * PAGE_HEIGHT_MM}mm` }}
          data-label={`Page ${i + 2}`}
        />
      ))}
      <div ref={sidebarRef} style={styles.sidebar}>
        <Contact />
        <h3 style={styles.sidebarHeader}>{t("skills.title")}</h3>
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 4 }}>
          {skills.map(({ name, level }) => (
            <Skill key={name} name={name} level={level} />
          ))}
        </div>

        <h3 style={styles.sidebarHeader}>{t("languages.title")}</h3>
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 4 }}>
          {languages.map(({ name, level }) => (
            <Language key={name} name={name} level={level} />
          ))}
        </div>
      </div>

      <div ref={mainRef} style={styles.main}>
        <h1 style={styles.name}>{t("personal.name")}</h1>
        <p style={{ fontSize: 14, color: "#444", margin: 0 }}>{t("personal.title")}</p>

        <h2 style={styles.sectionTitle}>{t("experience.title")}</h2>
        {experiences.map(({ jobTitle, company, summary, achievements, startDate, endDate }) => (
          <Experience
            key={`${jobTitle}${company}`}
            jobTitle={jobTitle}
            company={company}
            summary={summary}
            achievements={achievements}
            startDate={startDate}
            endDate={endDate}
          />
        ))}

        <h2 style={styles.sectionTitle}>{t("education.title")}</h2>
      </div>
    </div>
  );
}
