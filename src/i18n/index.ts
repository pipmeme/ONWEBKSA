import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Only English is loaded eagerly — AR and RU are lazy-loaded on demand
import en from './locales/en.json';

const rtlLanguages = new Set(['ar']);

const applyDocumentLanguage = (language: string) => {
  if (typeof document === 'undefined') return;
  const normalized = language.split('-')[0];
  document.documentElement.lang = normalized;
  document.documentElement.dir = rtlLanguages.has(normalized) ? 'rtl' : 'ltr';
};

const loadLanguage = async (lng: string) => {
  const normalized = lng.split('-')[0];
  if (normalized === 'en' || i18n.hasResourceBundle(normalized, 'translation')) return;
  try {
    if (normalized === 'ar') {
      const { default: ar } = await import('./locales/ar.json');
      i18n.addResourceBundle('ar', 'translation', ar, true, true);
    } else if (normalized === 'ru') {
      const { default: ru } = await import('./locales/ru.json');
      i18n.addResourceBundle('ru', 'translation', ru, true, true);
    }
  } catch {
    // falls back to English silently
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'ru'],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Load current language immediately if not English
const initialLang = i18n.resolvedLanguage || i18n.language || 'en';
loadLanguage(initialLang);

i18n.on('languageChanged', (lng) => {
  applyDocumentLanguage(lng);
  loadLanguage(lng);
});

applyDocumentLanguage(initialLang);

export default i18n;
