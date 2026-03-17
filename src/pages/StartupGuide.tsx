import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { usePageSEO } from "@/hooks/use-page-seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Landmark,
  FileText,
  Users,
  Rocket,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Scale,
  HandCoins,
  GraduationCap,
  Crown,
  Mail,
  Zap,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ─── Guide Cards Data ─── */

interface GuideCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
  color: string;
  tag: string;
  available: boolean;
}

/* ─── Component ─── */

const StartupGuide = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Startup Guide",
    description: "Your complete guide to starting a business in Saudi Arabia. Licensing, company registration, incubators, funding, visas, and everything you need to know.",
    path: "/startup-guide",
  });

  const guides: GuideCard[] = [
    {
      icon: BadgeCheck,
      title: t("startupGuide.misaEntrepreneurLicense"),
      desc: t("startupGuide.misaDesc"),
      to: "/startup-guide/misa-license",
      color: "from-rose-500 to-orange-400",
      tag: t("startupGuide.licensing"),
      available: true,
    },
    {
      icon: HelpCircle,
      title: t("startupGuide.essentialFAQs"),
      desc: t("startupGuide.faqDesc"),
      to: "/startup-guide/business-faq",
      color: "from-sky-500 to-indigo-400",
      tag: t("startupGuide.faqGuide"),
      available: true,
    },
    {
      icon: Crown,
      title: t("startupGuide.premiumResidency"),
      desc: t("startupGuide.premiumDesc"),
      to: "/startup-guide/premium-residency",
      color: "from-amber-500 to-yellow-400",
      tag: t("startupGuide.residency"),
      available: true,
    },
    {
      icon: Building2,
      title: t("startupGuide.companyRegistration"),
      desc: t("startupGuide.companyRegDesc"),
      to: "/startup-guide/company-registration",
      color: "from-violet-500 to-indigo-400",
      tag: t("startupGuide.companySetup"),
      available: true,
    },
    {
      icon: FileText,
      title: t("startupGuide.personalLicense"),
      desc: t("startupGuide.personalLicenseDesc"),
      to: "/startup-guide/personal-license",
      color: "from-emerald-500 to-teal-400",
      tag: t("startupGuide.freelance"),
      available: true,
    },
    {
      icon: GraduationCap,
      title: t("startupGuide.incubatorsAccelerators"),
      desc: t("startupGuide.incubatorsDesc"),
      to: "/startup-guide/incubators",
      color: "from-amber-500 to-yellow-400",
      tag: t("startupGuide.programs"),
      available: true,
    },
    {
      icon: Landmark,
      title: t("startupGuide.bankAccount"),
      desc: t("startupGuide.bankDesc"),
      to: "/startup-guide/banking-tax",
      color: "from-sky-500 to-blue-400",
      tag: t("startupGuide.financeTax"),
      available: true,
    },
    {
      icon: Users,
      title: t("startupGuide.visasWork"),
      desc: t("startupGuide.visasDesc"),
      to: "/startup-guide/visas",
      color: "from-pink-500 to-fuchsia-400",
      tag: t("startupGuide.immigration"),
      available: true,
    },
    {
      icon: Scale,
      title: t("startupGuide.legalCompliance"),
      desc: t("startupGuide.legalDesc"),
      to: "/startup-guide/legal",
      color: "from-cyan-500 to-teal-400",
      tag: t("startupGuide.legal"),
      available: true,
    },
    {
      icon: HandCoins,
      title: t("startupGuide.fundingGrants"),
      desc: t("startupGuide.fundingDesc"),
      to: "/startup-guide/funding",
      color: "from-orange-500 to-red-400",
      tag: t("startupGuide.funding"),
      available: true,
    },
    {
      icon: Rocket,
      title: t("startupGuide.ecosystemOverview"),
      desc: t("startupGuide.ecosystemDesc"),
      to: "/startup-guide/ecosystem",
      color: "from-lime-500 to-green-400",
      tag: t("startupGuide.ecosystem"),
      available: true,
    },
  ];

  const availableGuides = guides.filter((g) => g.available);
  const comingSoonGuides = guides.filter((g) => !g.available);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full gradient-bg opacity-[0.07] blur-[120px]" />

        <div className="px-4 sm:container py-20 sm:py-28 md:py-36 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.communityKnowledgeBase")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              {t("startupGuide.yourComplete")}
              <br />
              <span className="gradient-text">{t("startupGuide.startupGuideFor")}</span> {t("startupGuide.forSaudiArabia")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("startupGuide.heroDesc")}
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span><strong className="text-foreground">{guides.length}</strong> {t("startupGuide.topics")}</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span><strong className="text-foreground">{availableGuides.length}</strong> {t("startupGuide.live")}</span>
              </div>
              <span className="text-border">•</span>
              <span>{t("startupGuide.freeAndOpen")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured: Founder's Playbook */}
      <section className="py-10 sm:py-14 border-t border-border/40">
        <div className="px-4 sm:container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Link to="/founders-playbook" className="group block">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <div className="absolute inset-0 gradient-bg opacity-[0.06] group-hover:opacity-[0.12] transition-opacity" />
                <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium gradient-bg text-white">New</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">{t("startupGuide.theRealTalk")}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {t("startupGuide.foundersPlaybook")}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {t("startupGuide.playbookDesc")}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Guides */}
      <section className="py-16 sm:py-24 border-t border-border/40">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("startupGuide.availableNow")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              {t("startupGuide.startReading")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {availableGuides.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link to={guide.to} className="group block h-full">
                  <div className="relative rounded-2xl border border-border/50 bg-card p-6 sm:p-8 h-full hover:border-primary/30 hover:shadow-lg transition-all">
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${guide.color} opacity-[0.06] blur-[60px] group-hover:opacity-[0.15] transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <guide.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-gradient-to-r ${guide.color} text-white`}>
                          {guide.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.desc}</p>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {t("startupGuide.readGuide")} <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Guides */}
      <section className="py-16 sm:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="px-4 sm:container relative">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("startupGuide.moreGuides")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t("startupGuide.comingSoon")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">{t("startupGuide.comingSoonDesc")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl">
            {comingSoonGuides.map((guide, i) => (
              <motion.div
                key={guide.title}
                className="relative rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6 opacity-80"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${guide.color} opacity-60 flex items-center justify-center`}>
                    <guide.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-medium bg-muted text-muted-foreground">
                    {t("startupGuide.comingSoon")}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold mb-1">{guide.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{guide.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="px-4 sm:container">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

            <div className="relative p-10 sm:p-16 md:p-24 text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
                {t("startupGuide.haveQuestions")}
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                {t("startupGuide.communityDriven")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="outline" className="bg-white text-foreground hover:bg-white/90 border-0 px-8 h-12 shadow-xl">
                  <a href="mailto:help@foundersksa.com">
                    <Mail className="mr-2 h-4 w-4" /> {t("startupGuide.askUsAnything")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-white/10 px-8 h-12">
                  <Link to="/stories">{t("startupGuide.readFounderStories")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupGuide;
