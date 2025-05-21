export const mockAnalysisResults = {
  totalPages: 12,
  correctItems: 42,
  issues: [
    {
      id: "issue-1",
      type: "calculation",
      page: 2,
      title: "EBITDA計算エラー",
      description:
        "2ページのEBITDA値が正しく計算されていません。報告値は5,388千円ですが、計算式（営業利益＋減価償却費）に基づくと、5,388千円になるはずです。",
      severity: "high",
      highlights: [
        {
          x: 100,
          y: 350,
          width: 400,
          height: 30,
          color: "#ef4444",
        },
      ],
    },
    {
      id: "issue-2",
      type: "comment",
      page: 3,
      title: "コメントとデータの不整合",
      description:
        "コメントには「売上債権の回転期間は50日」と記載されていますが、財務データに基づいて計算された値は49日であり、これは通常の範囲内です。",
      severity: "low",
      highlights: [
        {
          x: 70,
          y: 150,
          width: 460,
          height: 60,
          color: "#3b82f6",
        },
      ],
    },
    {
      id: "issue-3",
      type: "comment",
      page: 5,
      title: "キャッシュフロー計算書の不一致",
      description:
        "コメントには「M&A仲介手数料の支払いにより営業CFは減少している」と記載されていますが、売上債権の増加も大きく影響しており、コメントに記載されていません。",
      severity: "medium",
      highlights: [
        {
          x: 70,
          y: 200,
          width: 460,
          height: 40,
          color: "#f59e0b",
        },
        {
          x: 200,
          y: 350,
          width: 200,
          height: 25,
          color: "#f59e0b",
        },
      ],
    },
  ],
}
