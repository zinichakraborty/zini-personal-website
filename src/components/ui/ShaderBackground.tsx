"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

/** Fixed full-screen Dithering shader background + theme toggle, shared across all pages. */
export default function ShaderBackground() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  // On mount, restore the persisted theme so it survives page navigation.
  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") !== "light")
  }, [])

  // Respect the user's reduced-motion preference by freezing the shader.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Drive the card/nav colors (styled in global.css) off the same toggle and persist it.
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light"
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [isDarkMode])

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={reduceMotion ? 0 : 0.1}
        />
      </div>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed right-6 top-3 z-30 rounded-full p-2 text-white transition-colors hover:bg-white/10"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </>
  )
}
