import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Contact from "./components/Contact";
import Experience, { type ExperienceProps } from "./components/Experience";
import Hobbies from "./components/Hobbies";
import Languages from "./components/Languages";
import Skills from "./components/Skills";
import Summary from "./components/Summary";

const PAGE_HEIGHT_MM = 297;
const PAGE_HEIGHT_PX = (PAGE_HEIGHT_MM * 96) / 25.4;

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
  const experiences = t("experiences", { returnObjects: true }) as ExperienceProps[];

  const { sidebarRef, mainRef, pageCount } = usePageCount();

  return (
    <div
      className="resume-page relative flex flex-row items-start bg-[linear-gradient(to_right,#C5BBA8_35%,#FFFFFF_35%)] font-[Helvetica,Arial,sans-serif] text-[10px] leading-normal text-black"
      style={{ minHeight: `${pageCount * PAGE_HEIGHT_MM}mm` }}
    >
      {Array.from({ length: pageCount - 1 }, (_, i) => (
        <div
          key={`page-break-${i + 2}`}
          className="page-break no-print"
          style={{ top: `${(i + 1) * PAGE_HEIGHT_MM}mm` }}
          data-label={`Page ${i + 2}`}
        />
      ))}
      <div ref={sidebarRef} className="flex flex-col p-4 w-[35%] shrink-0">
        <Contact />
        <Skills />
        <Languages />
        <Hobbies />
      </div>

      <div ref={mainRef} className="flex w-[70%] flex-col p-[15px]">
        <p className="text-base font-bold mb-1">{t("personal.name")}</p>
        <p className="text-xs mb-1 text-[#444]">{t("personal.title")}</p>
        <Summary />
        <p className="text-base font-bold mt-2">{t("experience.title")}</p>
        <hr />
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

        <h2 className="text-base font-bold mt-2">{t("education.title")}</h2>
        <hr />
      </div>
    </div>
  );
}
