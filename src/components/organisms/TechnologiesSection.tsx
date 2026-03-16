import i18n from '../../i18n'
import { useSkeletonDelay } from '../../hooks/useSkeletonDelay'
import { useSyncedLanguage } from '../../hooks/useSyncedLanguage'
import { useInViewSection } from '../../hooks/useInViewSection'

const technologyKeys = ['restApi', 'spei', 'iso20022', 'oauth', 'webhook'] as const

export const TechnologiesSection = () => {
  const language = useSyncedLanguage()
  const isLoading = useSkeletonDelay(700)
  const { sectionRef, isInView } = useInViewSection({ disabled: isLoading })

  if (isLoading) {
    return (
      <section className="tech-section" aria-busy="true" aria-live="polite">
        <div className="tech-container">
          <div className="tech-divider" />
          <div className="tech-header tech-header-skeleton">
            <div className="contact-skeleton-line tech-skeleton-title" />
            <div className="contact-skeleton-line tech-skeleton-subtitle" />
          </div>
          <div className="tech-carousel">
            <div className="tech-track tech-track-skeleton">
              <div className="contact-skeleton-line tech-skeleton-pill" />
              <div className="contact-skeleton-line tech-skeleton-pill tech-skeleton-pill-short" />
              <div className="contact-skeleton-line tech-skeleton-pill" />
              <div className="contact-skeleton-line tech-skeleton-pill" />
              <div className="contact-skeleton-line tech-skeleton-pill tech-skeleton-pill-short" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const technologies = technologyKeys.map((key) => {
    return i18n.t(`technologies.tags.${key}`, { lng: language })
  })

  const carouselItems = [...technologies, ...technologies]

  return (
    <section
      ref={sectionRef}
      className={`tech-section section-animate ${isInView ? 'section-visible' : ''}`}
      aria-label={i18n.t('technologies.title', { lng: language })}
    >
      <div className="tech-container">
        <div className="tech-divider" />
        <header className="tech-header">
          <h2>{i18n.t('technologies.title', { lng: language })}</h2>
          <p>{i18n.t('technologies.subtitle', { lng: language })}</p>
        </header>

        <div className="tech-carousel">
          <div className="tech-track">
            {carouselItems.map((item, index) => (
              <span className="tech-pill" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
