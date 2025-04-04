import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FashionPredictionForm } from "@/components/fashion-prediction-form"
import { FashionItemsList } from "@/components/fashion-items-list"
import { DataUpload } from "@/components/data-upload"
import { ModelRetraining } from "@/components/model-retraining"
import { ModelMetrics } from "@/components/model-metrics"
import { Header } from "@/components/header"

import { DashboardClient } from '../dashboard-client';



export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="predict" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="predict">Predict</TabsTrigger>
            <TabsTrigger value="items">Fashion Items</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="retrain">Retrain Model</TabsTrigger>
            <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="predict" className="mt-6">
            <FashionPredictionForm />
          </TabsContent>
          <TabsContent value="items" className="mt-6">
            <FashionItemsList />
          </TabsContent>
          <TabsContent value="upload" className="mt-6">
            <DataUpload />
          </TabsContent>
          <TabsContent value="retrain" className="mt-6">
            <ModelRetraining />
          </TabsContent>
          <TabsContent value="metrics" className="mt-6">
            <ModelMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

