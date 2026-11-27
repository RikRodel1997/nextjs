import { useTranslation } from "react-i18next";

type SummaryTranslation = {
  label: string;
  content: string;
};

export default function Summary() {
  const { t } = useTranslation();
  const { label, content } = t("summary", { returnObjects: true }) as SummaryTranslation;

  return (
    <div className="mb-1">
      <div className="flex flex-col align-center justify-between">
        <p className="text-base font-bold mt-2">{label}</p>
        <hr />
        <p>{content}</p>
      </div>
    </div>
  );
}
