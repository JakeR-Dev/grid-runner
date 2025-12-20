import { useEffect } from 'react'

export function useKeyboard(callback) {
  useEffect(() => {
    const handler = e => callback(e.key)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}