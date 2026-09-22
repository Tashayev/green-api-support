import { ShieldCheck } from "lucide-react"

export function Workspace({ children }) {
  return (
    <main className="workspace">
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

      <div className="content-grid">{children}</div>
    </main>
  )
}
