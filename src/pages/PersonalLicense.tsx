import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Globe,
  Mail,
  ArrowRight,
  Smartphone,
  User,
  Briefcase,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: 1,
    title: "Check Eligibility",
    description: "Confirm you meet the basic requirements before applying.",
    details: [
      "Must be a Saudi national or hold a valid Iqama (residency permit)",
      "Must be at least 18 years old",
      "Cannot be a current government employee (unless approved)",
      "Activity must be on the approved freelance list (Ministry of Commerce)",
    ],
    tip: "Non-Saudis can get a Personal License under the Iqama framework, but some activities are restricted to Saudi nationals.",
  },
  {
    step: 2,
    title: "Register on Maroof Platform",
    description: "Maroof (maroof.sa) is Saudi Arabia's official freelancer and personal business platform.",
    details: [
      "Go to maroof.sa and create an account with your National ID or Iqama",
      "Fill in your personal and business information",
      "Select your freelance activity/category",
      "Upload supporting documents if required (certifications, diplomas)",
      "Registration is free",
    ],
    tip: "Maroof profiles build your business reputation — clients can verify your credentials directly on the platform.",
  },
  {
    step: 3,
    title: "Apply for Personal License (Establishment License)",
    description: "For those wanting a formal registered entity without forming a company.",
    details: [
      "Apply through Ministry of Commerce portal (mc.gov.sa)",
      "Select 'Individual Establishment' as your entity type",
      "Choose your commercial activity from the approved list",
      "Reserve your trade name",
      "License fee: approximately SAR 200–500 per year depending on activity",
      "Processing time: 1–3 business days",
    ],
  },
  {
    step: 4,
    title: "Open a Business Bank Account",
    description: "Use your Maroof certificate or license to open a dedicated business account.",
    details: [
      "Most Saudi banks (Al Rajhi, SNB, Riyad Bank) accept Maroof certificates",
      "Bring your National ID/Iqama, Maroof certificate, and tax registration if applicable",
      "Business accounts enable you to invoice clients professionally",
      "Some banks offer instant digital business accounts (STC Pay Business, Urpay)",
    ],
  },
  {
    step: 5,
    title: "Register with ZATCA (Tax Authority)",
    description: "Required if your annual income exceeds SAR 375,000.",
    details: [
      "Register for VAT on the ZATCA portal (zatca.gov.sa)",
      "Freelancers earning below SAR 375k/year are exempt from VAT registration",
      "File quarterly VAT returns if registered",
      "Zakat is required for Saudi nationals on business profits",
    ],
    tip: "Even below the VAT threshold, registering with ZATCA can help you work with government entities.",
  },
];

const benefits = [
  { icon: DollarSign, title: "Low Cost", desc: "SAR 200–500/year — far cheaper than forming a company" },
  { icon: Clock, title: "Fast Setup", desc: "Get started in 1–3 business days via Maroof" },
  { icon: User, title: "No Partners Needed", desc: "Operate solo with full control" },
  { icon: Globe, title: "Work with Clients", desc: "Issue invoices and receive payments professionally" },
  { icon: Briefcase, title: "Flexible Activities", desc: "200+ approved freelance categories" },
  { icon: Smartphone, title: "Digital-First", desc: "Everything can be done online — no office required" },
];

const warnings = [
  "You cannot sponsor employees or get work visas for staff under a Personal License",
  "Liability is unlimited — personal assets are at risk if debts arise",
  "Some corporate clients only work with LLC/company entities (not individuals)",
  "Limited ability to scale — for growth, you'll eventually need a proper company",
  "Cannot have multiple partners or shareholders",
];

const PersonalLicense = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Personal License Guide | Saudi Arabia Freelance",
    description: "How to get a personal/freelance license in Saudi Arabia via Maroof. Requirements, steps, costs, and what you can and cannot do.",
    path: "/startup-guide/personal-license",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-[120px]" />

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
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.freelance", "Freelance")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Personal License
              <br />
              <span className="gradient-text">& Freelance Guide</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              The simplest way to operate as an individual business owner in Saudi Arabia — from Maroof registration to invoicing clients legally.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl">
              Sources: Maroof (maroof.sa), Ministry of Commerce (mc.gov.sa), ZATCA (zatca.gov.sa), and verified practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 200–500</p>
              <p className="text-muted-foreground">Annual License Fee</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">1–3 Days</p>
              <p className="text-muted-foreground">Setup Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">200+</p>
              <p className="text-muted-foreground">Approved Activities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 375k</p>
              <p className="text-muted-foreground">VAT Threshold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Why Choose This Path</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Benefits of a Personal License
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="rounded-2xl border border-border/50 bg-card p-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <b.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Step by Step</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              How to Get Your Personal License
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            {steps.map((s, i) => (
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
                    <h3 className="font-display text-lg font-bold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                    <ul className="space-y-2">
                      {s.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
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

      {/* Warnings */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-2">Know the Limits</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Limitations to Be Aware Of
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {warnings.map((w, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm">{w}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 p-6 rounded-2xl bg-card border border-border/50 max-w-3xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5}>
            <h3 className="font-semibold mb-2">When to Upgrade to a Company</h3>
            <p className="text-sm text-muted-foreground">If you're hiring staff, working with large corporate clients, or approaching SAR 1M+ revenue, consider forming an LLC (Sharikat Masuoliya Mahdouda) for better liability protection and professional credibility.</p>
            <Link to="/startup-guide/company-registration">
              <Button variant="outline" size="sm" className="mt-4">
                Company Registration Guide <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="px-4 sm:container">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg" />
            <div className="relative p-10 sm:p-16 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                Questions About Your Personal License?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Our community has helped dozens of founders navigate the freelance licensing process.
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

export default PersonalLicense;
