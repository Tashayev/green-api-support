import { useEffect, useState } from "react"
import { STORAGE_KEY } from "../constants"

export function useCredentials() {
  const [idInstance, setIdInstance] = useState("")
  const [apiToken, setApiToken] = useState("")

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
      if (typeof saved.idInstance === "string") setIdInstance(saved.idInstance)
      if (typeof saved.apiToken === "string") setApiToken(saved.apiToken)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ idInstance, apiToken })
      )
    } catch {}
  }, [idInstance, apiToken])

  const ready = Boolean(idInstance.trim() && apiToken.trim())

  return { idInstance, apiToken, setIdInstance, setApiToken, ready }
}