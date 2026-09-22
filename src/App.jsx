import { useMemo } from "react"

import { Header, MainPanel, Sidebar, Workspace } from "./components/layouts"
import {
  CredentialsCard,
  MessageCard,
  FileCard,
  ResponsePanel,
  MethodRow,
} from "./components/features"
import { HelpNote } from "./components/ui"
import { useApiCall, useCredentials, useInstanceState } from "./hooks"
import { buildEndpoint, describeInstance } from "./services/api"

export function App() {
  const { idInstance, apiToken, setIdInstance, setApiToken, ready } =
    useCredentials()
  const { state, check } = useInstanceState(idInstance, apiToken, ready)
  const { loading, response, meta, call, clear, copy } = useApiCall(ready)

  const endpoint = useMemo(
    () => (ready ? buildEndpoint(idInstance) : ""),
    [idInstance, ready],
  )

  const handleGetSettings = () =>
    call("getSettings", () => greenApi.getSettings(idInstance, apiToken))

  const handleGetStateInstance = () =>
    call("getStateInstance", () =>
      greenApi.getStateInstance(idInstance, apiToken),
    )

  const handleSendMessage = (payload) =>
    call("sendMessage", () =>
      greenApi.sendMessage(idInstance, apiToken, payload),
    )

  const handleSendFile = (payload) =>
    call("sendFileByUrl", () =>
      greenApi.sendFileByUrl(idInstance, apiToken, payload),
    )

  return (
    <div className="app-shell">
      <Header
        ready={ready}
        state={state}
        stateInfo={describeInstance(state.value)}
      />

      <Workspace>
        <Sidebar>
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
            loading={loading === "sendMessage"}
            onSubmit={handleSendMessage}
          />
          <FileCard
            loading={loading === "sendFileByUrl"}
            onSubmit={handleSendFile}
          />
        </Sidebar>

        <MainPanel>
          <ResponsePanel
            endpoint={endpoint}
            meta={meta}
            response={response}
            onCopy={copy}
            onClear={clear}
          />
          <MethodRow
            loading={loading}
            onGetSettings={handleGetSettings}
            onGetState={handleGetStateInstance}
          />
          <HelpNote />
        </MainPanel>
      </Workspace>
    </div>
  )
}
