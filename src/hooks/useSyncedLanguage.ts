import { useEffect, useState } from 'react'
import { getCurrentLanguage } from '../i18n'

export const useSyncedLanguage = () => {
  const [language, setLanguage] = useState(getCurrentLanguage())

  useEffect(() => {
    const syncLanguage = () => {
      const nextLanguage = getCurrentLanguage()

      setLanguage((currentLanguage) => {
        return currentLanguage === nextLanguage ? currentLanguage : nextLanguage
      })
    }

    syncLanguage()

    globalThis.addEventListener('focus', syncLanguage)
    globalThis.addEventListener('storage', syncLanguage)
    document.addEventListener('visibilitychange', syncLanguage)
    const intervalId = globalThis.setInterval(syncLanguage, 500)

    return () => {
      globalThis.removeEventListener('focus', syncLanguage)
      globalThis.removeEventListener('storage', syncLanguage)
      document.removeEventListener('visibilitychange', syncLanguage)
      globalThis.clearInterval(intervalId)
    }
  }, [])

  return language
}
