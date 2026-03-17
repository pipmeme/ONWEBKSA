import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  HandCoins,
  CheckCircle2,
  DollarSign,
  Globe,
  Mail,
  TrendingUp,
  Building2,
  Users,
  Rocket,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const governmentPrograms = [
  {
    name: "Monsha'at (SMEA)",
    type: "SME Authority",
    url: "monshaat.gov.sa",
    desc: "Saudi Arabia's SME Authority — provides grants, soft loans, and guarantee programs. The Kafalah Program offers loan guarantees up to 80% for SMEs. Also runs Rowad (entrepreneurship programs) and provides subsidized services.",
    amount: "Up to SAR 30M (via Kafalah)",
    forWhom: "Saudi-owned SMEs, startups",
  },
  {
    name: "SRMG Fund / NTDP",
    type: "National Transformation",
    url: "vision2030.gov.sa",
    desc: "Various Vision 2030 transformation funds targeting key sectors: tech, healthcare, tourism, entertainment, sports. Applied through sector ministries.",
    amount: "Varies by program",
    forWhom: "Companies in priority sectors",
  },
  {
    name: "Badir Program",
    type: "Technology Incubator",
    url: "badir.com.sa",
    desc: "KACST's technology incubator program. Provides funding (up to SAR 1.5M), mentorship, office space, and connections. Focused on tech, deep tech, and IP-based startups.",
    amount: "Up to SAR 1.5M grant",
    forWhom: "Tech startups with IP",
  },
  {
    name: "Flat6Labs Saudi",
    type: "Accelerator + VC",
    url: "flat6labs.com",
    desc: "Regional accelerator with Saudi presence. Provides USD 30,000–50,000 investment + intensive 4-month program + regional network.",
    amount: "USD 30k–50k",
    forWhom: "Early-stage startups",
  },
  {
    name: "500 Global (Saudi)",
    type: "VC + Accelerator",
    url: "500.co",
    desc: "Global VC with active Saudi focus. Invests in Saudi-based and Saudi-market startups at pre-seed and seed stage.",
    amount: "USD 100k–500k",
    forWhom: "Pre-seed/seed startups",
  },
  {
    name: "SVC (Saudi Venture Capital)",
    type: "Government VC",
    url: "svc.com.sa",
    desc: "Government-backed fund-of-funds. Invests in local and regional VC funds to grow the Saudi venture ecosystem. Not a direct startup investor.",
    amount: "SAR 2.8B total corpus",
    forWhom: "VC funds (not direct)",
  },
];

const vcLandscape = [
  {
    stage: "Pre-Seed (Idea)",
    range: "SAR 375k – 2M",
    sources: ["Angel investors", "Flat6Labs", "500 Global", "Aramco Entrepreneurship", "KAUST Innovation"],
    tips: "Focus on angels with sector expertise. Saudi Business Angel Network (SBAN) is a good starting point.",
  },
  {
    stage: "Seed",
    range: "SAR 2M – 15M",
    sources: ["Wa'ed Ventures (Aramco)", "Sanabil Investments", "Raed Ventures", "Impact46", "Merak Capital"],
    tips: "Saudi VCs strongly prefer startups with Saudi co-founders or significant Saudi customer traction.",
  },
  {
    stage: "Series A",
    range: "SAR 15M – 75M",
    sources: ["STV (Saudi Technology Ventures)", "Riyad Capital", "Shorooq Partners", "Wa'ed", "Regional Tiger Global/Andreessen deals"],
    tips: "Series A deals require proven revenue and clear path to regional expansion. 18+ months runway required.",
  },
  {
    stage: "Series B+",
    range: "SAR 75M+",
    sources: ["PIF (via programs)", "SoftBank Vision Fund", "Global VCs with MENA presence", "Saudi mega-funds"],
    tips: "Regional HQ in Saudi Arabia becomes critical at this stage. Vision 2030 alignment helps.",
  },
];

const grantTips = [
  "Monsha'at's Kafalah program has the lowest barrier to entry — if you have a CR and a business plan, apply",
  "SCTH (Commission for Tourism) runs active grants for hospitality/tourism tech",
  "Ministry of Communications (MCIT) has grant programs for digital transformation companies",
  "Healthcare: Saudi Health Holding and NEOM have dedicated innovation funds",
  "Agriculture: MEWA and Saudi Agricultural Development Fund for agri-tech",
  "Vision 2030 alignment isn't just buzzwords — explicitly link your solution to a Giga Project or national goal",
];

const FundingGuide = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Funding & Grants Guide | Saudi Arabia Startups",
    description: "Government grants, VC landscape, accelerators, and funding options for startups in Saudi Arabia. How to raise money in KSA.",
    path: "/startup-guide/funding",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-[120px]" />

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
              <HandCoins className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.funding", "Funding")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Funding & Grants
              <br />
              <span className="gradient-text">in Saudi Arabia</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              Government grants, VC landscape, accelerators, and how to raise capital as a startup in the Kingdom. SAR 2.8B+ in government-backed funds available.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl">
              Sources: Monsha'at, SVC, MAGNiTT MENA reports, and verified founders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 2.8B+</p>
              <p className="text-muted-foreground">Govt VC Corpus (SVC)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">#1</p>
              <p className="text-muted-foreground">MENA VC Market (2023)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 30M</p>
              <p className="text-muted-foreground">Max Kafalah Guarantee</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">50+</p>
              <p className="text-muted-foreground">Active VCs in KSA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Programs */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Government Funding</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Grants & Government Programs
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            {governmentPrograms.map((prog, i) => (
              <motion.div
                key={prog.name}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold">{prog.name}</h3>
                    <p className="text-xs text-muted-foreground">{prog.url} · {prog.type}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20 shrink-0">
                    {prog.amount}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{prog.desc}</p>
                <p className="text-xs text-primary font-medium">Best for: {prog.forWhom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VC Landscape by Stage */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Private Capital</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              VC Landscape by Stage
            </h2>
          </motion.div>

          <div className="space-y-5 max-w-4xl">
            {vcLandscape.map((stage, i) => (
              <motion.div
                key={stage.stage}
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shrink-0 text-white text-xs font-bold">
                    {["A", "S", "A", "B"][i]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-bold">{stage.stage}</h3>
                      <span className="text-sm font-semibold text-primary">{stage.range}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stage.sources.map((s) => (
                        <span key={s} className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-muted text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{stage.tips}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grant Tips */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Insider Tips</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Tips for Getting Funded
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {grantTips.map((tip, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <TrendingUp className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
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
                Fundraising Questions?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Connect with founders who've successfully raised in Saudi Arabia and get warm intros to investors.
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

export default FundingGuide;
