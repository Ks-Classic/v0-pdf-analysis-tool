"use client"

import { AlertTriangle, Calculator, MessageSquare } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Issue {
  id: string
  type: "calculation" | "comment" | "data"
  page: number
  title: string
  description: string
  severity: "high" | "medium" | "low"
}

interface IssueListProps {
  issues: Issue[]
  onIssueClick: (issue: Issue) => void
}

export function IssueList({ issues, onIssueClick }: IssueListProps) {
  const getIssueIcon = (type: string) => {
    switch (type) {
      case "calculation":
        return <Calculator className="h-5 w-5" />
      case "comment":
        return <MessageSquare className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return severity
    }
  }

  if (issues.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p>ドキュメント内に問題は見つかりませんでした。</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIssueIcon(issue.type)}
                <CardTitle className="text-lg">{issue.title}</CardTitle>
              </div>
              <Badge className={getSeverityColor(issue.severity)}>{getSeverityText(issue.severity)}</Badge>
            </div>
            <CardDescription>ページ {issue.page}</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="mb-4 text-sm">{issue.description}</p>
            <Button variant="outline" size="sm" onClick={() => onIssueClick(issue)}>
              ドキュメントで表示
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
