import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import "./i18n";
import "./resume.css";
import "@repo/ui/globals.css";
import { Button } from "@repo/ui/components/button";
import { LanguageSelector } from "./components/LanguageSelector";
import Resume from "./Resume";

export const App = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleLanguageChange = (e: string) => {
    setLang(e);
    i18n.changeLanguage(e);
  };

  return (
    <div className="preview">
      <div className="preview-toolbar no-print">
        <LanguageSelector
          languages={[
            { label: "English", value: "en" },
            { label: "Nederlands", value: "nl" },
          ]}
          value={lang}
          onChange={handleLanguageChange}
        />
        <Button onClick={reactToPrintFn}>Print</Button>
      </div>
      <div className="preview-sheet">
        <div ref={contentRef}>
          <Resume />
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
