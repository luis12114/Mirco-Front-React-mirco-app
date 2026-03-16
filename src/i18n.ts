import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'

const resources = {
  es,
  en,
}

const LANGUAGE_STORAGE_KEY = 'i18nextLng'
const supportedLanguages = new Set(['es', 'en'])

const normalizeLanguage = (language: string | null | undefined) => {
  if (!language) {
    return null
  }

  const baseLanguage = language.toLowerCase().split('-')[0]

  return supportedLanguages.has(baseLanguage) ? baseLanguage : null
}

const getStoredLanguage = () => normalizeLanguage(globalThis.localStorage.getItem(LANGUAGE_STORAGE_KEY))

const syncLanguageFromStorage = () => {
  const storedLanguage = getStoredLanguage()

  if (storedLanguage && storedLanguage !== normalizeLanguage(i18n.resolvedLanguage)) {
    void i18n.changeLanguage(storedLanguage)
  }
}

export const getCurrentLanguage = () => {
  return getStoredLanguage() ?? normalizeLanguage(i18n.resolvedLanguage) ?? normalizeLanguage(i18n.language) ?? 'es'
}

i18n
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

if (globalThis.window !== undefined) {
  syncLanguageFromStorage()

  globalThis.addEventListener('storage', (event) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      syncLanguageFromStorage()
    }
  })

  globalThis.addEventListener('focus', syncLanguageFromStorage)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncLanguageFromStorage()
    }
  })

  globalThis.setInterval(syncLanguageFromStorage, 500)
}

export default i18n