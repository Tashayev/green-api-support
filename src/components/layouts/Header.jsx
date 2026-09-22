import { ShieldCheck, Terminal } from "lucide-react"

export function Header({ ready, state, stateInfo }) {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Terminal size={19} /></div>
          <div>
            <div className="brand-title">GREEN-API</div>
            <div className="brand-subtitle">Support Console</div>
          </div>
        </div>

        <div className="topbar-status">
          <span className={`status-dot ${ready ? "ready" : ""}`} />
          {!ready
            ? "Waiting for credentials"
            : state.kind === "checking"
              ? "Checking instance…"
              : stateInfo.label}
        </div>
      </header>

      <section className="intro">
        <div>
          <div className="eyebrow">TECHNICAL SUPPORT · 2ND LINE</div>
          <h1>API request console</h1>
          <p>Проверка подключения и выполнение основных методов GREEN-API.</p>
        </div>
        <div className="intro-badge">
          <ShieldCheck size={17} />
          Client-side demo
        </div>
      </section>
    </>
  )
}