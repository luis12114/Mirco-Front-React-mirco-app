import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Send } from 'lucide-react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  withSendIcon?: boolean
}

export const Button = ({ children, withSendIcon = false, ...props }: ButtonProps) => {
  return (
    <button className="contact-submit-button" type="button" {...props}>
      <span>{children}</span>
      {withSendIcon ? <Send size={18} aria-hidden="true" /> : null}
    </button>
  )
}
