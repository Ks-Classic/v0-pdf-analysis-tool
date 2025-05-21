"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Check,
  AlertTriangle,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PdfViewer } from "@/components/pdf-viewer"
import { IssueList } from "@/components/issue-list"
import { mockAnalysisResults } from "@/lib/mock-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function AnalysisResults() {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("summary")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(true)

  useEffect(() => {
    // 分析の進行状況をシミュレート
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setResults(mockAnalysisResults)
          return 100
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (isAnalyzing) {
    return (
      <div className="container py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>財務レポートを分析中</CardTitle>
            <CardDescription>
              不整合を検出するためにドキュメントを分析しています。しばらくお待ちください。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-muted-foreground">
              {progress < 30 && "テキストと表を抽出中..."}
              {progress >= 30 && progress < 60 && "財務データを分析中..."}
              {progress >= 60 && progress < 90 && "不整合をチェック中..."}
              {progress >= 90 && "結果を確定中..."}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">戻る</span>
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">分析結果</h2>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          レポートをエクスポート
        </Button>
      </div>

      <div className={`grid grid-cols-1 ${isFullscreen ? "" : "lg:grid-cols-4"} gap-6`}>
        {!isFullscreen && (
          <div className="lg:col-span-1">
            <Collapsible open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>サマリー</CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isSummaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CardDescription>分析結果の概要</CardDescription>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>総ページ数</span>
                      </div>
                      <span className="font-medium">{results?.totalPages || 12}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>正確な項目</span>
                      </div>
                      <span className="font-medium">{results?.correctItems || 42}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                        <span>検出された問題</span>
                      </div>
                      <span className="font-medium">{results?.issues?.length || 3}</span>
                    </div>
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">問題の種類別:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between">
                          <span>計算エラー</span>
                          <span className="font-medium">1</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>コメントの不整合</span>
                          <span className="font-medium">2</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>データの不一致</span>
                          <span className="font-medium">0</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        )}

        <div className={`${isFullscreen ? "col-span-1" : "lg:col-span-3"}`}>
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-2">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="summary">問題サマリー</TabsTrigger>
                <TabsTrigger value="document">ドキュメント表示</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
            <TabsContent value="summary" className="mt-2">
              <IssueList issues={results?.issues || []} onIssueClick={() => setActiveTab("document")} />
            </TabsContent>
            <TabsContent value="document" className="mt-2">
              <PdfViewer issues={results?.issues || []} isFullscreen={isFullscreen} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
