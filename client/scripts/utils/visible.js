import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useRef, useState } from "react"

export const isVisible = () => {
    const [isVisible, setIsVisible] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true)

      return () => {
        setIsVisible(false)
      }
    }, []))

    return isVisible
}

export const isMounted = () => {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}