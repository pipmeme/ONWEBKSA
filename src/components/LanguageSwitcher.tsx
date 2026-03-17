import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en" },
  { code: "ar" },
  { code: "ru" },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (code: string) => {
    void i18n.changeLanguage(code);
  };

  const currentLangCode = i18n.resolvedLanguage?.split("-")[0] || "en";
  const currentLang = languages.find((l) => l.code === currentLangCode) || languages[0];
  const labelByCode: Record<string, string> = {
    en: t("lang.en"),
    ar: t("lang.ar"),
    ru: t("lang.ru"),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-2.5 text-muted-foreground hover:text-foreground">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">{labelByCode[currentLang.code]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-sm cursor-pointer ${
              currentLangCode === lang.code ? "font-semibold text-primary" : ""
            }`}
          >
            {labelByCode[lang.code]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
