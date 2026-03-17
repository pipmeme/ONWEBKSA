import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { usePageSEO } from "@/hooks/use-page-seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Building2,
  Users,
  CreditCard,
  FileText,
  Upload,
  BadgeCheck,
  Landmark,
  BriefcaseBusiness,
  Rocket,
  Globe,
  HeartPulse,
  ShoppingCart,
  Cpu,
  Leaf,
  Mail,
  ChevronDown,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Component ─── */

const StartupGuide = () => {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  usePageSEO({
    title: "MISA Entrepreneur License Guide",
    description: "The ultimate guide to the Entrepreneur MISA License in Saudi Arabia. Process, fees, requirements, and step-by-step walkthrough for 2026.",
    path: "/startup-guide/misa-license",
  });

  /* ─── Data ─── */

  const keyBenefits = [
    { icon: Globe, title: t("misa.foreignOwnership"), desc: t("misa.foreignOwnershipDesc") },
    { icon: CreditCard, title: t("misa.noMinCapital"), desc: t("misa.noMinCapitalDesc") },
    { icon: Building2, title: t("misa.noParentCompany"), desc: t("misa.noParentCompanyDesc") },
    { icon: Users, title: t("misa.residencyIqama"), desc: t("misa.residencyIqamaDesc") },
  ];

  const pricingTiers = [
    { years: t("misa.years1to3"), fee: "SAR 2,000", label: t("misa.maxSupport"), color: "from-emerald-500 to-teal-400", desc: t("misa.tier1Desc") },
    { years: t("misa.years4to5"), fee: "SAR 12,000", label: t("misa.graduatedSupport"), color: "from-amber-500 to-yellow-400", desc: t("misa.tier2Desc") },
    { years: t("misa.year6plus"), fee: "SAR 62,000", label: t("misa.standardRate"), color: "from-rose-500 to-orange-400", desc: t("misa.tier3Desc") },
  ];

  const steps = [
    { num: 1, icon: Shield, title: t("misa.step1Title"), desc: t("misa.step1Desc"), highlight: t("misa.step1Highlight") },
    { num: 2, icon: FileText, title: t("misa.step2Title"), desc: t("misa.step2Desc"), highlight: t("misa.step2Highlight") },
    { num: 3, icon: Upload, title: t("misa.step3Title"), desc: t("misa.step3Desc"), highlight: t("misa.step3Highlight") },
    { num: 4, icon: CreditCard, title: t("misa.step4Title"), desc: t("misa.step4Desc"), highlight: t("misa.step4Highlight") },
    { num: 5, icon: BadgeCheck, title: t("misa.step5Title"), desc: t("misa.step5Desc"), highlight: t("misa.step5Highlight") },
    { num: 6, icon: Landmark, title: t("misa.step6Title"), desc: t("misa.step6Desc"), highlight: t("misa.step6Highlight") },
    { num: 7, icon: BriefcaseBusiness, title: t("misa.step7Title"), desc: t("misa.step7Desc"), highlight: t("misa.step7Highlight") },
  ];

  const eligibility = [
    { icon: Rocket, label: t("misa.foreignEntrepreneurs"), desc: t("misa.foreignEntrepreneursDesc") },
    { icon: Building2, label: t("misa.backedStartups"), desc: t("misa.backedStartupsDesc") },
    { icon: Cpu, label: t("misa.technology"), desc: t("misa.technologyDesc") },
    { icon: Leaf, label: t("misa.renewableEnergy"), desc: t("misa.renewableEnergyDesc") },
    { icon: HeartPulse, label: t("misa.healthcare"), desc: t("misa.healthcareDesc") },
    { icon: ShoppingCart, label: t("misa.ecommerceTourism"), desc: t("misa.ecommerceTourismDesc") },
  ];

  const faqs = [
    { q: t("misa.faq1q"), a: t("misa.faq1a") },
    { q: t("misa.faq2q"), a: t("misa.faq2a") },
    { q: t("misa.faq3q"), a: t("misa.faq3a") },
    { q: t("misa.faq4q"), a: t("misa.faq4a") },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-4 sm:container pt-6">
        <Link to="/startup-guide" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" /> {t("misa.backToGuide")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full gradient-bg opacity-[0.07] blur-[120px]" />

        <div className="px-4 sm:container py-16 sm:py-24 md:py-32 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 gradient-bg" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("misa.updatedGuide")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              {t("misa.heroTitle1")}
              <br />
              <span className="gradient-text">{t("misa.heroTitle2")}</span> {t("misa.heroTitle3")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("misa.heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8 h-12 shadow-lg shadow-primary/20" onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}>
                {t("misa.seeProcess")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
                {t("misa.viewPricing")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is MISA */}
      <section className="py-16 sm:py-24 border-t border-border/40">
        <div className="px-4 sm:container">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("misa.whatIsIt")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              {t("misa.theEntrepreneur")} <span className="gradient-text">{t("misa.entrepreneurMisa")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              {t("misa.misaDesc")}
            </p>
          </motion.div>

          <div className="mt-12 sm:mt-16 relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="grid md:grid-cols-2 gap-5">
              {keyBenefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  className={cn(
                    "relative rounded-2xl border border-border/50 bg-card p-6 sm:p-8 group hover:border-primary/30 transition-all",
                    i % 2 === 0 ? "md:text-right" : ""
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className={cn("flex items-start gap-4", i % 2 === 0 ? "md:flex-row-reverse" : "")}>
                    <div className="shrink-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <b.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24 bg-muted/30 relative scroll-mt-20">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="px-4 sm:container relative">
          <motion.div className="text-center mb-12 sm:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("misa.feeStructure")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("misa.subsidizedFees")} <span className="gradient-text">{t("misa.fiveYears")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">{t("misa.feesDesc")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.years}
                className={cn(
                  "relative rounded-2xl border bg-card overflow-hidden group hover:shadow-lg transition-all",
                  i === 0 ? "border-primary/40 shadow-md shadow-primary/10" : "border-border/50"
                )}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className={`h-1.5 bg-gradient-to-r ${tier.color}`} />
                <div className="p-6 sm:p-8">
                  {i === 0 && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold gradient-bg text-primary-foreground mb-3">
                      {t("misa.bestValue")}
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{tier.years}</p>
                  <p className="font-display text-3xl sm:text-4xl font-bold mb-1">{tier.fee}</p>
                  <p className="text-xs text-muted-foreground mb-4">{t("misa.perYear")}</p>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tier.color} text-white mb-4`}>
                    {tier.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — Visual Steps */}
      <section id="process" className="py-16 sm:py-24 scroll-mt-20">
        <div className="px-4 sm:container">
          <motion.div className="text-center mb-12 sm:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("misa.stepByStep")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("misa.fromIdea")} <span className="gradient-text">{t("misa.operations")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">{t("misa.sevenSteps")}</p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-primary/40 hidden sm:block" />

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="relative flex gap-4 sm:gap-6 group"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i * 0.5}
                >
                  {/* Number circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4 sm:pb-6">
                    <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6 group-hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs font-bold gradient-text uppercase tracking-wider">{t("misa.step")} {step.num}</span>
                        <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-medium bg-accent text-accent-foreground">{step.highlight}</span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Distinction Callout */}
      <section className="py-12 sm:py-16">
        <div className="px-4 sm:container">
          <motion.div
            className="max-w-3xl mx-auto rounded-2xl border-2 border-primary/20 bg-accent/50 p-8 sm:p-10 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full gradient-bg opacity-10 blur-[80px]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold">{t("misa.importantDistinction")}</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("misa.importantDesc")}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t("misa.step")} 1</p>
                  <p className="font-display font-bold text-sm">{t("misa.misaLicenseLabel")}</p>
                  <p className="text-xs text-muted-foreground">{t("misa.investmentPermit")}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 rotate-90 sm:rotate-0" />
                <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-1">{t("misa.step")} 2</p>
                  <p className="font-display font-bold text-sm">{t("misa.commercialRegistration")}</p>
                  <p className="text-xs text-muted-foreground">{t("misa.companyEstablished")}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 rotate-90 sm:rotate-0" />
                <div className="flex-1 rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t("misa.step")} 3</p>
                  <p className="font-display font-bold text-sm">{t("misa.operationsLabel")}</p>
                  <p className="text-xs text-muted-foreground">{t("misa.youreLive")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="text-center mb-12 sm:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("misa.whoCanApply")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("misa.eligibility")} <span className="gradient-text">{t("misa.vision2030Sectors")}</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {eligibility.map((item, i) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-border/50 bg-card p-6 group hover:border-primary/20 transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("misa.faq")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">{t("misa.commonQuestions")}</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-border/50 bg-card overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="font-display font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", expandedFaq === i && "rotate-180")} />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
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
                {t("misa.haveQuestions")}
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                {t("misa.communityDriven")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="outline" className="bg-white text-foreground hover:bg-white/90 border-0 px-8 h-12 shadow-xl">
                  <a href="mailto:help@foundersksa.com">
                    <Mail className="mr-2 h-4 w-4" /> {t("misa.askUsAnything")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-white/10 px-8 h-12">
                  <Link to="/stories">{t("misa.readFounderStories")}</Link>
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
