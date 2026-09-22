import { API_URL, FALLBACK_FILE_NAME } from "../utils/constants"

export function buildEndpoint(idInstance) {
  return `${API_URL}/waInstance${idInstance.trim()}`
}

export function explainHttpError(status, parsed) {
  if (status === 401) return "Неверный ApiTokenInstance"
  if (status === 403) return "Доступ запрещён"
  if (status === 404) return "Проверьте idInstance в URL"
  if (status === 429) return "Превышен лимит запросов"
  if (status === 466) return "Инстанс не авторизован"
  if (parsed && typeof parsed === "object" && parsed.message) return parsed.message
  return `HTTP ${status}`
}

export function describeInstance(state) {
  switch (state) {
    case "authorized":
      return { tone: "success", label: "Инстанс авторизован" }
    case "notAuthorized":
      return { tone: "danger", label: "Не авторизован — отсканируйте QR" }
    case "blocked":
      return { tone: "danger", label: "Инстанс заблокирован" }
    case "sleepMode":
      return { tone: "warning", label: "Инстанс в спящем режиме" }
    case "starting":
      return { tone: "warning", label: "Инстанс запускается" }
    case "yellowCard":
      return { tone: "warning", label: "Yellow card — ограничения" }
    default:
      return { tone: "warning", label: state || "Состояние неизвестно" }
  }
}

export function getFileName(url) {
  try {
    const pathname = new URL(url).pathname
    const name = pathname.split("/").filter(Boolean).pop()
    return name || FALLBACK_FILE_NAME
  } catch {
    return FALLBACK_FILE_NAME
  }
}