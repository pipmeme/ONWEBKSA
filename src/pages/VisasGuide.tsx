import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Globe,
  Mail,
  ArrowRight,
  FileText,
  Briefcase,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const visaTypes = [
  {
    name: "Business Visa (Single/Multi-entry)",
    duration: "90 days max per visit",
    forWhom: "Foreign entrepreneurs, investors visiting for meetings",
    color: "from-sky-500 to-blue-400",
    details: [
      "Can be obtained through Saudi Embassy or e-Visa portal",
      "Multi-entry valid for up to 1 year",
      "Does NOT allow working or receiving salary in Saudi Arabia",
      "Best for: scouting, meetings, setup trips",
    ],
  },
  {
    name: "Work Visa + Iqama (Residency)",
    duration: "1–2 years, renewable",
    forWhom: "Employees sponsored by a Saudi company",
    color: "from-violet-500 to-indigo-400",
    details: [
      "Company must be registered and have a valid CR",
      "Employee must have a signed employment contract",
      "Work visa obtained from Saudi Embassy in home country",
      "Iqama issued after arriving in Saudi Arabia",
      "Iqama renewal annual cost: ~SAR 2,400/year",
    ],
  },
  {
    name: "Investor Visa (MISA)",
    duration: "1–3 years, renewable",
    forWhom: "Foreign company directors/investors",
    color: "from-amber-500 to-orange-400",
    details: [
      "Issued alongside MISA investment license approval",
      "Allows the license holder to reside and work in KSA",
      "Can be converted to Iqama after arrival",
      "Director/GM of foreign company qualifies",
    ],
  },
  {
    name: "Premium Residency (Green Card)",
    duration: "Permanent or 5 years",
    forWhom: "High-net-worth individuals, senior talent",
    color: "from-amber-400 to-yellow-300",
    details: [
      "SAR 800,000 one-time fee (permanent) or SAR 100,000/year",
      "No sponsor required — full independence",
      "Can own businesses, property, sponsor family",
      "Fastest path to long-term residence for investors",
    ],
    link: "/startup-guide/premium-residency",
  },
  {
    name: "Freelancer/Talent Visa",
    duration: "1 year, renewable",
    forWhom: "Independent professionals, remote workers",
    color: "from-emerald-500 to-teal-400",
    details: [
      "Available for skilled professionals in approved sectors",
      "Issued through MISA or Ministry of Human Resources",
      "Allows working independently without a company sponsor",
      "Must demonstrate financial self-sufficiency",
    ],
  },
];

const iqamaSteps = [
  {
    step: 1,
    title: "Obtain Work Visa from Home Country",
    details: [
      "Saudi company submits work visa request to Ministry of Human Resources",
      "Visa block number issued to company",
      "Employee visits Saudi Embassy with: passport, medical certificate, police clearance, degree certificates, employment contract",
      "Processing: 1–4 weeks",
    ],
  },
  {
    step: 2,
    title: "Medical Tests & Biometrics",
    details: [
      "Complete medical examination at a GAMCA-approved clinic in your home country",
      "Tests include: blood tests (HIV, hepatitis, TB), chest X-ray",
      "Biometrics taken at Saudi Embassy",
    ],
  },
  {
    step: 3,
    title: "Arrive in Saudi Arabia",
    details: [
      "Enter on work visa (single-entry)",
      "Your employer/sponsor handles Iqama application within 90 days of entry",
      "Medical tests repeated in Saudi Arabia (at MOH-approved clinic)",
      "Biometrics taken at Jawazat (Passport Authority)",
    ],
  },
  {
    step: 4,
    title: "Iqama Issuance & National Address",
    details: [
      "Iqama card issued — this is your Saudi ID",
      "Register your National Address (al-awan.com.sa) — required for banking and government services",
      "Iqama renewal: done annually through Absher app",
      "Cost: ~SAR 2,400/year (employer usually covers this)",
    ],
    tip: "Download Absher and Muqeem apps immediately after getting your Iqama — essential for all government services.",
  },
];

const nitaqatInfo = [
  {
    category: "Platinum",
    percentage: "≥45% Saudi employees",
    benefits: "Premium government service priority, easier visa processing",
    color: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
  },
  {
    category: "High Green",
    percentage: "≥35–44%",
    benefits: "Standard services, visa renewal easy",
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  },
  {
    category: "Low Green",
    percentage: "≥25–34%",
    benefits: "Normal processing, some restrictions",
    color: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
  },
  {
    category: "Yellow/Red",
    percentage: "<25% Saudi",
    benefits: "Cannot renew expat visas, government service restrictions",
    color: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
  },
];

const VisasGuide = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Visas & Work Permits Guide | Saudi Arabia",
    description: "Complete guide to Saudi Arabia work visas, Iqama residency, Nitaqat Saudization requirements, and how to bring your team to the Kingdom.",
    path: "/startup-guide/visas",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 blur-[120px]" />

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
              <Users className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.immigration", "Immigration")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Visas & Work Permits
              <br />
              <span className="gradient-text">Complete Guide</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              Everything you need to know about working and living in Saudi Arabia — from business visas to Iqama, and how to bring your team to the Kingdom.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl">
              Sources: Ministry of Human Resources (hrsd.gov.sa), Jawazat, Absher platform, and verified practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 2,400</p>
              <p className="text-muted-foreground">Iqama Annual Fee</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4–8 Weeks</p>
              <p className="text-muted-foreground">Work Visa Timeline</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">5 Types</p>
              <p className="text-muted-foreground">of Visas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Nitaqat</p>
              <p className="text-muted-foreground">Saudization Program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Types of Visas</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Which Visa Do You Need?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
            {visaTypes.map((visa, i) => (
              <motion.div
                key={visa.name}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-base font-bold">{visa.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-gradient-to-r ${visa.color} text-white shrink-0 ml-2`}>
                    {visa.duration}
                  </span>
                </div>
                <p className="text-xs text-primary font-medium mb-3">{visa.forWhom}</p>
                <ul className="space-y-1.5">
                  {visa.details.map((d, di) => (
                    <li key={di} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                {visa.link && (
                  <Link to={visa.link}>
                    <Button variant="outline" size="sm" className="mt-4 text-xs">
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Iqama Steps */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Work Residency</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Getting Your Iqama (Work Residency)
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            {iqamaSteps.map((s, i) => (
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
                          <CheckCircle2 className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
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

      {/* Nitaqat */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Saudization</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Understanding Nitaqat
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Nitaqat is Saudi Arabia's Saudization program — companies must maintain a minimum percentage of Saudi national employees. Your Nitaqat category determines your ability to hire expats and access government services.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {nitaqatInfo.map((n, i) => (
              <motion.div
                key={n.category}
                className={`rounded-2xl border p-5 ${n.color}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <h3 className="font-display text-lg font-bold mb-1">{n.category}</h3>
                <p className="text-sm font-medium mb-2">{n.percentage} Saudi employees</p>
                <p className="text-xs opacity-80">{n.benefits}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-6 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 max-w-3xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-amber-800 dark:text-amber-300">Important for Startups</h4>
                <p className="text-sm text-muted-foreground">New companies (less than 3 years old) often get exemptions or lower Nitaqat thresholds. Consult with HRSD or your PRO service to understand your specific requirements based on your company size and sector.</p>
              </div>
            </div>
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
                Need Help with Visas?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Our community can connect you with PRO services and legal experts who specialize in Saudi immigration.
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

export default VisasGuide;
