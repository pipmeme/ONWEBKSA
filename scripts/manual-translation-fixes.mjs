import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

function parseEnvValue(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    const value = parseEnvValue(match[2]);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.publish"));
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));
}

function fail(message) {
  console.error(`\nError: ${message}`);
  process.exit(1);
}

function replaceInContent(content, replacements) {
  if (!Array.isArray(content)) return content;
  return content.map((section) => {
    const copy = { ...section };
    if (typeof copy.heading === "string") {
      for (const [from, to] of replacements) {
        copy.heading = copy.heading.split(from).join(to);
      }
    }
    if (typeof copy.pullQuote === "string") {
      for (const [from, to] of replacements) {
        copy.pullQuote = copy.pullQuote.split(from).join(to);
      }
    }
    if (Array.isArray(copy.paragraphs)) {
      copy.paragraphs = copy.paragraphs.map((p) => {
        if (typeof p !== "string") return p;
        let out = p;
        for (const [from, to] of replacements) {
          out = out.split(from).join(to);
        }
        return out;
      });
    }
    return copy;
  });
}

loadLocalEnv();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl) fail("SUPABASE_URL is required.");
if (!serviceRoleKey) fail("SUPABASE_SERVICE_ROLE_KEY is required.");

const supabase = createClient(supabaseUrl, serviceRoleKey);

const overrides = {
  "strategic-insights-doing-business-saudi-arabia": {
    ar: {
      excerpt:
        "أحدثت التحولات في إطار رؤية 2030 نقلةً في السعودية من سوق معقد إلى وجهة استثمارية عالمية رئيسية، لكن دخول هذا السوق لا يزال يتطلب فهماً دقيقاً لتعقيداته.",
    },
    ru: {
      title: "Вне шума: ключевые стратегические выводы для ведения бизнеса в Саудовской Аравии (Видение 2030)",
      excerpt:
        "Преобразования в рамках Видения 2030 превратили Саудовскую Аравию из сложного для входа рынка в одно из главных направлений глобальных инвестиций, но выход на этот рынок по-прежнему требует тонкого понимания его нюансов.",
    },
  },
  "njd-studio": {
    ar: {
      excerpt:
        "ما بدأ كمشروع شغف لمبرمج في الثانية عشرة من عمره تحوّل إلى استوديو ألعاب محترف يقف في طليعة اقتصاد الانتباه في السعودية.",
    },
    ru: {
      excerpt:
        "То, что началось как проект по любви к делу у 12-летнего программиста, превратилось в профессиональную игровую студию на передовой экономики внимания Саудовской Аравии.",
    },
  },
  "fahy-studios": {
    ar: {
      excerpt:
        "كيف صنع حلم طفولي ألهمته بوكيمون، إلى جانب رؤية 2030 وتحول استراتيجي نحو ألعاب hybrid-casual، واحدةً من أكثر استوديوهات الإنتاج السعودية وعداً.",
    },
    ru: {
      excerpt:
        "Как детская мечта, вдохновлённая Pokémon, поддержка Видения 2030 и стратегический поворот к hybrid-casual играм создали одну из самых перспективных продакшн-студий Саудовской Аравии.",
    },
  },
  "alain-edene": {
    ar: {
      title: "النجاح يُستأجر ولا يُمتلك: الصعود الصامد للسير آلان إيدين",
      excerpt:
        "من كنس أرضيات صالات الرياضة في اسكتلندا إلى المساهمة في تأسيس أندية لياقة رائدة في السعودية، تقدم رحلة السير آلان إيدين درساً عملياً في التواضع والطموح.",
    },
    ru: {
      title: "Успех арендуют, а не владеют им: стойкий взлёт сэра Алена Эдена",
      excerpt:
        "От подметания полов в спортзале в Шотландии до сооснования ведущих фитнес-клубов в Саудовской Аравии — путь сэра Алена Эдена это практический урок смирения и амбиций.",
    },
  },
  "treehouse": {
    ar: {
      title: "متجذر في الصمود: كيف أصبحت Treehouse وجهة الرياض المفضلة من المزرعة إلى المائدة",
      excerpt:
        "ذكرى طفولة في مزرعة عائلية بالقصيم تحولت إلى أحد أكثر مفاهيم «من المزرعة إلى المائدة» حباً في الرياض.",
    },
    ru: {
      excerpt:
        "Детское воспоминание о семейной ферме в Аль-Касиме превратилось в одну из самых любимых в Эр-Рияде концепций «от фермы до стола».",
    },
  },
  "faisal-shaker": {
    ar: {
      title: "قيادة المشهد: رؤية فيصل شاكر لمستقبل فن الطهي في السعودية",
      excerpt:
        "من مسيرة قوية في المصرفية المؤسسية إلى قيادة واحدة من أعرق مجموعات المطاعم في المملكة، تمثل رحلة فيصل درساً في القيادة والقدرة على التكيف.",
    },
    ru: {
      title: "Во главе гастрономической сцены: видение Фейсала Шакера о кулинарном будущем Саудовской Аравии",
      excerpt:
        "От сильной карьеры в корпоративном банкинге до руководства одной из самых престижных ресторанных групп Королевства — путь Фейсала показывает, что такое лидерство и адаптивность.",
    },
  },
  "hassan-ikram": {
    ar: {
      excerpt:
        "من التمويل المؤسسي في Morgan Stanley إلى تأسيس Cotyledon Management Consultancy، تقدم رحلة حسن إكرام درساً في المرونة والنمو الاستراتيجي وتحويل الإخفاق إلى نقطة انطلاق.",
    },
    ru: {
      excerpt:
        "От корпоративных финансов в Morgan Stanley до основания Cotyledon Management Consultancy — путь Хассана Икрама это урок устойчивости, стратегического роста и превращения неудач в трамплин.",
    },
  },
  "race-arabia": {
    ar: {
      title: "اللعب على المدى الطويل: بناء شركة من جذور المجتمع في السعودية",
      excerpt:
        "في الاقتصاد الرياضي الصاعد في المملكة العربية السعودية، تبرز Race Arabia كنموذج للنمو العضوي وريادة الأعمال المدفوعة بالشغف. أسسها نزار الطويجري، وتحولت الشركة من نادٍ مجتمعي للجري إلى المنظم الأبرز في المملكة لفعاليات التحمل العالمية.",
    },
    ru: {
      title: "Игра в долгую: как построить бизнес, опираясь на сообщество в Саудовской Аравии",
      excerpt:
        "В быстрорастущей спортивной экономике Саудовской Аравии Race Arabia стала примером органического роста и предпринимательства, движимого страстью. Основанная Незаром Аль-Тувайджири, компания прошла путь от локального бегового сообщества до ведущего в Королевстве организатора мировых стартов на выносливость.",
    },
  },
  "building-business-saudi-culture-connection-authenticity": {
    ar: {
      title: "بناء مشروع في السعودية: رؤى أساسية حول الثقافة، العلاقات، والأصالة",
      excerpt:
        "يتطلب إطلاق شركة ناشئة في السعودية فهماً عميقاً للثقافة، وقدرة عالية على التكيف، وبناء علاقات أصيلة. وهذه أبرز الدروس من تجربة تأسيس بيت لتصميم السفر والتجارب في الرياض.",
    },
    ru: {
      excerpt:
        "Запуск стартапа в Саудовской Аравии требует культурной чуткости, адаптивности и подлинных связей. Ниже — ключевые уроки из опыта создания в Эр-Рияде студии путешествий и дизайна впечатлений.",
    },
  },
  "duwit-studio": {
    ar: {
      title: "مطوران وحلم واحد: روح «فقط افعلها» التي تقف وراء Duwit",
      excerpt:
        "بعد أن فقدا السيطرة على لعبة ناجحة لصالح المستثمرين، باع مؤسسان إندونيسيان كل شيء وانتقلا إلى الرياض لإعادة البناء — بشروطهما هما.",
    },
    ru: {
      excerpt:
        "После того как инвесторы лишили их контроля над успешной игрой, два индонезийских основателя продали всё и переехали в Эр-Рияд, чтобы построить всё заново — на своих условиях.",
    },
  },
  "sabahjar-studio": {
    ar: {
      title: "تجاوز فخ «الفريميوم»: هندسة لعبة أكشن-روغلايك عالمية المنشأ من السعودية",
      excerpt:
        "استوديو صباحجر يتجاوز سوق الألعاب المحمولة لبناء لعبة أكشن-روغلايك متميزة للحاسوب الشخصي، متجذرة في الميثولوجيا العربية الأصيلة.",
    },
    ru: {
      title: "За пределами ловушки freemium: как в Саудовской Аравии создают глобальную Action-Roguelike",
      excerpt:
        "Sabahjar Studio обходит мобильный сегмент и создаёт премиальный Action-Roguelike для ПК, опираясь на аутентичную арабскую мифологию.",
    },
  },
  "shifting-from-labor-to-logic-ai-services": {
    ar: {
      title: "الهندسة الجديدة: الانتقال من العمل اليدوي إلى المنطق في عصر الذكاء الاصطناعي",
      excerpt:
        "اكتشف كيف تفصل الشركات الخدمية الناشئة الحديثة بين النمو وعدد الموظفين عبر تحويل «الخدمات إلى برمجيات» والاستفادة من قاعدة الـ12% للقيمة.",
    },
    ru: {
      excerpt:
        "Узнайте, как современные сервисные стартапы отделяют рост от численности команды, рассматривая «услуги как программный продукт» и применяя правило 12% ценности.",
    },
  },
  "navigating-new-tides-global-wealth-innovation": {
    ar: {
      title: "الإبحار في التيارات الجديدة للثروة والابتكار العالميين",
      excerpt:
        "نقف اليوم على أعتاب تحول اقتصادي هائل، ومن يمتلك المعرفة الصحيحة سيصوغ مستقبل الثروة والتكنولوجيا وخلق القيمة.",
    },
    ru: {
      title: "Навигация по новым течениям глобального богатства и инноваций",
      excerpt:
        "Мы стоим на пороге масштабной экономической трансформации. Те, кто обладает правильными знаниями, сформируют будущее богатства, технологий и создания ценности.",
    },
  },
};

const replacementsByLang = {
  ar: [
    ["المملكة العربية العربية السعودية", "المملكة العربية السعودية"],
    ["استوديو سبحجر", "استوديو صباحجر"],
  ],
  ru: [
    ["снимается в аренду", "арендуют"],
  ],
};

const { data: rows, error } = await supabase
  .from("article_translations")
  .select("id, article_id, lang, title, excerpt, content, metadata, articles!inner(slug)")
  .in("lang", ["ar", "ru"]);

if (error) fail(error.message);

let updates = 0;
for (const row of rows || []) {
  const slug = row.articles?.slug;
  const lang = row.lang;
  const slugOverrides = overrides[slug]?.[lang] || {};
  const replacements = replacementsByLang[lang] || [];

  let title = slugOverrides.title ?? row.title;
  let excerpt = slugOverrides.excerpt ?? row.excerpt;

  for (const [from, to] of replacements) {
    if (typeof title === "string") title = title.split(from).join(to);
    if (typeof excerpt === "string") excerpt = excerpt.split(from).join(to);
  }

  const content = replaceInContent(row.content, replacements);

  const changed =
    title !== row.title ||
    excerpt !== row.excerpt ||
    JSON.stringify(content) !== JSON.stringify(row.content);

  if (!changed) continue;

  const { error: updateError } = await supabase
    .from("article_translations")
    .update({ title, excerpt, content })
    .eq("id", row.id);

  if (updateError) fail(updateError.message);
  updates += 1;
}

console.log(`Manual translation QA fixes applied. Rows updated: ${updates}`);
