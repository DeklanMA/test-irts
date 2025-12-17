import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/AdminSidebar"
import Navbar from "@/components/Navbar"
import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AdminLayout() {
  const { auth } = useAuth()

  if (auth.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return (
    <SidebarProvider>
      <Toaster richColors position="top-right" />
      <div className="flex min-h-screen w-full ">
        <AdminSidebar />

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar />
          <main className="flex-1 p-6 bg-gray-50 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
