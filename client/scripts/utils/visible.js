import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useRef, useState } from "react"

export const isVisible = (onAppear = () => {}, onDisappear = () => {}) => {
    const [isVisible, setIsVisible] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true)
      onAppear()

      return () => {
        setIsVisible(false)
        onDisappear()
      }
    }, []))

    return isVisible
}

export const isMounted = (onMount = () => {}, onUnmount = () => {}) => {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    onMount()
    return () => {
      setIsMounted(false)
      onUnmount()
    }
  }, [])

  return isMounted
}