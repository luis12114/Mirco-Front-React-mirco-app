import { useEffect, useRef, useState } from 'react'

export type UseInViewSectionOptions = {
  /** Qué porcentaje de la sección debe ser visible para activarse (0-1). */
  threshold?: number
  /** Si true, solo se dispara una vez; si false, responde a entrar/salir. */
  triggerOnce?: boolean
  /** Si está activo el skeleton u otro estado que no debe observarse. */
  disabled?: boolean
}

export const useInViewSection = ({ threshold = 0.18, triggerOnce = false, disabled = false }: UseInViewSectionOptions = {}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (disabled) {
      setIsInView(false)
      return undefined
    }

    const element = sectionRef.current
    if (!element || globalThis.IntersectionObserver === undefined) {
      setIsInView(true)
      return undefined
    }

    const observer = new globalThis.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (triggerOnce) {
              observer.disconnect()
            }
          } else if (!triggerOnce) {
            setIsInView(false)
          }
        })
      },
      {
        threshold,
        root: null,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, triggerOnce, disabled])

  return { sectionRef, isInView }
}
