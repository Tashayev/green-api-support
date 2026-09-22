import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Settings2,
} from "lucide-react"
import { Field } from "../ui"
import { describeInstance } from "../../services/api"

export function CredentialsCard({
  idInstance,
  apiToken,
  onChangeId,
  onChangeToken,
  credentialsReady,
  state,
  onRefresh,
}) {
  const info = describeInstance(state.value)

  return (
    <section className="card">
      <div className="card-heading">
        <div className="icon-box">
          <Settings2 size={18} />
        </div>
        <div>
          <h2>Подключение</h2>
          <span>Instance credentials</span>
        </div>
      </div>

      <Field
        label="idInstance"
        value={idInstance}
        onChange={onChangeId}
        placeholder="1101XXXXXXXX"
      />

      <Field
        label="ApiTokenInstance"
        value={apiToken}
        onChange={onChangeToken}
        placeholder="Введите API token"
        type="password"
      />

      {credentialsReady && (
        <div className={`state-pill ${state.kind} ${info.tone}`}>
          {state.kind === "checking" && <Loader2 size={12} className="spin" />}
          {state.kind === "ok" && <CheckCircle2 size={12} />}
          {state.kind === "error" && <AlertTriangle size={12} />}
          <span>{state.kind === "checking" ? "Проверка…" : info.label}</span>
          {state.hint && <em>· {state.hint}</em>}
        </div>
      )}

      <button
        className="ghost-button state-refresh"
        onClick={onRefresh}
        disabled={!credentialsReady || state.kind === "checking"}
        title="Проверить состояние инстанса"
      >
        <RefreshCw size={14} />
        Проверить состояние
      </button>
    </section>
  )
}