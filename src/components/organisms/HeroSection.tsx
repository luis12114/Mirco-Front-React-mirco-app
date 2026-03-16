import { Play, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import i18n from '../../i18n'
import { useSkeletonDelay } from '../../hooks/useSkeletonDelay'
import { useSyncedLanguage } from '../../hooks/useSyncedLanguage'
import { useInViewSection } from '../../hooks/useInViewSection'

const heroVideo = new URL('../../assets/videos/home.mp4', import.meta.url).href

export const HeroSection = () => {
  const language = useSyncedLanguage()
  const isLoading = useSkeletonDelay(700)
  const { sectionRef, isInView } = useInViewSection({ threshold: 0.28, disabled: isLoading })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || isLoading) return

    // Ensure muted is set (required for iOS autoplay)
    video.muted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    
    const retryPlay = () => {
      video.play().catch(() => {})
    }

    const attemptPlay = () => {
      video.play().catch(() => {
        // Retry after a short delay
        setTimeout(retryPlay, 100)
      })
    }

    // Try to play immediately
    attemptPlay()

    // Also try when video is ready
    video.addEventListener('canplay', attemptPlay, { once: true })
    video.addEventListener('loadeddata', attemptPlay, { once: true })

    return () => {
      video.removeEventListener('canplay', attemptPlay)
      video.removeEventListener('loadeddata', attemptPlay)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <section id="inicio" className="hero-section" aria-busy="true" aria-live="polite">
        <div className="hero-container hero-container-skeleton">
          <div className="hero-left">
            <div className="contact-skeleton-line hero-skeleton-badge" />
            <div className="hero-skeleton-title-block">
              <div className="contact-skeleton-line hero-skeleton-title" />
              <div className="contact-skeleton-line hero-skeleton-title" />
              <div className="contact-skeleton-line hero-skeleton-title" />
              <div className="contact-skeleton-line hero-skeleton-title hero-skeleton-title-last" />
            </div>
            <div className="contact-skeleton-line hero-skeleton-text" />
            <div className="contact-skeleton-line hero-skeleton-text hero-skeleton-text-short" />

            <div className="hero-actions hero-actions-skeleton">
              <div className="contact-skeleton-line hero-skeleton-primary" />
              <div className="contact-skeleton-line hero-skeleton-secondary" />
            </div>

            <div className="hero-metrics hero-metrics-skeleton">
              <div className="hero-metric-item">
                <div className="contact-skeleton-line hero-skeleton-metric-value" />
                <div className="contact-skeleton-line hero-skeleton-metric-label" />
              </div>
              <div className="hero-metric-item">
                <div className="contact-skeleton-line hero-skeleton-metric-value" />
                <div className="contact-skeleton-line hero-skeleton-metric-label" />
              </div>
              <div className="hero-metric-item">
                <div className="contact-skeleton-line hero-skeleton-metric-value" />
                <div className="contact-skeleton-line hero-skeleton-metric-label" />
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-media hero-media-skeleton" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className={`hero-section section-animate ${isInView ? 'section-visible' : ''}`}
      aria-label={i18n.t('hero.title', { lng: language })}
    >
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>{i18n.t('hero.badge', { lng: language })}</span>
          </div>

          <h1 className="hero-title">
            {i18n.t('hero.heading.line1', { lng: language })} {i18n.t('hero.heading.line2', { lng: language })} <span className="hero-title-highlight">{i18n.t('hero.heading.line3', { lng: language })}</span>
          </h1>

          <p className="hero-subtitle">{i18n.t('hero.subtitle', { lng: language })}</p>

          <div className="hero-actions">
            <button type="button" className="hero-primary-button">
              <span>{i18n.t('hero.ctaPrimary', { lng: language })}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <button type="button" className="hero-secondary-button">
              <span className="hero-secondary-icon">
                <Play size={16} aria-hidden="true" />
              </span>
              <span>{i18n.t('hero.ctaSecondary', { lng: language })}</span>
            </button>
          </div>

          <div className="hero-divider" />

          <div className="hero-metrics">
            <div className="hero-metric-item">
              <span className="hero-metric-value">99.9%</span>
              <span className="hero-metric-label">{i18n.t('hero.metrics.availability', { lng: language })}</span>
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-value">&lt;2s</span>
              <span className="hero-metric-label">{i18n.t('hero.metrics.processingTime', { lng: language })}</span>
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-value">24/7</span>
              <span className="hero-metric-label">{i18n.t('hero.metrics.support', { lng: language })}</span>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <div className="hero-media">
            <video
              ref={videoRef}
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="hero-video"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
