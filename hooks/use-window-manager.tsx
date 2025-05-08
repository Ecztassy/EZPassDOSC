"use client"

import { useState } from "react"

export function useWindowManager() {
  const [windows, setWindows] = useState([])
  const [maximizedWindows, setMaximizedWindows] = useState([])
  const [windowPositions, setWindowPositions] = useState({})

  const openWindow = (id, title) => {
    // Check if window is already open
    if (!windows.some((w) => w.id === id)) {
      setWindows((prev) => [...prev, { id, title }])
      // Set initial position if not already set
      if (!windowPositions[id]) {
        setWindowPositions((prev) => ({
          ...prev,
          [id]: {
            x: 50 + Object.keys(prev).length * 30,
            y: 50 + Object.keys(prev).length * 30,
          },
        }))
      }
    }
  }

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((window) => window.id !== id))
    setMaximizedWindows((prev) => prev.filter((windowId) => windowId !== id))
  }

  const maximizeWindow = (id) => {
    if (maximizedWindows.includes(id)) {
      setMaximizedWindows((prev) => prev.filter((windowId) => windowId !== id))
    } else {
      setMaximizedWindows((prev) => [...prev, id])
    }
  }

  const isMaximized = (id) => {
    return maximizedWindows.includes(id)
  }

  const updateWindowPosition = (id, x, y) => {
    setWindowPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }))
  }

  const getWindowPosition = (id) => {
    return windowPositions[id] || { x: 50, y: 50 }
  }

  return {
    windows,
    openWindow,
    closeWindow,
    maximizeWindow,
    isMaximized,
    updateWindowPosition,
    getWindowPosition,
  }
}
