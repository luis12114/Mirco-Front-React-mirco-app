import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import { Input } from '../atoms/input'
import { StatusMessage } from '../atoms/StatusMessage'

type FormFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>
  label: string
  placeholder: string
  successMessage?: string
  icon: LucideIcon
  register: UseFormRegister<FormValues>
  rules: RegisterOptions<FormValues, Path<FormValues>>
  error?: string
  isValid?: boolean
  type?: 'text' | 'email' | 'tel'
}

export const FormField = <FormValues extends FieldValues>({
  name,
  label,
  placeholder,
  successMessage = 'Campo completado correctamente',
  icon,
  register,
  rules,
  error,
  isValid = false,
  type = 'text',
}: FormFieldProps<FormValues>) => {
  let status: 'default' | 'error' | 'success' = 'default'

  if (error) {
    status = 'error'
  } else if (isValid) {
    status = 'success'
  }

  return (
    <div className="contact-form-field">
      <label htmlFor={name} className="contact-label">
        {label}
      </label>
      <Input
        id={name}
        icon={icon}
        status={status}
        placeholder={placeholder}
        type={type}
        registration={register(name, rules)}
      />
      {error ? <StatusMessage type="error" message={error} /> : null}
      {!error && isValid ? <StatusMessage type="success" message={successMessage} /> : null}
    </div>
  )
}
