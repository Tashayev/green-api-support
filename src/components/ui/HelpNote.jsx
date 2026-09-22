import { CircleHelp } from "lucide-react"

export function HelpNote() {
  return (
    <div className="help-note">
      <CircleHelp size={17} />
      <div>
        <strong>Перед проверкой</strong>
        <span>
          Создайте инстанс в GREEN-API, авторизуйте WhatsApp по QR-коду
          и вставьте credentials выше.
        </span>
      </div>
    </div>
  )
}