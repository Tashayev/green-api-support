import { CheckCircle2, CircleHelp, Copy, RefreshCw, Wifi } from "lucide-react"

export function ResponsePanel({ endpoint, meta, response, onCopy, onClear }) {
  const ok = meta.status === 200
  const label =
    meta.status === "NETWORK"
      ? "NET"
      : meta.status === "VALIDATION"
      ? "!"
      : meta.status

  return (
    <div className="card response-card">
      <div className="response-header">
        <div className="card-heading">
          <div className="icon-box green">
            <Wifi size={18} />
          </div>
          <div>
            <h2>API Response</h2>
            <span>Ответ сервера в режиме read-only</span>
          </div>
        </div>

        <div className="response-actions">
          <button className="ghost-button" onClick={onCopy} title="Copy response">
            <Copy size={15} />
            Copy
          </button>
          <button className="ghost-button" onClick={onClear} title="Clear">
            <RefreshCw size={15} />
            Clear
          </button>
        </div>
      </div>

      <div className="request-toolbar">
        <div className="method-pill">GET / POST</div>
        <div className="endpoint">
          {endpoint || "https://api.green-api.com/waInstance…"}
        </div>
        {meta.method && (
          <div className="request-meta">
            <span className={ok ? "success" : "danger"}>
              {ok ? <CheckCircle2 size={14} /> : <CircleHelp size={14} />}
              {label}
            </span>
            <span>{meta.method}</span>
            <span>{meta.duration} ms</span>
          </div>
        )}
      </div>

      <textarea
        className="response-editor"
        readOnly
        value={response}
        placeholder={`{\n  "idMessage": "3EB0C767D097B7C7C030"\n}`}
        spellCheck="false"
      />
    </div>
  )
}