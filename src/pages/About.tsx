import { usePageSEO } from "@/hooks/use-page-seo";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Mail,
  MapPin,
  Send,
  BookOpen,
  Mic,
  Rocket,
  Lightbulb,
  Shield,
  ArrowRight,
  Globe,
  BarChart3,
  Users,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fadeUp } from "@/lib/animations";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  usePageSEO({
    title: "About Founders KSA",
    description:
      "Learn about Founders KSA — our mission to make entrepreneurship in Saudi Arabia accessible, transparent, and inspiring for everyone.",
    path: "/about",
  });

  const pillars = [
    {
      icon: BookOpen,
      title: t("nav.startupGuide"),
      desc: t("about.startupGuideDesc"),
      color: "from-rose-500 to-orange-400",
      to: "/startup-guide",
    },
    {
      icon: Mic,
      title: t("nav.founderStories"),
      desc: t("about.founderStoriesDesc"),
      color: "from-emerald-500 to-teal-400",
      to: "/stories",
    },
    {
      icon: Rocket,
      title: t("home.risingFoundersTitle"),
      desc: t("about.risingFoundersDesc"),
      color: "from-violet-500 to-indigo-400",
      to: "/rising-founders",
    },
    {
      icon: Lightbulb,
      title: t("home.ecosystemInsights"),
      desc: t("about.ecosystemInsightsDesc"),
      color: "from-amber-500 to-yellow-400",
      to: "/insights",
    },
  ];

  const dataSources = [
    { name: t("about.misa"), full: t("about.misaFull"), icon: Globe },
    { name: t("about.ministryOfCommerce"), full: t("about.commercialReg"), icon: FileText },
    { name: t("about.gosi"), full: t("about.gosiFull"), icon: Users },
    { name: t("about.zatca"), full: t("about.zatcaFull"), icon: BarChart3 },
  ];

  const values = [
    {
      icon: Target,
      title: t("about.mission"),
      description: t("about.missionDesc"),
    },
    {
      icon: Eye,
      title: t("about.vision"),
      description: t("about.visionDesc"),
    },
    {
      icon: Heart,
      title: t("about.values"),
      description: t("about.valuesDesc"),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await supabase.functions.invoke("send-subscription", {
        body: { ...formData, type: "contact" },
      });
      if (res.error) throw res.error;
      toast({
        title: t("about.messageSent"),
        description: t("about.messageSentDesc"),
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact error:", err);
      toast({
        title: t("about.somethingWrong"),
        description: t("about.tryAgainLater"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero — bold, editorial */}
      <section className="relative overflow-hidden py-14 sm:py-24 md:py-32">
        <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full gradient-bg opacity-[0.06] blur-[120px]" />
        <div className="px-4 sm:container relative">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              {t("about.aboutThePlatform")}
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
              {t("about.theDefinitive")}{" "}
              <span className="gradient-text">{t("about.saudiEntrepreneurship")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("about.heroDesc")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why We Exist — origin story without personal info */}
      <section className="py-14 sm:py-20 border-t border-border/40">
        <div className="px-4 sm:container">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                {t("about.whyWeExist")}
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                {t("about.informationGap")} <span className="gradient-text">{t("about.hadToClose")}</span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="text-sm sm:text-base text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  {t("about.whyPara1")}
                </p>
                <p>
                  {t("about.whyPara2")}
                </p>
              </motion.div>
            </motion.div>

            {/* Values cards — stacked on the right */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {values.map((v, i) => (
                <motion.div key={v.title} variants={fadeUp} custom={i} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <v.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold mb-0.5">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do — Platform Pillars */}
      <section className="py-14 sm:py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full gradient-bg opacity-[0.03] blur-[100px]" />
        <div className="px-4 sm:container relative">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t("home.whatWeDo")}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t("about.fourPillars")} <span className="gradient-text">{t("about.onePlatform")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              {t("about.fourPillarsDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={p.to} className="group block">
                  <div className="relative rounded-2xl border border-border/50 bg-card p-5 sm:p-7 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${p.color} opacity-[0.06] blur-[40px] group-hover:opacity-[0.15] transition-opacity`} />
                    <div className="relative flex gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <p.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources We Trust */}
      <section className="py-14 sm:py-20 border-t border-border/40">
        <div className="px-4 sm:container">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              <Shield className="h-3.5 w-3.5" /> {t("about.verifiedInfo")}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {t("about.dataSources")} <span className="gradient-text">{t("about.trust")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              {t("about.dataSourcesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {dataSources.map((s, i) => (
              <motion.div key={s.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="text-center p-4 sm:p-6 rounded-xl border border-border/50 bg-card"
              >
                <div className="w-10 h-10 mx-auto rounded-lg gradient-bg flex items-center justify-center mb-3">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-display text-sm font-bold mb-0.5">{s.name}</p>
                <p className="text-[0.65rem] sm:text-xs text-muted-foreground leading-tight">{s.full}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="px-4 sm:container">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
              <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl sm:text-3xl font-bold mb-2">
                {t("about.getIn")} <span className="gradient-text">{t("about.touch")}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-sm sm:text-base">
                {t("about.contactDesc")}
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 space-y-4">
                <motion.div variants={fadeUp} custom={0} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-0.5">{t("about.email")}</h4>
                    <p className="text-xs text-muted-foreground">info@foundersksa.com</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} custom={1} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-0.5">{t("about.location")}</h4>
                    <p className="text-xs text-muted-foreground">{t("about.riyadhSaudiArabia")}</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-3">
                <Card className="border-border/50">
                  <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input placeholder={t("about.yourName")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        <Input type="email" placeholder={t("about.yourEmail")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      </div>
                      <Textarea placeholder={t("about.yourMessage")} rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                      <Button type="submit" disabled={submitting} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-full sm:w-auto">
                        {submitting ? t("about.sending") : t("about.sendMessage")} {!submitting && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
