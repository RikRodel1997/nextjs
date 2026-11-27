import { useTranslation } from "react-i18next";

export type Languages = {
  name: string;
  proficiency: string;
};

export default function Languages() {
  const { t } = useTranslation();
  const languages = t("languages", { returnObjects: true }) as Languages[];

  return (
    <>
      <h3 className="font-bold mt-2 mb-1">{t("languages.title")}</h3>
      <div className="grid grid-cols-[max-content_auto] gap-y-1">
        {languages.map(({ name, proficiency }) => (
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
