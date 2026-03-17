import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
const logoSrc = "/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { to: "/", label: t("nav.home"), exact: true },
    { to: "/startup-guide", label: t("nav.startupGuide"), exact: false },
    { to: "/stories", label: t("nav.founderStories"), exact: false },
    { to: "/rising-founders", label: t("nav.risingFounders"), exact: false },
    { to: "/insights", label: t("nav.insights"), exact: false },
    { to: "/about", label: t("nav.about"), exact: true },
  ];

  const isActive = (link: typeof navLinks[0]) =>
    link.exact
      ? location.pathname === link.to
      : location.pathname === link.to || location.pathname.startsWith(link.to + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="px-4 sm:container flex h-14 sm:h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSrc} alt="Founders KSA" className="h-12 sm:h-16 w-auto" loading="eager" decoding="async" fetchPriority="high" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link)
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
            <Link to="/free-kickstart">{t("nav.freeKickstart")}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 sm:container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="gradient-bg border-0 text-primary-foreground mt-2 text-sm">
              <Link to="/free-kickstart" onClick={() => setIsOpen(false)}>{t("nav.freeKickstart")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
