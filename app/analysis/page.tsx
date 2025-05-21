import { AnalysisResults } from "@/components/analysis-results"

export default function AnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">財務レポート分析ツール</h1>
        </div>
      </header>
      <main className="flex-1">
        <AnalysisResults />
      </main>
    </div>
  )
}
