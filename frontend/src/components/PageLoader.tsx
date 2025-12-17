import { Spinner } from "@/components/ui/spinner"

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Spinner className="w-12 h-12" />
    </div>
  )
}
