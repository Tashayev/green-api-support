import { Loader2 } from "lucide-react"

export function MethodButton({ title, description, icon, loading, onClick }) {
  return (
    <button className="method-button" onClick={onClick} disabled={loading}>
      <span className="method-icon">
        {loading ? <Loader2 className="spin" size={17} /> : icon}
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  )
}
