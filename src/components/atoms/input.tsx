import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type InputStatus = 'default' | 'error' | 'success'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon
  status?: InputStatus
  registration: UseFormRegisterReturn
}

export const Input = ({ icon: Icon, status = 'default', registration, ...props }: InputProps) => {
  return (
    <div className={`contact-input-wrapper contact-input-${status}`}>
      <Icon size={20} aria-hidden="true" className="contact-input-icon" />
      <input className="contact-input" {...registration} {...props} />
    </div>
  )
}
