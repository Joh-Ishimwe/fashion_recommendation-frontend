"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, BarChart3 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ModelMetrics {
  current_version: string
  classification_report: {
    [key: string]: {
      precision: number
      recall: number
      f1_score: number
      support: number
    } | number
  }
}

export function ModelMetrics() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://fashion-recommendation-rls8.onrender.com/metrics/")
      if (!response.ok) {
        throw new Error("Failed to fetch model metrics")
      }
      const data = await response.json()
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(2) + "%"
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Model Performance Metrics</CardTitle>
          <CardDescription>View the current model's performance metrics and classification report</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchMetrics} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : metrics ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Model Version</p>
                  <p className="font-medium">{metrics.current_version}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Classification Report</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Precision</TableHead>
                      <TableHead>Recall</TableHead>
                      <TableHead>F1 Score</TableHead>
                      <TableHead>Support</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(metrics.classification_report)
                      .filter(([key]) => !["accuracy", "macro avg", "weighted avg"].includes(key))
                      .map(([className, values]) => (
                        <TableRow key={className}>
                          <TableCell className="font-medium">{className}</TableCell>
                          <TableCell>{typeof values === 'object' ? formatPercentage(values.precision) : 'N/A'}</TableCell>
                          <TableCell>{typeof values === 'object' ? formatPercentage(values.recall) : 'N/A'}</TableCell>
                          <TableCell>{typeof values === 'object' ? formatPercentage(values.f1_score) : 'N/A'}</TableCell>
                          <TableCell>{typeof values === 'object' ? values.support : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    {metrics.classification_report["accuracy"] && (
                      <TableRow className="bg-gray-50 dark:bg-gray-800 font-medium">
                        <TableCell>Accuracy</TableCell>
                        <TableCell colSpan={3}>
                          {formatPercentage(
                            typeof metrics.classification_report["accuracy"] === "number" 
                              ? metrics.classification_report["accuracy"]
                              : 0
                          )}
                        </TableCell>
                        <TableCell>
                          {typeof metrics.classification_report["weighted avg"] === 'object' 
                            ? metrics.classification_report["weighted avg"].support 
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    )}
                    {typeof metrics.classification_report["macro avg"] === 'object' && (
                      <TableRow>
                        <TableCell className="font-medium">Macro Avg</TableCell>
                        <TableCell>{formatPercentage(metrics.classification_report["macro avg"].precision)}</TableCell>
                        <TableCell>{formatPercentage(metrics.classification_report["macro avg"].recall)}</TableCell>
                        <TableCell>{formatPercentage(metrics.classification_report["macro avg"].f1_score)}</TableCell>
                        <TableCell>{metrics.classification_report["macro avg"].support}</TableCell>
                      </TableRow>
                    )}
                    {typeof metrics.classification_report["weighted avg"] === 'object' && (
                      <TableRow>
                        <TableCell className="font-medium">Weighted Avg</TableCell>
                        <TableCell>
                          {formatPercentage(metrics.classification_report["weighted avg"].precision)}
                        </TableCell>
                        <TableCell>{formatPercentage(metrics.classification_report["weighted avg"].recall)}</TableCell>
                        <TableCell>
                          {formatPercentage(metrics.classification_report["weighted avg"].f1_score)}
                        </TableCell>
                        <TableCell>{metrics.classification_report["weighted avg"].support}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No metrics available</div>
        )}
      </CardContent>
    </Card>
  )
}

// Fixed export
export default ModelMetrics