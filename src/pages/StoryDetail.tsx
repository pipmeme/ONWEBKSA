import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowLeft, ArrowRight, Share2, Clock, ChevronLeft, ChevronRight, Mail, CheckCircle2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { usePageSEO } from "@/hooks/use-page-seo";
import { toast } from "sonner";
import { getShareUrl } from "@/lib/share";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import FounderTimeline, { type TimelineMilestone } from "@/components/FounderTimeline";
import { resolveContentLanguage, resolveTranslatedArticleFields, toRecord } from "@/lib/article-translations";

// Founder photos mapped by slug
import duwitStudioPhoto from "@/assets/founders/duwit-studio.png";
import sabahjarStudioPhoto from "@/assets/founders/sabahjar-studio.png";
const founderPhotos: Record<string, { src: string; caption: string }> = {
  "duwit-studio": { src: duwitStudioPhoto, caption: "The Duwit Studio team showcasing their games at Saudi Game Champions 2" },
  "sabahjar-studio": { src: sabahjarStudioPhoto, caption: "The Sabahjar Studio team collaborating at SGC2, Saudi Game Center" },
};

interface StorySection {
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
}

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const },
  }),
};

const fetchStoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select("title, category, content, metadata, article_translations(lang, title, excerpt, content, metadata)")
    .eq("slug", slug)
    .in("type", ["founder_story", "rising_founder"] as any)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("not-found");
  return data;
};

const fetchAllStories = async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, category, metadata")
    .eq("type", "founder_story")
    .eq("status", "public")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
};

function calcReadingTime(intro: string, sections: StorySection[]): number {
  const allText = [
    intro,
    ...sections.flatMap((s) => [s.heading || "", s.pullQuote || "", ...s.paragraphs]),
  ].join(" ");
  const words = allText.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const StoryDetail = () => {
  const { t, i18n } = useTranslation();
  const contentLanguage = resolveContentLanguage(i18n.resolvedLanguage || i18n.language);
  const { id } = useParams<{ id: string }>();
  const [nlEmail, setNlEmail] = useState("");
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);

  const handleNlSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail)) {
      toast.error(t("home.validEmail"));
      return;
    }
    setNlSubmitting(true);
    try {
      const res = await supabase.functions.invoke("send-subscription", { body: { email: nlEmail.trim() } });
      if (res.error) throw res.error;
      setNlSubscribed(true);
      setNlEmail("");
    } catch {
      toast.error(t("home.somethingWrong"));
    } finally {
      setNlSubmitting(false);
    }
  };

  // Fetch once per slug — cached for 5 min, language switches are instant (useMemo below)
  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStoryBySlug(id || ""),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });

  const { data: allStories = [] } = useQuery({
    queryKey: ["allStories"],
    queryFn: fetchAllStories,
    staleTime: 5 * 60 * 1000,
  });

  // Language resolution is pure client-side — no re-fetch when user switches language
  const story = useMemo(() => {
    if (!rawData) return null;
    const localized = resolveTranslatedArticleFields(rawData, contentLanguage);
    const metadata = toRecord(localized.metadata);
    const rawContent = localized.content;
    return {
      title: localized.title,
      category: rawData.category,
      content: Array.isArray(rawContent) ? (rawContent as unknown as StorySection[]) : [],
      metadata: {
        founder: typeof metadata?.founder === "string" ? metadata.founder : "",
        company: typeof metadata?.company === "string" ? metadata.company : "",
        intro: typeof metadata?.intro === "string" ? metadata.intro : "",
        milestones: Array.isArray(metadata?.milestones)
          ? (metadata.milestones as TimelineMilestone[])
          : [],
      },
    };
  }, [rawData, contentLanguage]);

  const readingTime = useMemo(() => {
    if (!story) return 0;
    return calcReadingTime(story.metadata.intro, story.content);
  }, [story]);

  const currentIdx = useMemo(() => allStories.findIndex((s) => s.slug === id), [allStories, id]);
  const prevStory = currentIdx > 0 ? allStories[currentIdx - 1] : null;
  const nextStory = currentIdx >= 0 && currentIdx < allStories.length - 1 ? allStories[currentIdx + 1] : null;

  const relatedStories = useMemo(() => {
    if (!story) return [];
    return allStories
      .filter((s) => s.slug !== id && s.category === story.category)
      .slice(0, 3);
  }, [allStories, id, story]);

  usePageSEO(story ? {
    title: `${story.title} — ${story.metadata.founder}`,
    description: story.metadata.intro?.slice(0, 155) || `Read the founder story of ${story.metadata.founder} from ${story.metadata.company}.`,
    path: `/stories/${id}`,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": story.title,
      "author": { "@type": "Person", "name": story.metadata.founder },
      "publisher": { "@type": "Organization", "name": "Founders KSA", "logo": { "@type": "ImageObject", "url": "https://foundersksa.com/logo.png" } },
      "mainEntityOfPage": `https://foundersksa.com/stories/${id}`,
    },
  } : {});

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">{t("storyDetail.loading")}</div>
    );
  }

  if (isError || !story) {
    return <Navigate to="/stories" replace />;
  }

  const { metadata } = story;

  return (
    <>
      <article>
        {/* Hero header */}
        <header className="relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-12 md:pt-16 md:pb-20">
          <div className="absolute inset-0 gradient-bg opacity-[0.03]" />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" animate="visible">
              <motion.div variants={fadeUp} custom={0}>
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-5 sm:mb-8 group"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
                  {t("storyDetail.backToStories")}
                </Link>
              </motion.div>

              <motion.span
                variants={fadeUp}
                custom={0.5}
                className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold tracking-wide uppercase gradient-bg text-primary-foreground mb-3 sm:mb-5"
              >
                {story.category}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] sm:leading-[1.15] tracking-tight mb-4 sm:mb-6"
              >
                {story.title}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                custom={1.5}
                className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xs sm:text-sm shrink-0">
                  {metadata.founder?.[0] || "?"}
                </div>
                <div>
                  <span className="font-semibold text-foreground">{metadata.founder}</span>
                  <span className="mx-1 sm:mx-1.5 opacity-40">·</span>
                  <span>{metadata.company}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Share Bar */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{t("storyDetail.share")}</span>
              {readingTime > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {readingTime} min read
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${story.title} ${getShareUrl(`/stories/${id}`)}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(getShareUrl(`/stories/${id}`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/10 text-foreground hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                aria-label="Share on X"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(`/stories/${id}`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Copy link */}
              <button
                onClick={async () => {
                  const shareUrl = getShareUrl(`/stories/${id}`);
                  if (navigator.share) {
                    try { await navigator.share({ title: story.title, url: shareUrl }); } catch {}
                  } else {
                    await navigator.clipboard.writeText(shareUrl);
                    toast.success(t("storyDetail.linkCopied"));
                  }
                }}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy link"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Founder Photo */}
        {id && founderPhotos[id] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border/30">
              <img
                src={founderPhotos[id].src}
                alt={founderPhotos[id].caption}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-2.5 left-3.5 right-3.5 text-[0.6rem] sm:text-xs text-white/85 font-medium tracking-wide">
                {founderPhotos[id].caption}
              </p>
            </div>
          </motion.div>
        )}

        {/* Body */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-16">
          {/* Intro */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={sectionVariant}
            custom={0}
            className="text-base sm:text-lg md:text-xl text-foreground/90 leading-[1.7] sm:leading-relaxed font-medium mb-8 sm:mb-12 md:mb-16"
          >
            {metadata.intro}
          </motion.p>

          {/* Interactive Timeline */}
          {metadata.milestones && metadata.milestones.length > 0 && (
            <div className="mb-10 sm:mb-14 md:mb-20">
              <FounderTimeline milestones={metadata.milestones} />
            </div>
          )}

          {/* Sections */}
          {story.content.map((section, i) => (
            <React.Fragment key={i}>
            {i === 2 && (
              <div key={`nl-${i}`} className="my-8 sm:my-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm font-semibold text-foreground">Get more stories like this</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Join founders getting real insights from Saudi Arabia every week.</p>
                {nlSubscribed ? (
                  <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" /> You are on the list!
                  </div>
                ) : (
                  <form onSubmit={handleNlSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      className="h-9 rounded-lg text-sm flex-1"
                    />
                    <Button type="submit" disabled={nlSubmitting} size="sm" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 h-9 px-4 rounded-lg shrink-0">
                      {nlSubmitting ? "..." : "Subscribe"}
                    </Button>
                  </form>
                )}
              </div>
            )}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionVariant}
              custom={i + 1}
              className="mb-8 sm:mb-12 md:mb-16 last:mb-0"
            >
              {section.heading && (
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-5 tracking-tight">
                  {section.heading}
                </h2>
              )}

              {section.pullQuote && (
                <blockquote className="relative my-5 sm:my-8 pl-4 sm:pl-6 border-l-2 sm:border-l-[3px] border-primary/40">
                  <p className="text-sm sm:text-base md:text-lg italic text-foreground/80 leading-relaxed font-medium">
                    &ldquo;{section.pullQuote}&rdquo;
                  </p>
                </blockquote>
              )}

              <div className="space-y-4 sm:space-y-5">
                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="text-sm sm:text-[0.95rem] md:text-base text-foreground/80 leading-[1.75] sm:leading-[1.8] md:leading-[1.85]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.section>
            </React.Fragment>
          ))}
        </div>

        {/* Prev / Next navigation */}
        {(prevStory || nextStory) && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-8">
            <div className="flex items-stretch gap-3 border-t border-border pt-6">
              {prevStory ? (
                <Link
                  to={`/stories/${prevStory.slug}`}
                  className="flex-1 group flex items-center gap-2 rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="min-w-0">
                    <p className="text-[0.65rem] text-muted-foreground mb-0.5">Previous</p>
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{prevStory.title}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}
              {nextStory ? (
                <Link
                  to={`/stories/${nextStory.slug}`}
                  className="flex-1 group flex items-center gap-2 rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:shadow-md transition-all text-right justify-end"
                >
                  <div className="min-w-0">
                    <p className="text-[0.65rem] text-muted-foreground mb-0.5">Next</p>
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{nextStory.title}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-10">
            <h3 className="font-display text-base font-bold mb-4 text-foreground">More in {story.category}</h3>
            <div className="space-y-2">
              {relatedStories.map((s) => {
                const meta = toRecord(s.metadata);
                const founder = (meta?.founder as string) || "";
                const company = (meta?.company as string) || "";
                return (
                  <Link
                    key={s.slug}
                    to={`/stories/${s.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3.5 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                      {founder?.[0] || "F"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{s.title}</p>
                      {founder && <p className="text-xs text-muted-foreground">{founder}{company ? ` · ${company}` : ""}</p>}
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
            custom={0}
            className="rounded-xl sm:rounded-2xl bg-muted/50 border border-border/50 p-5 sm:p-6 md:p-8 text-center"
          >
            <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
              {t("storyDetail.inspiredBy")}
            </p>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 font-semibold text-xs sm:text-sm text-primary hover:underline underline-offset-4 transition-all"
            >
              {t("storyDetail.readMore")} <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default StoryDetail;
