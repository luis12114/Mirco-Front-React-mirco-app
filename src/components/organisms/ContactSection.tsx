import { Building2, Check, Mail, Phone, User } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import i18n from '../../i18n'
import { useSkeletonDelay } from '../../hooks/useSkeletonDelay'
import { useSyncedLanguage } from '../../hooks/useSyncedLanguage'
import { useInViewSection } from '../../hooks/useInViewSection'
import { Button } from '../atoms/Button'
import { FormField } from '../molecules/FormField'

type ContactFormValues = {
  fullName: string
  company: string
  email: string
  phone: string
}

const fullNamePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
const companyPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,&-]+$/
const phonePattern = /^\+?[0-9\s()-]+$/

export const ContactSection = () => {
  const language = useSyncedLanguage()
  const isLoading = useSkeletonDelay(900)
  const { sectionRef, isInView } = useInViewSection({ disabled: isLoading })

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<ContactFormValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = (values: ContactFormValues) => {
    console.log(i18n.t('contact.formSubmitted', { lng: language }), values)
    reset(values)
  }

  useEffect(() => {
    const fieldsWithErrors = Object.keys(errors) as (keyof ContactFormValues)[]

    if (fieldsWithErrors.length > 0) {
      void trigger(fieldsWithErrors)
    }
  }, [language, errors, trigger])

  if (isLoading) {
    return (
      <section className="contact-section contact-section-loading" id="contacto" aria-busy="true" aria-live="polite">
        <div className="contact-left-panel contact-left-panel-skeleton">
          <div className="contact-skeleton-line contact-skeleton-title" />
          <div className="contact-skeleton-line contact-skeleton-text" />
          <div className="contact-skeleton-line contact-skeleton-text contact-skeleton-text-short" />
          <ul className="contact-benefits-list contact-benefits-skeleton">
            <li>
              <span className="contact-check-icon contact-check-icon-skeleton" aria-hidden="true" />
              <div className="contact-skeleton-line contact-skeleton-item" />
            </li>
            <li>
              <span className="contact-check-icon contact-check-icon-skeleton" aria-hidden="true" />
              <div className="contact-skeleton-line contact-skeleton-item" />
            </li>
            <li>
              <span className="contact-check-icon contact-check-icon-skeleton" aria-hidden="true" />
              <div className="contact-skeleton-line contact-skeleton-item contact-skeleton-item-short" />
            </li>
          </ul>
        </div>

        <div className="contact-form-card contact-form-skeleton">
          <div className="contact-skeleton-line contact-skeleton-label" />
          <div className="contact-skeleton-line contact-skeleton-input" />
          <div className="contact-skeleton-line contact-skeleton-label" />
          <div className="contact-skeleton-line contact-skeleton-input" />
          <div className="contact-skeleton-line contact-skeleton-label" />
          <div className="contact-skeleton-line contact-skeleton-input" />
          <div className="contact-skeleton-line contact-skeleton-label" />
          <div className="contact-skeleton-line contact-skeleton-input" />
          <div className="contact-skeleton-line contact-skeleton-button" />
          <div className="contact-skeleton-line contact-skeleton-legal" />
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`contact-section section-animate ${isInView ? 'section-visible' : ''}`}
      id="contacto"
    >
      <div className="contact-left-panel">
        <h2>{i18n.t('contact.title', { lng: language })}</h2>
        <p>
          {i18n.t('contact.description', { lng: language })}
        </p>
        <ul className="contact-benefits-list">
          <li>
            <span className="contact-check-icon" aria-hidden="true">
              <Check size={14} />
            </span>
            {' '}
            {i18n.t('contact.benefits.fastResponse', { lng: language })}
          </li>
          <li>
            <span className="contact-check-icon" aria-hidden="true">
              <Check size={14} />
            </span>
            {' '}
            {i18n.t('contact.benefits.customDemo', { lng: language })}
          </li>
          <li>
            <span className="contact-check-icon" aria-hidden="true">
              <Check size={14} />
            </span>
            {' '}
            {i18n.t('contact.benefits.technicalAdvice', { lng: language })}
          </li>
        </ul>
      </div>

      <div className="contact-form-card">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField<ContactFormValues>
            name="fullName"
            label={i18n.t('contact.form.fullNameLabel', { lng: language })}
            placeholder={i18n.t('contact.form.fullNamePlaceholder', { lng: language })}
            successMessage={i18n.t('contact.form.successField', { lng: language })}
            icon={User}
            register={register}
            error={errors.fullName?.message}
            isValid={Boolean(dirtyFields.fullName) && !errors.fullName}
            rules={{
              required: i18n.t('contact.validation.required', { lng: language }),
              minLength: { value: 3, message: i18n.t('contact.validation.min3', { lng: language }) },
              maxLength: { value: 60, message: i18n.t('contact.validation.max60', { lng: language }) },
              pattern: { value: fullNamePattern, message: i18n.t('contact.validation.validName', { lng: language }) },
            }}
          />

          <FormField<ContactFormValues>
            name="company"
            label={i18n.t('contact.form.companyLabel', { lng: language })}
            placeholder={i18n.t('contact.form.companyPlaceholder', { lng: language })}
            successMessage={i18n.t('contact.form.successField', { lng: language })}
            icon={Building2}
            register={register}
            error={errors.company?.message}
            isValid={Boolean(dirtyFields.company) && !errors.company}
            rules={{
              required: i18n.t('contact.validation.required', { lng: language }),
              minLength: { value: 2, message: i18n.t('contact.validation.min2', { lng: language }) },
              maxLength: { value: 80, message: i18n.t('contact.validation.max80', { lng: language }) },
              pattern: { value: companyPattern, message: i18n.t('contact.validation.validCompany', { lng: language }) },
            }}
          />

          <FormField<ContactFormValues>
            name="email"
            label={i18n.t('contact.form.emailLabel', { lng: language })}
            placeholder={i18n.t('contact.form.emailPlaceholder', { lng: language })}
            successMessage={i18n.t('contact.form.successField', { lng: language })}
            icon={Mail}
            type="email"
            register={register}
            error={errors.email?.message}
            isValid={Boolean(dirtyFields.email) && !errors.email}
            rules={{
              required: i18n.t('contact.validation.required', { lng: language }),
              maxLength: { value: 120, message: i18n.t('contact.validation.max120', { lng: language }) },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: i18n.t('contact.validation.validEmail', { lng: language }),
              },
            }}
          />

          <FormField<ContactFormValues>
            name="phone"
            label={i18n.t('contact.form.phoneLabel', { lng: language })}
            placeholder={i18n.t('contact.form.phonePlaceholder', { lng: language })}
            successMessage={i18n.t('contact.form.successField', { lng: language })}
            icon={Phone}
            type="tel"
            register={register}
            error={errors.phone?.message}
            isValid={Boolean(dirtyFields.phone) && !errors.phone}
            rules={{
              required: i18n.t('contact.validation.required', { lng: language }),
              minLength: { value: 10, message: i18n.t('contact.validation.min10', { lng: language }) },
              maxLength: { value: 20, message: i18n.t('contact.validation.max20', { lng: language }) },
              pattern: { value: phonePattern, message: i18n.t('contact.validation.validPhone', { lng: language }) },
            }}
          />

          <Button type="submit" withSendIcon>
            {i18n.t('contact.form.submit', { lng: language })}
          </Button>
          <p className="contact-privacy-note">
            {i18n.t('contact.form.privacy', { lng: language })}
          </p>
        </form>
      </div>
    </section>
  )
}
