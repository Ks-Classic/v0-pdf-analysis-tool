"use client"

import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DemoButton() {
  const router = useRouter()

  const handleDemoClick = () => {
    // 実際のアプリでは、デモファイルを読み込みます
    router.push("/analysis")
  }

  return (
    <Button variant="outline" className="mt-2" onClick={handleDemoClick}>
      <FileText className="mr-2 h-4 w-4" />
      デモレポートで試す
    </Button>
  )
}
