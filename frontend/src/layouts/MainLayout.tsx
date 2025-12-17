import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState, startTransition } from "react"
import Navbar from "@/components/Navbar"
import PageLoader from "@/components/PageLoader"
import { Toaster } from "sonner"

export default function MainLayout() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setLoading(true)
    })

    const timer = setTimeout(() => {
      startTransition(() => {
        setLoading(false)
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="relative">
      <Toaster richColors position="top-right" />
      <Navbar />

      {loading && <PageLoader />}

      <main
        className={`min-h-screen transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
