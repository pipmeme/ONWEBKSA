import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Rocket,
  CheckCircle2,
  Globe,
  Mail,
  Building2,
  Users,
  TrendingUp,
  MapPin,
  Lightbulb,
  Zap,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const gigaProjects = [
  {
    name: "NEOM",
    sector: "Smart Cities / Deep Tech",
    opportunity: "Building a city from scratch — massive demand for tech, logistics, construction, AI, biotech, and services",
    stage: "Under Construction",
    url: "neom.com",
    color: "from-teal-500 to-emerald-400",
  },
  {
    name: "Red Sea Project / AMAALA",
    sector: "Tourism & Hospitality Tech",
    opportunity: "Ultra-luxury tourism creating demand for hospitality tech, experience platforms, sustainability solutions",
    stage: "Phase 1 Open",
    url: "theredsea.com",
    color: "from-sky-500 to-blue-400",
  },
  {
    name: "Diriyah Gate",
    sector: "Cultural Tourism & Heritage Tech",
    opportunity: "Heritage tourism, cultural experiences, hospitality management, ticketing, and smart visitor solutions",
    stage: "Phase 1 Open",
    url: "diriyah.sa",
    color: "from-amber-500 to-yellow-400",
  },
  {
    name: "Qiddiya",
    sector: "Entertainment & Sports Tech",
    opportunity: "Entertainment, gaming, sports management, events tech, theme park operations, esports infrastructure",
    stage: "Under Development",
    url: "qiddiya.com",
    color: "from-purple-500 to-indigo-400",
  },
  {
    name: "King Salman Energy Park (SPARK)",
    sector: "Energy & Industrial Tech",
    opportunity: "Energy efficiency, industrial IoT, oilfield tech, renewable energy solutions, water tech",
    stage: "Operational",
    url: "spark.com.sa",
    color: "from-orange-500 to-red-400",
  },
];

const hubs = [
  {
    name: "Riyadh",
    desc: "The undisputed startup capital. Home to PIF, MISA, most VCs, major tech companies, and the largest talent pool. Required HQ for most startups targeting government/B2B.",
    highlights: ["STV", "Raed Ventures", "Wa'ed", "Endeavor Saudi", "500 Global MENA"],
  },
  {
    name: "Jeddah",
    desc: "Strong in e-commerce, consumer brands, and maritime/logistics. More cosmopolitan culture. Jarir, Noon, and many consumer brands based here.",
    highlights: ["KAUST Innovation (nearby)", "Angel investors", "Strong retail sector"],
  },
  {
    name: "KAUST (Thuwal)",
    desc: "World-class research university with an active startup ecosystem. Strong in deep tech, biotech, materials, and renewable energy. KAUST Innovation Fund invests in spinouts.",
    highlights: ["KAUST Innovation Fund", "Deep tech focus", "Research-driven startups"],
  },
  {
    name: "NEOM",
    desc: "Early-stage but growing tech hub in Tabuk. Actively recruiting tech companies for urban tech, mobility, AI, and sustainability challenges.",
    highlights: ["NEOM Tech & Digital Fund", "Unique regulatory sandbox", "Future-city use cases"],
  },
];

const keyPlayers = [
  { category: "Government", players: ["PIF (Public Investment Fund)", "MISA", "Monsha'at (SMEA)", "MCIT (Digital Ministry)", "KACST"] },
  { category: "VCs & Funds", players: ["STV", "Sanabil", "Wa'ed Ventures", "Impact46", "Merak Capital", "Raed Ventures", "500 Global"] },
  { category: "Accelerators", players: ["Flat6Labs", "MISK Accelerator", "Aramco Entrepreneurship", "AstroLabs", "KAUST Startups"] },
  { category: "Tech Giants (Local)", players: ["STC", "Saudi Aramco", "SABIC", "Zain Saudi", "SaudiFunding"] },
  { category: "Communities", players: ["Founders KSA", "Startup Grind Riyadh", "Women Tech Makers Saudi", "Saudi Business Angels Network", "OQAL Angel Network"] },
];

const hotSectors = [
  { sector: "Fintech", why: "SAR 27B BNPL market, unbanked segments, SAMA sandbox, major banks partnerships" },
  { sector: "Healthtech", why: "National health transformation, aging population, telemedicine demand post-COVID" },
  { sector: "Edtech", why: "Vision 2030 focus on education, 60% of population under 30, massive student market" },
  { sector: "Logistics & Supply Chain", why: "Retail boom, e-commerce growth, giga project supply chain needs, strategic location" },
  { sector: "PropTech", why: "Massive real estate development across giga projects and Vision 2030 housing initiatives" },
  { sector: "Retail & E-commerce", why: "SAR 55B+ market, high smartphone penetration, young consumer base" },
  { sector: "AgriTech", why: "Food security is a national priority — massive investment in vertical farming, water-efficient agriculture" },
  { sector: "Clean Energy", why: "Saudi Green Initiative, 50% renewable target by 2030, NEOM clean energy mandates" },
];

const EcosystemGuide = () => {
  const { t } = useTranslation();

  usePageSEO({
    title: "Saudi Startup Ecosystem Guide | Vision 2030",
    description: "How the Saudi startup ecosystem works — key players, VCs, giga projects, hot sectors, startup hubs, and how to position for Vision 2030 opportunities.",
    path: "/startup-guide/ecosystem",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-lime-500/20 to-green-500/20 blur-[120px]" />

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
              <Rocket className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">{t("startupGuide.ecosystem", "Ecosystem")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              Saudi Startup
              <br />
              <span className="gradient-text">Ecosystem Overview</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              The complete picture of Saudi Arabia's innovation economy — key players, giga projects, hot sectors, and how to position your startup for Vision 2030 opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="px-4 sm:container py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 26.6T</p>
              <p className="text-muted-foreground">Vision 2030 GDP Target</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">SAR 7T+</p>
              <p className="text-muted-foreground">PIF Assets Under Mgmt</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">60%</p>
              <p className="text-muted-foreground">Population Under 30</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">#1</p>
              <p className="text-muted-foreground">MENA Startup Hub</p>
            </div>
          </div>
        </div>
      </section>

      {/* Giga Projects */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Trillion-Dollar Opportunities</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Giga Projects & Their Startup Opportunities
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Saudi Arabia is building some of the world's most ambitious mega-projects — each creating massive demand for technology and startup solutions.
            </p>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            {gigaProjects.map((proj, i) => (
              <motion.div
                key={proj.name}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${proj.color} flex items-center justify-center shrink-0`}>
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="font-display text-lg font-bold">{proj.name}</h3>
                        <p className="text-xs text-primary font-medium">{proj.sector}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium bg-muted text-muted-foreground shrink-0">
                        {proj.stage}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{proj.opportunity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Sectors */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Where to Build</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Hottest Startup Sectors
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {hotSectors.map((sector, i) => (
              <motion.div
                key={sector.sector}
                className="rounded-2xl border border-border/50 bg-card p-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-lime-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{sector.sector}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sector.why}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Hubs */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Where to Be</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Startup Hubs in Saudi Arabia
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
            {hubs.map((hub, i) => (
              <motion.div
                key={hub.name}
                className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-lg font-bold">{hub.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{hub.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {hub.highlights.map((h) => (
                    <span key={h} className="px-2 py-0.5 rounded-full text-[0.6rem] font-medium bg-primary/10 text-primary">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Players */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <motion.div className="mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">The Ecosystem Map</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Key Players to Know
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {keyPlayers.map((group, i) => (
              <motion.div
                key={group.category}
                className="rounded-2xl border border-border/50 bg-card p-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <h3 className="font-semibold text-sm mb-3 text-primary">{group.category}</h3>
                <ul className="space-y-1.5">
                  {group.players.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-lime-500 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
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
                Ready to Build in Saudi Arabia?
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Join thousands of founders navigating the Saudi startup ecosystem with our community's support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="outline" className="bg-white text-foreground hover:bg-white/90 border-0 px-8 h-12 shadow-xl">
                  <a href="mailto:help@foundersksa.com">
                    <Mail className="mr-2 h-4 w-4" /> Ask Us Anything
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-white/10 px-8 h-12">
                  <Link to="/startup-guide">All Guides</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EcosystemGuide;
