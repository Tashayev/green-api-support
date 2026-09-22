import { useEffect, useRef, useState } from "react"
import { buildEndpoint, explainHttpError } from "../api"

export function useInstanceState(idInstance, apiToken, ready) {
  const [state, setState] = useState({ kind: "idle", value: null, hint: "" })
  const timerRef = useRef(null)

  const check = (immediate = false) => {
    if (!ready) return
    if (timerRef.current) clearTimeout(timerRef.current)

    const url = `${buildEndpoint(idInstance)}/getStateInstance/${encodeURIComponent(
      apiToken.trim()
    )}`

    const run = async () => {
      setState({ kind: "checking", value: null, hint: "" })
      try {
        const res = await fetch(url)
        const text = await res.text()
        let parsed
        try {
          parsed = text ? JSON.parse(text) : null
        } catch {
          parsed = text
        }

        if (!res.ok) {
          setState({
            kind: "error",
            value:
              parsed && typeof parsed === "object"
                ? parsed.stateInstance
                : `HTTP ${res.status}`,
            hint: explainHttpError(res.status, parsed),
          })
          return
        }

        setState({
          kind: "ok",
          value:
            parsed && typeof parsed === "object"
              ? parsed.stateInstance
              : "unknown",
          hint: "",
        })
      } catch {
        setState({
          kind: "error",
          value: "NETWORK",
          hint: "Network / CORS error",
        })
      }
    }

    if (immediate) run()
    else timerRef.current = setTimeout(run, 600)
  }

  useEffect(() => {
    if (!ready) {
      setState({ kind: "idle", value: null, hint: "" })
      return
    }
    check(false)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [idInstance, apiToken, ready])

  return { state, check }
}