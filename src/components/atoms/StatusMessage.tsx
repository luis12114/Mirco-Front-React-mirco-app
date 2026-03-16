import { AlertCircle, CheckCircle2 } from 'lucide-react'

type StatusMessageProps = {
  type: 'error' | 'success'
  message: string
}

export const StatusMessage = ({ type, message }: StatusMessageProps) => {
  return (
    <p className={`contact-status-message contact-status-${type}`}>
      {type === 'error' ? <AlertCircle size={16} aria-hidden="true" /> : <CheckCircle2 size={16} aria-hidden="true" />}
      <span>{message}</span>
    </p>
  )
}
