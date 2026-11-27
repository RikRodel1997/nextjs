import { useTranslation } from "react-i18next";

export default function Hobbies() {
  const { t } = useTranslation();
  const hobbies = t("hobbies") as string;

  return (
    <>
      <h3 className="font-bold mt-2 mb-1">{t("languages.title")}</h3>
      <div className="py-1 pl-2 pr-3 rounded-sm bg-white">
        <span>{hobbies}</span>
      </div>
    </>
  );
}
