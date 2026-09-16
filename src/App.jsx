import { useMemo, useState } from "react"
import {
  CircleHelp,
  Settings2,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react"
import { MethodButton } from "./components/ui"
import { CredentialsCard } from "./components/CredentialsCard"
import { MessageCard } from "./components/MessageCard"
import { FileCard } from "./components/FileCard"
import { ResponsePanel } from "./components/ResponsePanel"
import { useApiCall, useCredentials, useInstanceState } from "./components/hooks"
import { buildEndpoint, describeInstance } from "./components/api"
import {
  buildSendFileBody,
  validateChatId,
  validateFileUrl,
  validateMessage,
} from "./components/validators"

export function App() {
  const { idInstance, apiToken, setIdInstance, setApiToken, ready } =
    useCredentials()
  const { state, check } = useInstanceState(idInstance, apiToken, ready)
  const { loading, response, meta, call, setLocalError, clear, copy } =
    useApiCall(ready)

  const [chatId, setChatId] = useState("")
  const [message, setMessage] = useState("Hello from GREEN-API!")
  const [fileUrl, setFileUrl] = useState("")
  const [fileName, setFileName] = useState("")
  const [caption, setCaption] = useState("")

  const endpoint = useMemo(
    () => (ready ? buildEndpoint(idInstance) : ""),
    [idInstance, ready]
  )

  const getSettings = () =>
    call("getSettings", () =>
      fetch(`${endpoint}/getSettings/${encodeURIComponent(apiToken.trim())}`)
    )

  const getStateInstance = () =>
    call("getStateInstance", () =>
      fetch(`${endpoint}/getStateInstance/${encodeURIComponent(apiToken.trim())}`)
    )

  const sendMessage = () => {
    const cid = validateChatId(chatId)
    if (cid.error) return setLocalError("sendMessage", cid.error)

    const msg = validateMessage(message)
    if (msg.error) return setLocalError("sendMessage", msg.error)

    return call("sendMessage", () =>
      fetch(`${endpoint}/sendMessage/${encodeURIComponent(apiToken.trim())}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: cid.value, message: msg.value }),
      })
    )
  }

  const sendFile = () => {
    const cid = validateChatId(chatId)
    if (cid.error) return setLocalError("sendFileByUrl", cid.error)

    const url = validateFileUrl(fileUrl)
    if (url.error) return setLocalError("sendFileByUrl", url.error)

    const body = buildSendFileBody({
      chatId: cid.value,
      urlFile: url.value,
      fileName,
      caption,
    })

    return call("sendFileByUrl", () =>
      fetch(`${endpoint}/sendFileByUrl/${encodeURIComponent(apiToken.trim())}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    )
  }

  const stateInfo = describeInstance(state.value)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Terminal size={19} />
          </div>
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
            : state.kind === "ok"
            ? stateInfo.label
            : state.kind === "error"
            ? stateInfo.label
            : "Instance credentials ready"}
        </div>
      </header>

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

        <div className="content-grid">
          <aside className="sidebar">
            <CredentialsCard
              idInstance={idInstance}
              apiToken={apiToken}
              onChangeId={setIdInstance}
              onChangeToken={setApiToken}
              credentialsReady={ready}
              state={state}
              onRefresh={() => check(true)}
            />
            <MessageCard
              chatId={chatId}
              message={message}
              onChangeChatId={setChatId}
              onChangeMessage={setMessage}
              loading={loading === "sendMessage"}
              onSubmit={sendMessage}
            />
            <FileCard
              chatId={chatId}
              fileUrl={fileUrl}
              fileName={fileName}
              caption={caption}
              onChangeChatId={setChatId}
              onChangeFileUrl={setFileUrl}
              onChangeFileName={setFileName}
              onChangeCaption={setCaption}
              loading={loading === "sendFileByUrl"}
              onSubmit={sendFile}
            />
          </aside>

          <section className="main-panel">
            <ResponsePanel
              endpoint={endpoint}
              meta={meta}
              response={response}
              onCopy={copy}
              onClear={clear}
            />

            <div className="methods-row">
              <MethodButton
                title="getSettings"
                description="Получить настройки"
                icon={<Settings2 size={17} />}
                loading={loading === "getSettings"}
                onClick={getSettings}
              />
              <MethodButton
                title="getStateInstance"
                description="Проверить состояние"
                icon={<Wifi size={17} />}
                loading={loading === "getStateInstance"}
                onClick={getStateInstance}
              />
            </div>

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
          </section>
        </div>
      </main>
    </div>
  )
}