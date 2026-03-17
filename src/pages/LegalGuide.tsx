import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Shield,
  FileText,
  Gavel,
  Globe,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const legalAreas = [
  {
    icon: FileText,
    title: "Commercial Law & Contracts",
    color: "from-cyan-500 to-teal-400",
    points: [
      "Saudi contract law is based on Islamic Sharia principles combined with codified commercial law",
      "Contracts should be in Arabic (or bilingual Arabic-English) — Arabic version prevails in disputes",
      "All contracts with Saudi government entities MUST be in Arabic",
      "Standard international contract clauses (governing law, arbitration) are enforceable if specified",
      "Saudi courts apply Sharia principles — interest-bearing clauses may be void; use profit-sharing language instead",
      "Force majeure clauses: courts recognize events beyond parties' control under Sharia doctrine of 'Darurah'",
    ],
  },
  {
    icon: Shield,
    title: "Intellectual Property (IP) Protection",
    color: "from-violet-500 to-indigo-400",
    points: [
      "Saudi Arabia is a member of WIPO — patents, trademarks, and copyrights are recognized",
      "Register trademarks with the Saudi Authority for Intellectual Property (SAIP — saip.gov.sa)",
      "Trademark registration takes 4–6 months, valid for 10 years, renewable",
      "Software and digital content protected under Copyright Law (Royal Decree M/41)",
      "Trade secrets protected under the Commercial Court Law — use NDAs with Arabic clauses",
      "Patent applications filed at SAIP; protection lasts 20 years",
    ],
  },
  {
    icon: Globe,
    title: "Employment Law",
    color: "from-emerald-500 to-teal-400",
    points: [
      "Saudi Labor Law (Royal Decree M/51) governs all employment relationships",
      "Standard probation period: 90 days (extendable to 180 days by mutual agreement)",
      "End of Service Benefit (ESB): 1/3 month salary per year for first 5 years, 2/3 per year for 6–10 years",
      "Termination without cause requires ESB + notice period (typically 60 days)",
      "Working hours: 8 hours/day, 48 hours/week (6 hours/day during Ramadan)",
      "Annual leave: 21 days/year (increasing to 30 days after 5 years)",
      "Sick leave: 30 days full pay, 60 days half pay, 30 days without pay",
    ],
  },
  {
    icon: Gavel,
    title: "Dispute Resolution",
    color: "from-rose-500 to-orange-400",
    points: [
      "Saudi commercial courts handle business disputes — cases heard in Arabic",
      "Commercial Court (MC) established 2020 — faster resolution than general courts",
      "Saudi Center for Commercial Arbitration (SCCA) — preferred for B2B disputes",
      "International arbitration (ICC, LCIA) enforceable under Saudi Arbitration Law",
      "DIFC-LCIA arbitration commonly used for regional disputes",
      "Enforcement of foreign court judgments requires bilateral treaty or reciprocity",
      "Alternative: Mediation through Saudi Mediation and Arbitration Center (SAMA-C)",
    ],
  },
  {
    icon: Scale,
    title: "Data Privacy & Cybersecurity",
    color: "from-sky-500 to-blue-400",
    points: [
      "Personal Data Protection Law (PDPL) effective September 2023 — Saudi Arabia's GDPR equivalent",
      "PDPL enforced by National Data Management Office (NDMO)",
      "Requires: data processing notice, consent mechanisms, data breach reporting within 72 hours",
      "Data localization: sensitive personal data of Saudi residents must be stored in KSA",
      "Cybersecurity governed by the National Cybersecurity Authority (NCA)",
      "Essential Cybersecurity Controls (ECC) compliance required for certain sectors",
    ],
  },
];

const complianceChecklist = [
  "Commercial Registration (CR) renewed annually",
  "ZATCA VAT filing quarterly (if registered)",
  "GOSI (social insurance) monthly contributions for all employees",
  "Nitaqat Saudization ratio maintained",
  "Annual financial statements audited by a licensed Saudi CPA",
  "Iqama renewals processed on time (avoid overstay fines)",
  "Ministry of Commerce filing of any AoA amendments",
  "SAMA compliance for fintech/financial activities",
  "SFDA compliance for food/health/pharma products",
  "Communications Commission (CST) license for telecom/tech activities",
];

const keyAuthorities = [
  { name: "Ministry of Commerce", abbr: "MC", desc: "Company registration, trade names, consumer protection", url: "mc.gov.sa" },
  { name: "Saudi Authority for IP", abbr: "SAIP", desc: "Trademarks, patents, copyrights", url: "saip.gov.sa" },
  { name: "Ministry of Human Resources", abbr: "HRSD", desc: "Labor law, Nitaqat, work permits", url: "hrsd.gov.sa" },
  { name: "National Data Management Office", abbr: "NDMO", desc: "Data privacy, PDPL compliance", url: "ndmo.gov.sa" },
  { name: "National Cybersecurity Authority", abbr: "NCA", desc: "Cybersecurity standards and compliance", url: "nca.gov.sa" },
  { name: "Saudi Center for Commercial Arbitration", abbr: "SCCA", desc: "Commercial dispute resolution", url: "scca.org.sa" },
];

const LegalGuide = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Legal & Compliance Guide | Saudi Arabia Business",
    description: "Saudi Arabia business law essentials — contracts, IP, employment law, data privacy, and dispute resolution for startups and foreign companies.",
    path: "/startup-guide/legal",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 blur-[120px]" />

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
              <Scale className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.legal", "Legal")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Legal & Compliance
              <br />
              <span className="gradient-text">Guide for KSA</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              Essential Saudi business law — contracts, IP protection, employment, data privacy, and how disputes are resolved in the Kingdom.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl">
              This is an educational overview — always consult a licensed Saudi lawyer for specific legal advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Sharia</p>
              <p className="text-muted-foreground">Legal Foundation</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Arabic</p>
              <p className="text-muted-foreground">Official Contract Language</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Sep 2023</p>
              <p className="text-muted-foreground">PDPL Effective Date</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SCCA</p>
              <p className="text-muted-foreground">Arbitration Center</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Areas */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Key Legal Areas</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              What You Need to Know
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-4xl">
            {legalAreas.map((area, i) => (
              <motion.div
                key={area.title}
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center`}>
                    <area.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{area.title}</h3>
                </div>
                <ul className="space-y-2">
                  {area.points.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Annual Obligations</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Compliance Checklist
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {complianceChecklist.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <p className="text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Authorities */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Government Authorities</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Key Regulatory Bodies
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {keyAuthorities.map((auth, i) => (
              <motion.div
                key={auth.abbr}
                className="rounded-2xl border border-border/50 bg-card p-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-primary/10 text-primary">{auth.abbr}</span>
                  <span className="text-xs text-muted-foreground">{auth.url}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{auth.name}</h3>
                <p className="text-xs text-muted-foreground">{auth.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 max-w-5xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-amber-800 dark:text-amber-300">Always Get Local Legal Advice</h4>
                <p className="text-sm text-muted-foreground">This guide provides general information only. Saudi commercial law is complex and evolves frequently. Always engage a licensed Saudi lawyer for contracts, IP filings, and regulatory compliance in your specific sector.</p>
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
                Legal Questions?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Our community can connect you with trusted Saudi lawyers and compliance advisors.
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

export default LegalGuide;
