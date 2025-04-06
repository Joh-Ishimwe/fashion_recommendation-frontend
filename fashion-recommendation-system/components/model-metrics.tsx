"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, BarChart3, Calendar, Users, Percent } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ClassificationMetric {
  precision: number
  recall: number
  "f1-score": number
  support: number
}

interface ModelMetrics {
  current_version: number
  classification_report: {
    [key: string]: ClassificationMetric | number
  }
  accuracy: number
  f1_score: number
  precision: number
  recall: number
  confusion_matrix: number[][]
  training_samples: number
  test_samples: number
  timestamp: string
}

export function ModelMetrics() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://fashion-recommendation-og63.onrender.com/metrics/")
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Get class names for confusion matrix
  const getClassNames = () => {
    if (!metrics) return []
    return Object.keys(metrics.classification_report).filter(
      key => !["accuracy", "macro avg", "weighted avg"].includes(key)
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Model Performance Metrics</CardTitle>
          <CardDescription>View the current models performance metrics and classification report</CardDescription>
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
            {/* Model Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Model Version</p>
                    <p className="font-medium">{metrics.current_version}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Percent className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                    <p className="font-medium">{formatPercentage(metrics.accuracy)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Samples</p>
                    <p className="font-medium">{metrics.training_samples} training / {metrics.test_samples} test</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium">{formatDate(metrics.timestamp)}</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="classification">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="classification">Classification Report</TabsTrigger>
                <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
              </TabsList>
              
              <TabsContent value="classification" className="mt-4">
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
                            <TableCell>{typeof values === 'object' ? formatPercentage(values["f1-score"]) : 'N/A'}</TableCell>
                            <TableCell>{typeof values === 'object' ? values.support : 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      <TableRow className="bg-gray-50 dark:bg-gray-800 font-medium">
                        <TableCell>Accuracy</TableCell>
                        <TableCell colSpan={3}>
                          {formatPercentage(metrics.accuracy)}
                        </TableCell>
                        <TableCell>
                          {metrics.test_samples}
                        </TableCell>
                      </TableRow>
                      {typeof metrics.classification_report["macro avg"] === 'object' && (
                        <TableRow>
                          <TableCell className="font-medium">Macro Avg</TableCell>
                          <TableCell>{formatPercentage(metrics.classification_report["macro avg"].precision)}</TableCell>
                          <TableCell>{formatPercentage(metrics.classification_report["macro avg"].recall)}</TableCell>
                          <TableCell>{formatPercentage(metrics.classification_report["macro avg"]["f1-score"])}</TableCell>
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
                            {formatPercentage(metrics.classification_report["weighted avg"]["f1-score"])}
                          </TableCell>
                          <TableCell>{metrics.classification_report["weighted avg"].support}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="confusion" className="mt-4">
                <div className="overflow-x-auto">
                  <h3 className="text-lg font-medium mb-4">Confusion Matrix</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    The confusion matrix shows predicted labels (columns) vs. actual labels (rows)
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Actual ↓ Predicted →</TableHead>
                        {getClassNames().map(className => (
                          <TableHead key={className}>{className}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metrics.confusion_matrix.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell className="font-medium">{getClassNames()[rowIndex]}</TableCell>
                          {row.map((cell, cellIndex) => (
                            <TableCell 
                              key={cellIndex}
                              className={rowIndex === cellIndex ? "bg-green-50 dark:bg-green-900 font-bold" : ""}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Overall Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Precision</p>
                      <p className="text-xl font-bold">{formatPercentage(metrics.precision)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Recall</p>
                      <p className="text-xl font-bold">{formatPercentage(metrics.recall)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">F1 Score</p>
                      <p className="text-xl font-bold">{formatPercentage(metrics.f1_score)}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No metrics available</div>
        )}
      </CardContent>
    </Card>
  )
}

export default { ModelMetrics }