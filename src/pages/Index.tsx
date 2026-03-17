import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageSEO } from "@/hooks/use-page-seo";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Quote, TrendingUp, Lightbulb, MapPin, ChevronRight, Mail, CheckCircle2, BookOpen, Users, Rocket, Mic } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { toRecord } from "@/lib/article-translations";

const CARD_COLORS = [
  "from-rose-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-yellow-400",
  "from-violet-500 to-indigo-400",
  "from-sky-500 to-blue-400",
  "from-pink-500 to-fuchsia-400",
];

async function fetchLatestStories() {
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, category, metadata")
    .eq("type", "founder_story")
    .eq("status", "public")
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) throw error;
  return data || [];
}

const founderQuotes = [
  {
    quote: "Hard work eventually pays off — just don't give up on the drive.",
    founder: "Hassan Ikram",
    company: "Cotyledon",
  },
  {
    quote: "Success is never owned, it is rented. And rent is due every day.",
    founder: "Sir Alain Edene",
    company: "Fittin International",
  },
  {
    quote: "Build for the player, and the success will follow.",
    founder: "Salman",
    company: "NJD Studio",
  },
];

const ecosystemHighlights = [
  {
    icon: TrendingUp,
    stat: "SAR 6B+",
    labelKey: "home.gamingInvestment",
    descKey: "home.gamingDesc",
    sourceKey: "home.gamingSource",
  },
  {
    icon: Lightbulb,
    stat: "2,000+",
    labelKey: "home.activeStartups",
    descKey: "home.activeStartupsDesc",
    sourceKey: "home.activeStartupsSource",
  },
  {
    icon: MapPin,
    stat: "5 Cities",
    labelKey: "home.startupHubs",
    descKey: "home.startupHubsDesc",
    sourceKey: "home.startupHubsSource",
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { data: rawStories = [], isLoading: storiesLoading } = useQuery({
    queryKey: ["homepageStories"],
    queryFn: fetchLatestStories,
    staleTime: 5 * 60 * 1000,
  });

  const featuredStories = rawStories.map((s, i) => {
    const meta = toRecord(s.metadata);
    const founder = (meta?.founder as string) || "";
    const company = (meta?.company as string) || "";
    const initials = founder
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return {
      id: s.slug,
      title: s.title,
      industry: s.category || "",
      founder,
      company,
      initials: initials || "F",
      color: CARD_COLORS[i % CARD_COLORS.length],
    };
  });

  usePageSEO({
    description: "Discover real founder stories from Saudi Arabia's boldest entrepreneurs. Real lessons, failures, and wins — your playbook for building in the Kingdom.",
    path: "/",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t("home.validEmail"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await supabase.functions.invoke("send-subscription", {
        body: { email: email.trim() },
      });
      if (res.error) throw res.error;
      setSubscribed(true);
      toast.success(t("home.subscribed"));
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error(t("home.somethingWrong"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full gradient-bg opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />

        <div className="px-4 sm:container py-8 sm:py-28 md:py-40 relative">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="font-display text-[1.65rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-2 sm:mb-6">
              {t("home.heroTitle1")}
              <br />
              <span className="gradient-text">{t("home.heroTitle2")}</span> {t("home.heroTitle3")}
            </h1>

            <p className="text-[0.8rem] sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-10 leading-relaxed">
              {t("home.heroDesc")}
            </p>

            <div className="flex flex-row gap-2.5 sm:gap-4 justify-center mb-5 sm:mb-16">
              <Button asChild size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 text-sm sm:text-base px-6 sm:px-8 h-10 sm:h-12 shadow-lg shadow-primary/20">
                <Link to="/stories">{t("home.readTheStories")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-6 sm:px-8 h-10 sm:h-12">
                <Link to="/startup-guide">{t("nav.startupGuide")}</Link>
              </Button>
            </div>

            {/* Mini founder avatars as social proof */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-3">
                {featuredStories.map((s) => (
                  <div key={s.id} className={`w-9 h-9 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-[0.6rem] font-bold text-white ring-2 ring-background`}>
                    {s.initials}
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t("home.realStoriesFrom")} <span className="font-medium text-foreground">{t("home.realFounders")}</span> {t("home.acrossTheKingdom")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do — Premium Pillars */}
      <section className="py-20 sm:py-28 border-t border-border/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.03] blur-[120px]" />
        <div className="px-4 sm:container relative">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t("home.whatWeDo")}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t("home.buildingDefinitive")} <span className="gradient-text">{t("home.definitivePlatform")}</span>
              <br className="hidden sm:block" /> {t("home.forSaudiEntrepreneurship")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("home.weConnectDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: t("nav.startupGuide"),
                desc: t("home.startupGuideDesc"),
                color: "from-rose-500 to-orange-400",
                to: "/startup-guide",
              },
              {
                icon: Mic,
                title: t("nav.founderStories"),
                desc: t("home.founderStoriesDesc"),
                color: "from-emerald-500 to-teal-400",
                to: "/stories",
              },
              {
                icon: Rocket,
                title: t("home.risingFoundersTitle"),
                desc: t("home.risingFoundersDesc"),
                color: "from-violet-500 to-indigo-400",
                to: "/rising-founders",
              },
              {
                icon: Lightbulb,
                title: t("home.ecosystemInsights"),
                desc: t("home.ecosystemInsightsDesc"),
                color: "from-amber-500 to-yellow-400",
                to: "/insights",
              },
            ].map((pillar) => (
              <Link key={pillar.title} to={pillar.to} className="group block">
                <div className="relative rounded-2xl border border-border/50 bg-card p-6 sm:p-8 h-full hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  <div className={`absolute top-0 right-0 w-28 h-28 rounded-full bg-gradient-to-br ${pillar.color} opacity-[0.06] blur-[50px] group-hover:opacity-[0.18] transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <pillar.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pillar.desc}</p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("home.explore")} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Saudi Startup Ecosystem — Industry Data */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="px-4 sm:container">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2 text-center">{t("home.saudiEcosystem")}</p>
          <h2 className="font-display text-lg sm:text-xl font-semibold mb-8 text-center text-muted-foreground">
            {t("home.industryData")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-10 max-w-4xl mx-auto">
            {ecosystemHighlights.map((item) => (
              <div key={item.labelKey} className="text-center sm:text-left group">
                <div className="inline-flex items-center justify-center sm:justify-start w-10 h-10 rounded-xl gradient-bg mb-4">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-display text-2xl sm:text-3xl font-bold mb-1">{item.stat}</p>
                <p className="text-sm font-medium text-foreground mb-1">{t(item.labelKey)}</p>
                <p className="text-xs text-muted-foreground">{t(item.descKey)}</p>
                <p className="text-[0.6rem] sm:text-[0.65rem] text-muted-foreground/60 mt-1 italic">{t(item.sourceKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories — Editorial Grid */}
      <section className="py-16 sm:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="px-4 sm:container relative">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t("home.featured")}</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                {t("home.latestStories")}
              </h2>
            </div>
            <Link to="/stories" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
              {t("home.viewAll")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Bento-style grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {storiesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border border-border/50 bg-card overflow-hidden animate-pulse ${i === 0 ? "sm:col-span-2 p-8 sm:p-12" : "p-6 sm:p-8"}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 bg-muted rounded w-24" />
                        <div className="h-3 bg-muted rounded w-16" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-5 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))
              : featuredStories.map((story, i) => (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className={`group block ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className={`relative rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 bg-card overflow-hidden ${i === 0 ? "p-8 sm:p-12" : "p-6 sm:p-8"}`}>
                  {/* Subtle gradient accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${story.color} opacity-[0.08] blur-[60px] group-hover:opacity-[0.15] transition-opacity`} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {story.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{story.founder}</p>
                        <p className="text-xs text-muted-foreground">{story.company}</p>
                      </div>
                      <span className="ml-auto px-2.5 py-0.5 rounded-full text-[0.6rem] sm:text-xs font-medium gradient-bg text-primary-foreground">
                        {story.industry}
                      </span>
                    </div>

                    <h3 className={`font-display font-bold group-hover:text-primary transition-colors leading-tight ${i === 0 ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl"}`}>
                      {story.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("home.readStory")} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/stories" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              {t("home.viewAllStories")}
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Quotes */}
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:container">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2 text-center">{t("home.inTheirWords")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 text-center">
            {t("home.wisdomFrom")} <span className="gradient-text">{t("home.founders")}</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {founderQuotes.map((q, i) => (
              <div key={i} className="relative rounded-2xl border border-border/50 p-6 sm:p-8 bg-card group hover:border-primary/20 transition-all">
                <Quote className="h-8 w-8 text-primary/15 mb-4" />
                <blockquote className="text-sm sm:text-base leading-relaxed text-foreground mb-6 font-medium italic">
                  "{q.quote}"
                </blockquote>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground">{q.founder}</p>
                  <p className="text-xs text-muted-foreground">{q.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="px-4 sm:container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-bg mb-5">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t("home.neverMiss")} <span className="gradient-text">{t("home.story")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              {t("home.newsletterDesc")}
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <CheckCircle2 className="h-5 w-5" />
                <span>{t("home.yourOnTheList")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-border/60 bg-card shadow-sm flex-1"
                />
                <Button type="submit" disabled={submitting} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 h-12 px-6 rounded-xl shadow-lg shadow-primary/20">
                  {submitting ? t("home.subscribing") : t("home.subscribe")}
                </Button>
              </form>
            )}

            <p className="text-[0.65rem] sm:text-xs text-muted-foreground mt-4">
              {t("home.joinFounders")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="px-4 sm:container">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

            <div className="relative p-10 sm:p-16 md:p-24 text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
                {t("home.yourStoryCould")}
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                {t("home.wereDocumenting")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="outline" className="bg-white text-foreground hover:bg-white/90 border-0 text-sm sm:text-base px-8 h-12 shadow-xl">
                  <Link to="/stories">{t("home.exploreStories")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-white/10 text-sm sm:text-base px-8 h-12">
                  <Link to="/about">{t("home.getInTouch")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
