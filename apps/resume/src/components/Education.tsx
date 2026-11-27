import { useTranslation } from "react-i18next";

export type EducationProps = {
  study: string;
  location: string;
  summary: string;
  startDate: string;
  endDate?: string;
};

export default function Education({
  study,
  location,
  summary,
  startDate,
  endDate,
}: EducationProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-1">
      <div className="flex flex-row items-center">
        <p className="font-bold">
          {study} | {location}
        </p>
      </div>
      <p>{summary}</p>
      <p>
        {startDate} - {endDate ? endDate : t("education.current")}
      </p>
    </div>
  );
}
