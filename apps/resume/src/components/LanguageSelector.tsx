import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";

type LanguageSelectorProps = {
  languages: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

export function LanguageSelector({ languages, value, onChange }: LanguageSelectorProps) {
  return (
    <Select
      items={languages}
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger className="w-full max-w-48 bg-popover">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
