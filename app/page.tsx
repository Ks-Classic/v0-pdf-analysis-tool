import { Upload } from "@/components/upload"
import { DemoButton } from "@/components/demo-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">財務レポート分析ツール</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-center gap-2">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              財務レポートの不整合を自動分析
            </h2>
            <p className="max-w-[700px] text-center text-muted-foreground">
              財務レポートのPDFをアップロードして、計算ミス、表の不整合、コメントとデータの齟齬を自動的に検出します。
            </p>
          </div>
          <div className="grid w-full max-w-4xl gap-6 mx-auto">
            <Upload />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">または</p>
              <DemoButton />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
