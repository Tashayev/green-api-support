const env = import.meta.env

export const API_URL =
  env.VITE_API_URL?.trim()

export const STORAGE_KEY =
  env.VITE_STORAGE_KEY?.trim()

export const CHAT_ID_RE = /^\d+@(c|g)\.us$/i
export const FALLBACK_FILE_NAME = "file"