export function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        className="input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </label>
  )
}
