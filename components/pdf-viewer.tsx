"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Issue {
  id: string
  type: "calculation" | "comment" | "data"
  page: number
  title: string
  description: string
  severity: "high" | "medium" | "low"
  highlights?: {
    x: number
    y: number
    width: number
    height: number
    color: string
  }[]
}

interface PdfViewerProps {
  issues: Issue[]
  isFullscreen?: boolean
}

export function PdfViewer({ issues, isFullscreen = false }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(12) // モックの総ページ数
  const [zoom, setZoom] = useState(1)
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 現在のページの問題をフィルタリング
  const currentPageIssues = issues.filter((issue) => issue.page === currentPage)

  useEffect(() => {
    // 実際のアプリでは、PDF.jsを使用してPDFを読み込みます
    // このデモでは、ページのレンダリングをシミュレートします
    renderPage(currentPage)

    // このページに問題がある場合、アクティブな問題を設定
    if (currentPageIssues.length > 0 && !activeIssue) {
      setActiveIssue(currentPageIssues[0])
    } else if (currentPageIssues.length === 0) {
      setActiveIssue(null)
    }
  }, [currentPage, zoom])

  const renderPage = (pageNumber: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスをクリア
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // ページコンテンツをシミュレート（実際のアプリではPDFページになります）
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(50 * zoom, 50 * zoom, 500 * zoom, 700 * zoom)

    // モックのテキスト行を描画
    ctx.fillStyle = "#333333"
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(70 * zoom, (100 + i * 30) * zoom, 460 * zoom, 3 * zoom)
    }

    // モックの表を描画
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 1 * zoom
    ctx.strokeRect(70 * zoom, 250 * zoom, 460 * zoom, 200 * zoom)

    // 表の行
    for (let i = 1; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(70 * zoom, (250 + i * 40) * zoom)
      ctx.lineTo(530 * zoom, (250 + i * 40) * zoom)
      ctx.stroke()
    }

    // 表の列
    for (let i = 1; i < 4; i++) {
      ctx.beginPath()
      ctx.moveTo((70 + i * 115) * zoom, 250 * zoom)
      ctx.lineTo((70 + i * 115) * zoom, 450 * zoom)
      ctx.stroke()
    }

    // このページの問題のハイライトを描画
    if (activeIssue && activeIssue.highlights) {
      activeIssue.highlights.forEach((highlight) => {
        ctx.fillStyle = highlight.color + "80" // 透明度を追加
        ctx.fillRect(highlight.x * zoom, highlight.y * zoom, highlight.width * zoom, highlight.height * zoom)

        // 境界線を描画
        ctx.strokeStyle = highlight.color
        ctx.lineWidth = 2 * zoom
        ctx.strokeRect(highlight.x * zoom, highlight.y * zoom, highlight.width * zoom, highlight.height * zoom)
      })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6))
  }

  const handleIssueClick = (issue: Issue) => {
    setActiveIssue(issue)
    if (issue.page !== currentPage) {
      setCurrentPage(issue.page)
    }
  }

  return (
    <div className={`grid grid-cols-1 ${isFullscreen ? "grid-cols-1" : "md:grid-cols-3"} gap-4`}>
      <div className={isFullscreen ? "col-span-1" : "md:col-span-2"}>
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">前のページ</span>
              </Button>
              <span>
                ページ {currentPage} / {totalPages}
              </span>
              <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">次のページ</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.6}>
                <ZoomOut className="h-4 w-4" />
                <span className="sr-only">縮小</span>
              </Button>
              <span>{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 2}>
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">拡大</span>
              </Button>
            </div>
          </div>
          <div className="overflow-auto border rounded-md" style={{ height: isFullscreen ? "80vh" : "70vh" }}>
            <canvas ref={canvasRef} width={600 * zoom} height={800 * zoom} className="mx-auto" />
          </div>
        </Card>
      </div>
      {!isFullscreen && (
        <div>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">ページ {currentPage} の問題</h3>
            {currentPageIssues.length === 0 ? (
              <p className="text-muted-foreground">このページには問題が見つかりませんでした。</p>
            ) : (
              <div className="space-y-4">
                {currentPageIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3 rounded-md cursor-pointer ${
                      activeIssue?.id === issue.id ? "bg-muted border-l-4 border-primary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleIssueClick(issue)}
                  >
                    <h4 className="font-medium">{issue.title}</h4>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                  </div>
                ))}
              </div>
            )}
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-2">すべての問題</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-2 rounded-md cursor-pointer text-sm ${
                    activeIssue?.id === issue.id ? "bg-muted border-l-4 border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleIssueClick(issue)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{issue.title}</span>
                    <span className="text-muted-foreground">ページ {issue.page}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
