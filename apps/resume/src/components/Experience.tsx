import { useTranslation } from "react-i18next";
import { BulletList } from "./BulletList";

export type ExperienceProps = {
  jobTitle: string;
  company: string;
  summary: string;
  achievements: {
    summary: string;
    details: string;
  }[];
  startDate: string;
  endDate?: string;
};

export default function Experience({
  jobTitle,
  company,
  summary,
  achievements,
  startDate,
  endDate,
}: ExperienceProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-1">
      <div className="flex flex-row align-center justify-between">
        <p className="font-bold">{jobTitle}</p>
        <p>
          {startDate} - {endDate ? endDate : t("experience.current")}
        </p>
      </div>
      <p className="italic">{company}</p>
      <p>{summary}</p>
      {achievements ? (
        <BulletList
          items={achievements}
          keyExtractor={(achievement) => achievement.summary}
          renderItem={(achievement) => (
            <>
              {achievement.summary}
              <br />
              {achievement.details}
            </>
          )}
        />
      ) : undefined}
    </div>
  );
}
