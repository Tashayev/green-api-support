import { Loader2 } from "lucide-react"

export function ActionButton({ children, icon, loading, onClick }) {
  return (
    <button className="action-button" onClick={onClick} disabled={loading}>
      {loading ? <Loader2 className="spin" size={16} /> : icon}
      {children}
    </button>
  )
}
