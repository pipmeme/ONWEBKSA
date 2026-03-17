import { useState, useMemo } from "react";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowLeft, Share2, Copy, Check, BookOpen, Clock, Lightbulb, ArrowRight } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { usePageSEO } from "@/hooks/use-page-seo";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getShareUrl } from "@/lib/share";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { contentLanguageToLocale, resolveContentLanguage, resolveTranslatedArticleFields, toRecord } from "@/lib/article-translations";

interface Section {
  heading?: string;
  pullQuote?: string;
  paragraphs: string[];
}

const CONCLUSION_HEADINGS = new Set(["conclusion", "conclusions", "summary", "takeaway", "заключение", "вывод", "итог", "الخلاصة"]);

const isConclusionHeading = (heading?: string) =>
  heading ? CONCLUSION_HEADINGS.has(heading.trim().toLowerCase()) : false;

const fetchInsightBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select("title, category, created_at, content, metadata, article_translations(lang, title, excerpt, content, metadata)")
    .eq("slug", slug)
    .eq("type", "insight")
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("not-found");
  return data;
};

const InsightDetail = () => {
  const { t, i18n } = useTranslation();
  const contentLanguage = resolveContentLanguage(i18n.resolvedLanguage || i18n.language);
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  // Fetch once per slug — cached for 5 min, language switches are instant (useMemo below)
  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ["insight", id],
    queryFn: () => fetchInsightBySlug(id || ""),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });

  // Language resolution is pure client-side — no re-fetch when user switches language
  const article = useMemo(() => {
    if (!rawData) return null;
    const localized = resolveTranslatedArticleFields(rawData, contentLanguage);
    const rawContent = localized.content;
    return {
      ...rawData,
      title: localized.title,
      content: Array.isArray(rawContent) ? (rawContent as unknown as Section[]) : [],
      metadata: toRecord(localized.metadata) as Record<string, string> | null,
    };
  }, [rawData, contentLanguage]);

  usePageSEO(article ? {
    title: article.title,
    description: t("insightDetail.seoDescription", {
      category: article.category || t("insights.title"),
      title: article.title,
    }),
    path: `/insights/${id}`,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "publisher": { "@type": "Organization", "name": "Founders KSA" },
      "mainEntityOfPage": `https://foundersksa.com/insights/${id}`,
    },
  } : {});

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">{t("common.loading")}</div>
    );
  }

  if (isError || !article) {
    return <Navigate to="/insights" replace />;
  }

  const readTime = article.metadata?.readTime || t("insightDetail.defaultReadTime");
  const shareUrl = getShareUrl(`/insights/${id}`);
  const locale = contentLanguageToLocale(contentLanguage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success(t("insightDetail.linkCopied"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url: shareUrl });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const mainSections = article.content.filter((s) => !isConclusionHeading(s.heading));
  const conclusionSection = article.content.find((s) => isConclusionHeading(s.heading));

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="px-4 sm:container py-10 sm:py-14 md:py-20 relative">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 sm:mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("insightDetail.allInsights")}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold gradient-bg text-primary-foreground tracking-wide uppercase">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {readTime}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(article.created_at).toLocaleDateString(locale, {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] mb-6 sm:mb-8 tracking-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                {t("storyDetail.share")}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("insightDetail.copied") : t("insightDetail.copyLink")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Content */}
      <section className="py-10 sm:py-14 md:py-20">
        <div className="px-4 sm:container">
          <div className="max-w-3xl mx-auto">
            {mainSections.map((section, sIdx) => {
              const sectionNumber = sIdx + 1;
              const isFirstParagraph = sIdx === 0;

              return (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mb-12 sm:mb-16"
                >
                  {/* Numbered section header */}
                  {section.heading && (
                    <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-7">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-bg flex items-center justify-center mt-0.5">
                        <span className="text-sm sm:text-base font-bold text-primary-foreground">
                          {String(sectionNumber).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug tracking-tight">
                        {section.heading}
                      </h2>
                    </div>
                  )}

                  {/* Pull quote */}
                  {section.pullQuote && (
                    <div className="relative my-8 sm:my-10">
                      <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-1 rounded-full gradient-bg" />
                      <blockquote className="pl-6 sm:pl-8">
                        <p className="text-lg sm:text-xl md:text-2xl italic text-foreground/90 font-medium leading-relaxed">
                          "{section.pullQuote}"
                        </p>
                      </blockquote>
                    </div>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs.map((para, pIdx) => {
                    const isDropCap = isFirstParagraph && pIdx === 0 && !section.heading;
                    return (
                      <p
                        key={pIdx}
                        className={`text-[0.95rem] sm:text-base md:text-[1.1rem] text-muted-foreground leading-[1.8] sm:leading-[1.85] mb-5 sm:mb-6 ${
                          isDropCap ? "first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-foreground first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })}

                  {/* Section divider */}
                  {sIdx < mainSections.length - 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-4 sm:pt-6">
                      <span className="w-1 h-1 rounded-full bg-primary/30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      <span className="w-1 h-1 rounded-full bg-primary/30" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Conclusion takeaway card */}
            {conclusionSection && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 sm:p-8 md:p-10 mb-12 sm:mb-16"
              >
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                    {t("insightDetail.keyTakeaway")}
                  </h2>
                </div>
                {conclusionSection.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[0.95rem] sm:text-base md:text-[1.05rem] text-foreground/80 leading-[1.8] mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            )}

            {/* Footer CTA */}
            <div className="border-t border-border pt-8 sm:pt-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t("insightDetail.moreInsights")}</p>
                    <p className="text-xs text-muted-foreground">{t("insightDetail.moreInsightsDesc")}</p>
                  </div>
                </div>
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  {t("insightDetail.browseAll")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightDetail;
