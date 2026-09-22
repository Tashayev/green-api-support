import { Settings2, Wifi } from "lucide-react"
import { MethodButton } from "../ui"

export function MethodRow({ loading, onGetSettings, onGetState }) {
  return (
    <div className="methods-row">
      <MethodButton
        title="getSettings"
        description="Получить настройки"
        icon={<Settings2 size={17} />}
        loading={loading === "getSettings"}
        onClick={onGetSettings}
      />
      <MethodButton
        title="getStateInstance"
        description="Проверить состояние"
        icon={<Wifi size={17} />}
        loading={loading === "getStateInstance"}
        onClick={onGetState}
      />
    </div>
  )
}