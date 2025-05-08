"use client"

import { X, Maximize, Minimize } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function ProgramWindow({
  id,
  title,
  children,
  isMaximized,
  onClose,
  onMaximize,
  position,
  onPositionChange,
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // Handle drag start
  const handleMouseDown = (e) => {
    if (isMaximized) return

    // Only allow dragging from the title bar
    if (e.target.closest(".window-title-bar")) {
      setIsDragging(true)
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y

    // Update window position
    onPositionChange(id, newX, newY)
  }

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={`border border-green-500 bg-black absolute ${
        isMaximized ? "fixed inset-0 z-50 m-4" : "w-4/5 h-[500px]"
      }`}
      style={
        !isMaximized
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: isDragging ? 100 : 10,
            }
          : {}
      }
      onMouseDown={handleMouseDown}
    >
      <div className="border-b border-green-500 p-2 flex justify-between items-center window-title-bar cursor-move">
        <div className="text-sm select-none">{title}</div>
        <div className="flex">
          <button
            onClick={onMaximize}
            className="mr-2 hover:text-green-300 transition-colors cursor-pointer"
            aria-label={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="hover:text-green-300 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-36px)] overflow-auto">{children}</div>
    </div>
  )
}
