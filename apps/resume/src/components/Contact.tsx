import { useTranslation } from "react-i18next";
import type { ResumeLink } from "@/types";
import { Email, Link as LinkIcon, Phone } from "../icons/index";

export default function Contact() {
  const { t } = useTranslation();
  const links = (t("personal.links", { returnObjects: true }) || []) as ResumeLink[];

  return (
    <>
      <h3 className="text-sm font-bold">{t("contact.title")}</h3>
      <div>
        <Phone className="mr-5 w-4 h-4" />
        <span>{t("personal.phone")}</span>
      </div>
      <div>
        <Email className="mr-5 w-4 h-4" />
        <span>{t("personal.email")}</span>
      </div>
      {links.map((link) => (
        <div key={link.url}>
          <LinkIcon className="mr-5 w-4 h-4" />
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        </div>
      ))}
    </>
  );
}
