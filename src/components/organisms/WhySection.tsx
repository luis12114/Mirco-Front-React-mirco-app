import { ShieldCheck, Zap, Workflow } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import i18n from '../../i18n'
import { useSkeletonDelay } from '../../hooks/useSkeletonDelay'
import { useSyncedLanguage } from '../../hooks/useSyncedLanguage'
import { useInViewSection } from '../../hooks/useInViewSection'

const featureKeys = ['speed', 'security', 'integration'] as const

type CountUpOptions = {
  durationMs?: number
  delayMs?: number
  start?: boolean
}

const useCountUp = (target: number, options?: CountUpOptions) => {
  const { durationMs = 1400, delayMs = 120, start = true } = options ?? {}
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) {
      setValue(0)
      return
    }

    let animationFrameId: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      startTime ??= timestamp + delayMs

      const elapsed = Math.max(0, timestamp - startTime)
      const progress = Math.min(1, elapsed / durationMs)
      const eased = 1 - (1 - progress) * (1 - progress) // easeOutQuad

      setValue(Math.round(target * eased))

      if (progress < 1) {
        animationFrameId = globalThis.requestAnimationFrame(animate)
      }
    }

    animationFrameId = globalThis.requestAnimationFrame(animate)

    return () => {
      globalThis.cancelAnimationFrame(animationFrameId)
    }
  }, [target, durationMs, delayMs, start])

  return value
}

export const WhySection = () => {
  const language = useSyncedLanguage()
  const isLoading = useSkeletonDelay(650)
  const { sectionRef, isInView } = useInViewSection({ threshold: 0.2, triggerOnce: false, disabled: isLoading })

  const institutionsCount = useCountUp(500, { start: isInView })
  const volumeCount = useCountUp(10, { durationMs: 1600, delayMs: 220, start: isInView })

  if (isLoading) {
    return (
      <section id="beneficios" className="why-section" aria-busy="true" aria-live="polite">
        <div className="why-container why-container-skeleton">
          <header className="why-header why-header-skeleton">
            <div className="contact-skeleton-line why-skeleton-title" />
            <div className="contact-skeleton-line why-skeleton-subtitle" />
          </header>

          <div className="why-grid why-grid-skeleton">
            <div className="why-card why-card-skeleton">
              <div className="contact-skeleton-line why-skeleton-icon" />
              <div className="contact-skeleton-line why-skeleton-card-title" />
              <div className="contact-skeleton-line why-skeleton-card-text" />
              <div className="contact-skeleton-line why-skeleton-card-text why-skeleton-card-text-short" />
            </div>
            <div className="why-card why-card-skeleton">
              <div className="contact-skeleton-line why-skeleton-icon" />
              <div className="contact-skeleton-line why-skeleton-card-title" />
              <div className="contact-skeleton-line why-skeleton-card-text" />
              <div className="contact-skeleton-line why-skeleton-card-text why-skeleton-card-text-short" />
            </div>
            <div className="why-card why-card-skeleton">
              <div className="contact-skeleton-line why-skeleton-icon" />
              <div className="contact-skeleton-line why-skeleton-card-title" />
              <div className="contact-skeleton-line why-skeleton-card-text" />
              <div className="contact-skeleton-line why-skeleton-card-text why-skeleton-card-text-short" />
            </div>
          </div>

          <div className="why-stats-bar why-stats-bar-skeleton">
            <div className="why-stat-item">
              <div className="contact-skeleton-line why-skeleton-stat-value" />
              <div className="contact-skeleton-line why-skeleton-stat-label" />
            </div>
            <div className="why-stat-item">
              <div className="contact-skeleton-line why-skeleton-stat-value" />
              <div className="contact-skeleton-line why-skeleton-stat-label" />
            </div>
            <div className="why-stat-item">
              <div className="contact-skeleton-line why-skeleton-stat-value" />
              <div className="contact-skeleton-line why-skeleton-stat-label" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const featureIconMap: Record<(typeof featureKeys)[number], React.ReactNode> = {
    speed: <Zap size={32} aria-hidden="true" />,
    security: <ShieldCheck size={32} aria-hidden="true" />,
    integration: <Workflow size={32} aria-hidden="true" />,
  }

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className={`why-section section-animate ${isInView ? 'section-visible' : ''}`}
      aria-label={i18n.t('why.title', { lng: language })}
    >
      <div className="why-container">
        <header className="why-header">
          <h2>{i18n.t('why.title', { lng: language })}</h2>
          <p>{i18n.t('why.subtitle', { lng: language })}</p>
        </header>

        <div className="why-grid">
          {featureKeys.map((key) => (
            <article key={key} className="why-card">
              <div className="why-card-icon">{featureIconMap[key]}</div>
              <h3>{i18n.t(`why.features.${key}.title`, { lng: language })}</h3>
              <p>{i18n.t(`why.features.${key}.description`, { lng: language })}</p>
            </article>
          ))}
        </div>

        <div className="why-stats-bar" aria-label={i18n.t('why.stats.ariaLabel', { lng: language })}>
          <div className="why-stat-item">
            <span className="why-stat-value">
              +
              {institutionsCount}
            </span>
            <span className="why-stat-label">{i18n.t('why.stats.institutionsLabel', { lng: language })}</span>
          </div>
          <div className="why-stat-item">
            <span className="why-stat-value">
              $
              {volumeCount}
              B+
            </span>
            <span className="why-stat-label">{i18n.t('why.stats.volumeLabel', { lng: language })}</span>
          </div>
          <div className="why-stat-item">
            <span className="why-stat-value">{i18n.t('why.stats.securityValue', { lng: language })}</span>
            <span className="why-stat-label">{i18n.t('why.stats.securityLabel', { lng: language })}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
