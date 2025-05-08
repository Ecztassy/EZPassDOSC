"use client"

import { Monitor, Book, Code } from "lucide-react"

export default function Desktop({ onOpenProgram }) {
  return (
    <div className="border border-green-500 p-4 mb-4 min-h-[200px] relative">
      <div className="absolute top-2 left-2 text-xs">Desktop</div>

      <div className="flex flex-col items-start mt-8">
        <button
          onClick={() => onOpenProgram("ezpass-docs", "Documentação EzPass")}
          className="flex flex-col items-center mb-6 hover:text-green-300 transition-colors"
        >
          <div className="border border-green-500 p-2 mb-1">
            <Book className="h-8 w-8" />
          </div>
          <span className="text-xs">Documentação EZPass</span>
        </button>

        <button
          onClick={() => onOpenProgram("slint-docs", "Documentação Slint")}
          className="flex flex-col items-center hover:text-green-300 transition-colors"
        >
          <div className="border border-green-500 p-2 mb-1">
            <Code className="h-8 w-8" />
          </div>
          <span className="text-xs">Documentação Slint</span>
        </button>
      </div>

      <div className="absolute bottom-2 right-2 flex items-center text-xs">
        <Monitor className="h-4 w-4 mr-1" />
        <span>Void Nucleus</span>
      </div>
    </div>
  )
}
