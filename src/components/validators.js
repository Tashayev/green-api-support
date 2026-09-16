import { CHAT_ID_RE } from "./constants"
import { getFileName } from "./api"

/**
 * Все валидаторы возвращают либо { error }, либо { value: normalized }.
 * Единый контракт — чтобы в App не было if-ветвлений на разные формы.
 */

export function validateChatId(raw) {
  const value = (raw || "").trim()
  if (!value) return { error: "Укажите Chat ID" }
  if (!CHAT_ID_RE.test(value))
    return { error: "Chat ID должен быть в формате 79991234567@c.us" }
  return { value }
}

export function validateMessage(raw) {
  if (!raw || !raw.trim()) return { error: "Сообщение пустое" }
  return { value: raw }
}

export function validateFileUrl(raw) {
  const value = (raw || "").trim()
  if (!value) return { error: "Укажите File URL" }

  let url
  try {
    url = new URL(value)
  } catch {
    return { error: "Некорректный File URL" }
  }

  if (!/^https?:$/.test(url.protocol))
    return { error: "File URL должен начинаться с http:// или https://" }

  return { value: url.toString() }
}

export function buildSendFileBody({ chatId, urlFile, fileName, caption }) {
  return {
    chatId,
    urlFile,
    fileName: fileName.trim() || getFileName(urlFile),
    ...(caption.trim() ? { caption: caption.trim() } : {}),
  }
}