import { ArrowRight, CheckCircle2 } from 'lucide-react'
import i18n from '../../i18n'
import { useSkeletonDelay } from '../../hooks/useSkeletonDelay'
import { useSyncedLanguage } from '../../hooks/useSyncedLanguage'
import { useInViewSection } from '../../hooks/useInViewSection'

const featureItemKeys = ['api', 'webhooks', 'analytics', 'support'] as const
const technologyKeys = ['restApi', 'spei', 'iso20022', 'oauth', 'webhook'] as const
const featureImage = new URL('../../assets/images/befenicios.jpg', import.meta.url).href
const fallbackImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export const InfoSection = () => {
  const language = useSyncedLanguage()
  const isLoading = useSkeletonDelay(750)
  const { sectionRef, isInView } = useInViewSection({ disabled: isLoading })

  if (isLoading) {
    return (
      <section id="soluciones" className="info-section" aria-busy="true" aria-live="polite">
        <div className="info-container info-container-skeleton">
          <div className="info-media-skeleton contact-skeleton-line" />
          <div className="info-content-skeleton">
            <div className="contact-skeleton-line info-skeleton-badge" />
            <div className="contact-skeleton-line info-skeleton-title" />
            <div className="contact-skeleton-line info-skeleton-title info-skeleton-title-short" />
            <div className="contact-skeleton-line info-skeleton-text" />
            <div className="contact-skeleton-line info-skeleton-text" />
            <div className="contact-skeleton-line info-skeleton-text info-skeleton-text-short" />
            <div className="info-list-skeleton">
              <div className="info-list-skeleton-item">
                <span className="info-check-icon info-check-icon-skeleton" aria-hidden="true" />
                <div className="contact-skeleton-line info-skeleton-item" />
              </div>
              <div className="info-list-skeleton-item">
                <span className="info-check-icon info-check-icon-skeleton" aria-hidden="true" />
                <div className="contact-skeleton-line info-skeleton-item" />
              </div>
              <div className="info-list-skeleton-item">
                <span className="info-check-icon info-check-icon-skeleton" aria-hidden="true" />
                <div className="contact-skeleton-line info-skeleton-item info-skeleton-item-short" />
              </div>
              <div className="info-list-skeleton-item">
                <span className="info-check-icon info-check-icon-skeleton" aria-hidden="true" />
                <div className="contact-skeleton-line info-skeleton-item info-skeleton-item-short" />
              </div>
            </div>
            <div className="contact-skeleton-line info-skeleton-button" />
          </div>
        </div>

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
      id="soluciones"
      ref={sectionRef}
      className={`info-section section-animate ${isInView ? 'section-visible' : ''}`}
      aria-label={i18n.t('info.title', { lng: language })}
    >
      <div className="info-container">
        <figure className="info-media">
          <img
            src={featureImage}
            alt={i18n.t('info.imageAlt', { lng: language })}
            className="info-image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.classList.add('info-image-fallback')
              event.currentTarget.src = fallbackImage
            }}
          />
        </figure>

        <div className="info-content">
          <span className="info-badge">{i18n.t('info.badge', { lng: language })}</span>
          <h2>{i18n.t('info.title', { lng: language })}</h2>
          <p>{i18n.t('info.description', { lng: language })}</p>

          <ul className="info-list">
            {featureItemKeys.map((key) => (
              <li key={key}>
                <span className="info-check-icon" aria-hidden="true">
                  <CheckCircle2 size={14} />
                </span>
                <span>{i18n.t(`info.features.${key}`, { lng: language })}</span>
              </li>
            ))}
          </ul>

          <button type="button" className="info-cta-button">
            <span>{i18n.t('info.cta', { lng: language })}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

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
