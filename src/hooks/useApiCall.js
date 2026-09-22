import { useState } from "react"

export function useApiCall(ready) {
  const [loading, setLoading] = useState("")
  const [response, setResponse] = useState("")
  const [meta, setMeta] = useState({
    status: null,
    method: null,
    duration: null,
  })

  const setLocalError = (methodName, text) => {
    setMeta({ status: "VALIDATION", method: methodName, duration: 0 })
    setResponse(JSON.stringify({ error: text }, null, 2))
  }

  const call = async (methodName, request) => {
    if (!ready) {
      setLocalError(methodName, "Введите idInstance и ApiTokenInstance")
      return
    }

    setLoading(methodName)
    const started = performance.now()

    try {
      const result = await request()
      const duration = Math.round(performance.now() - started)

      setMeta({ status: result.status, method: methodName, duration })

      const text = await result.text()
      let parsed
      try {
        parsed = text ? JSON.parse(text) : null
      } catch {
        parsed = text
      }

      setResponse(
        JSON.stringify(
          { httpStatus: result.status, ok: result.ok, data: parsed },
          null,
          2
        )
      )
    } catch (error) {
      setMeta({
        status: "NETWORK",
        method: methodName,
        duration: Math.round(performance.now() - started),
      })
      setResponse(
        JSON.stringify(
          {
            error: "Network / CORS error",
            message: error.message,
            hint: "Проверьте интернет, CORS и корректность apiUrl.",
          },
          null,
          2
        )
      )
    } finally {
      setLoading("")
    }
  }

  const clear = () => {
    setResponse("")
    setMeta({ status: null, method: null, duration: null })
  }

  const copy = async () => {
    if (!response) return
    try {
      await navigator.clipboard?.writeText(response)
    } catch {}
  }

  return { loading, response, meta, call, setLocalError, clear, copy }
}