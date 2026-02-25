import { useQuery } from 'react-apollo'
import { useMemo } from 'react'
import appSettings from '../query/getAppSettings.graphql'

export const useAppSettings = () => {
  const { data, loading, error } = useQuery(appSettings, {
    ssr: false,
  })

  const settings = useMemo(() => {
    const rawMessage = data?.appSettings?.message
    if (!rawMessage) return null

    try {
      return typeof rawMessage === 'string'
        ? JSON.parse(rawMessage)
        : rawMessage
    } catch {
      return null
    }
  }, [data])

  return {
    settings,
    loading,
    error,
  }
}
