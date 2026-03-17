import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Globe,
  Mail,
  ArrowRight,
  CreditCard,
  Receipt,
  Building2,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const banks = [
  {
    name: "Al Rajhi Bank",
    type: "Islamic",
    bestFor: "Most widely accepted, startup-friendly",
    digitalAccount: true,
    note: "Strong branch network, popular with SMEs. Al Rajhi Business app is excellent.",
  },
  {
    name: "Saudi National Bank (SNB)",
    type: "Conventional + Islamic windows",
    bestFor: "Large businesses, international transfers",
    digitalAccount: true,
    note: "Best for international wire transfers and trade finance. Formerly NCB.",
  },
  {
    name: "Riyad Bank",
    type: "Conventional + Islamic",
    bestFor: "Mid-size companies, solid online banking",
    digitalAccount: false,
    note: "Good business banking platform. Require more documentation than Al Rajhi.",
  },
  {
    name: "Arab National Bank (ANB)",
    type: "Conventional",
    bestFor: "Companies with Arab regional operations",
    digitalAccount: false,
    note: "Strong for regional Arab business. Fewer branches than top banks.",
  },
  {
    name: "STC Pay Business",
    type: "Digital wallet / EMI",
    bestFor: "Freelancers, small businesses, quick setup",
    digitalAccount: true,
    note: "Fastest to set up — 100% digital. Great for receiving payments but limited for payroll.",
  },
];

const bankingSteps = [
  {
    step: 1,
    title: "Gather Required Documents",
    details: [
      "Company Commercial Registration (CR) — certified copy",
      "MISA Investment License (for foreign companies)",
      "Articles of Association (AoA) — notarized",
      "Board resolution authorizing bank account opening",
      "Passport + Iqama copies of all authorized signatories",
      "Company seal/stamp (some banks still require this)",
      "Proof of company address (utility bill or lease agreement)",
    ],
    tip: "For sole proprietors/personal license: Iqama + Maroof certificate + CR is usually sufficient.",
  },
  {
    step: 2,
    title: "Submit KYC Documentation",
    details: [
      "Visit the chosen bank's business banking branch (not retail branch)",
      "Submit all documents for Know Your Customer (KYC) review",
      "Bank will conduct AML/compliance checks — this takes 1–4 weeks",
      "May need to provide source of funds documentation",
      "Be prepared for follow-up questions about business activities",
    ],
  },
  {
    step: 3,
    title: "Account Activation & Initial Deposit",
    details: [
      "Minimum initial deposit varies: SAR 0–25,000 depending on bank and account type",
      "Set up online banking and designate authorized users",
      "Order company cheque book if needed (rarely used now)",
      "Set up SADAD, SARIE, and SWIFT for local and international transfers",
    ],
    tip: "SARIE is Saudi Arabia's instant payment system — set it up immediately for fast local transfers.",
  },
];

const zatcaSteps = [
  {
    step: 1,
    title: "Commercial Registration (CR)",
    details: ["Must have a valid CR before registering with ZATCA", "CR is issued by the Ministry of Commerce"],
  },
  {
    step: 2,
    title: "Register on ZATCA Portal",
    details: [
      "Go to zatca.gov.sa and create a Taxpayer Account",
      "Use your CR number and Iqama/National ID",
      "Register for VAT if annual revenue exceeds SAR 375,000",
      "Voluntary registration available for revenue SAR 187,500–375,000",
    ],
    tip: "Even if exempt, registering for VAT can be beneficial when dealing with government clients who require a VAT number.",
  },
  {
    step: 3,
    title: "E-Invoicing Compliance (Fatoorah)",
    details: [
      "Saudi Arabia requires electronic invoicing (Fatoorah/ZATCA Phase 2)",
      "All B2B transactions must use ZATCA-compliant e-invoicing software",
      "Phase 2 rollout ongoing — check ZATCA portal for your company's integration date",
      "Popular compliant software: Qoyod, Foodics, Wafeq, Zoho Books",
    ],
  },
  {
    step: 4,
    title: "File VAT Returns",
    details: [
      "VAT returns are filed quarterly (some monthly for large businesses)",
      "Deadline: 30 days after end of each quarter",
      "15% standard VAT rate applies to most goods and services",
      "Zero-rated: exports, certain financial services",
      "Exempt: residential rents, local passenger transport",
    ],
  },
];

const tips = [
  { icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/5 border-amber-500/20", text: "Bank account opening for foreign companies can take 4–8 weeks — start immediately after getting your CR." },
  { icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/5 border-amber-500/20", text: "ZATCA compliance checks are serious — late VAT filing penalties start at SAR 1,000 per missed return." },
  { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/20", text: "Hire a local accountant familiar with ZATCA from day one — IFRS-compliant bookkeeping is required." },
  { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/20", text: "Keep all invoices and financial records for 6 years — ZATCA can audit any period within that window." },
];

const BankingTax = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Banking & Tax Guide | Saudi Arabia Business",
    description: "How to open a corporate bank account and register with ZATCA for taxes in Saudi Arabia. Complete guide for foreign companies and startups.",
    path: "/startup-guide/banking-tax",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-sky-500/20 to-blue-500/20 blur-[120px]" />

        <div className="px-4 sm:container py-20 sm:py-28 relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Link
              to="/startup-guide"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("startupGuide.backToStartupGuide", "Back to Startup Guide")}
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6 ml-4">
              <Landmark className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.financeTax", "Finance & Tax")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Banking & ZATCA
              <br />
              <span className="gradient-text">Tax Guide</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              How to open a corporate bank account and navigate Saudi Arabia's tax system — VAT registration, e-invoicing (Fatoorah), and compliance requirements.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl">
              Sources: ZATCA (zatca.gov.sa), SAMA, Saudi bank websites, and verified practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">15%</p>
              <p className="text-muted-foreground">VAT Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 375k</p>
              <p className="text-muted-foreground">Mandatory VAT Threshold</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4–8 Weeks</p>
              <p className="text-muted-foreground">Bank Account Timeline</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Quarterly</p>
              <p className="text-muted-foreground">VAT Filing Frequency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Comparison */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Choosing a Bank</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Top Business Banks in Saudi Arabia
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            {banks.map((bank, i) => (
              <motion.div
                key={bank.name}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold">{bank.name}</h3>
                    <p className="text-xs text-muted-foreground">{bank.type}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {bank.digitalAccount && (
                      <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        Digital Account
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-primary mb-2">{bank.bestFor}</p>
                <p className="text-sm text-muted-foreground">{bank.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banking Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Step by Step</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Opening Your Business Bank Account
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            {bankingSteps.map((s, i) => (
              <motion.div
                key={s.step}
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold mb-3">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {s.tip && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary/80"><span className="font-semibold">Tip:</span> {s.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZATCA */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Tax Registration</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              ZATCA & VAT Registration
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              The Zakat, Tax and Customs Authority (ZATCA) manages VAT, Zakat, and e-invoicing compliance in Saudi Arabia.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            {zatcaSteps.map((s, i) => (
              <motion.div
                key={s.step}
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold mb-3">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {s.tip && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-xs text-primary/80"><span className="font-semibold">Tip:</span> {s.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Warnings */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Key Things to Know</h2>
          </motion.div>
          <div className="space-y-3 max-w-3xl">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border ${tip.bg}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <tip.icon className={`h-4 w-4 ${tip.color} shrink-0 mt-0.5`} />
                <p className="text-sm">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="px-4 sm:container">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg" />
            <div className="relative p-10 sm:p-16 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                Need Help with Banking or Tax?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Connect with our community of founders who've navigated ZATCA and bank accounts firsthand.
              </p>
              <Button asChild size="lg" variant="outline" className="bg-white text-foreground hover:bg-white/90 border-0 px-8 h-12 shadow-xl">
                <a href="mailto:help@foundersksa.com">
                  <Mail className="mr-2 h-4 w-4" /> Ask Us Anything
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BankingTax;
