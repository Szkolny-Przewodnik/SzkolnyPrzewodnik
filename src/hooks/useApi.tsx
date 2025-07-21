import axios from "axios"
import { useReducer, useEffect } from "react"

enum ActionFetch {
  START = "FETCH_START",
  SUCCESS = "FETCH_SUCCESS",
  FAILED = "FETCH_FAILED",
}

const apiReducer = (
  state: any,
  action: {
    type: ActionFetch
    data?: any
    error?: Error | null
  }
) => {
  switch (action.type) {
    case ActionFetch.START:
      return { data: null, loading: true, error: null }
    case ActionFetch.SUCCESS:
      return { data: action.data.data, loading: false, error: null }
    case ActionFetch.FAILED:
      return { data: null, loading: false, error: action.error }
  }
  return state
}

const useApi = (path: string, token?: string) => {
  const [response, dispatch] = useReducer(apiReducer, {
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const Fetch = async () => {
      dispatch({ type: ActionFetch.START })

      await axios
        .get("/api" + path, {
          headers: {
            Authorization: token,
          },
        })
        .then(data => {
          dispatch({ type: ActionFetch.SUCCESS, data: data })
        })
        .catch(error => dispatch({ type: ActionFetch.FAILED, error: error }))
    }
    Fetch()
  }, [path, token])

  return response
}

export default useApi
