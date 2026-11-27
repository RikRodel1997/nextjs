import { useTranslation } from "react-i18next";

type Skill = {
  name: string;
  proficiency: string;
};

export default function Skills() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true }) as Skill[];

  return (
    <>
      <h3 className="font-bold mt-2 mb-1">{t("skills.title")}</h3>
      <div className="grid grid-cols-[max-content_auto] gap-y-1">
        {skills.map(({ name, proficiency }) => (
          <div key={name} className="contents">
            <span className="font-bold py-1 pl-2 pr-3 rounded-l-sm bg-white whitespace-nowrap">
              {name}
            </span>
            <span className="py-1 pr-2 rounded-r-sm bg-white">{proficiency}</span>
          </div>
        ))}
      </div>
    </>
  );
}
