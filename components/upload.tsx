"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Upload() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("PDFファイルをアップロードしてください")
      return
    }

    setIsUploading(true)

    try {
      // 実際のアプリでは、ここでファイルをサーバーにアップロードします
      // デモ目的で、ファイルアップロードをシミュレートします
      const formData = new FormData()
      formData.append("file", file)

      // API呼び出しをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 分析ページに移動
      router.push("/analysis")
    } catch (error) {
      console.error("ファイルアップロードエラー:", error)
      alert("ファイルのアップロード中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card
      className={`border-2 border-dashed ${isDragging ? "border-primary bg-muted" : "border-muted-foreground/25"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 px-6 py-10">
        <div className="rounded-full bg-muted p-4">
          <UploadIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">財務レポートをアップロード</h3>
          <p className="text-sm text-muted-foreground">PDFファイルをドラッグ＆ドロップするか、クリックして選択</p>
          <p className="text-xs text-muted-foreground">10MBまでのPDFファイル</p>
        </div>
        <label htmlFor="file-upload">
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button disabled={isUploading}>{isUploading ? "アップロード中..." : "PDFを選択"}</Button>
          </div>
        </label>
      </CardContent>
    </Card>
  )
}
