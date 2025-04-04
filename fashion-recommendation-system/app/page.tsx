import { Header } from "@/components/header";
import ClientOnly from "@/components/client-only";
import { DashboardContent } from "./dashboard-content";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <ClientOnly>
          <DashboardContent />
        </ClientOnly>
      </div>
    </main>
  );
}

// Dynamically import client components
// const FashionPredictionForm = dynamic(() => import("@/components/fashion-prediction-form").then(mod => ({ default: mod.FashionPredictionForm })), { ssr: false });
// const FashionItemsList = dynamic(() => import("@/components/fashion-items-list").then(mod => ({ default: mod.FashionItemsList })), { ssr: false });
// const DataUpload = dynamic(() => import("@/components/data-upload").then(mod => ({ default: mod.DataUpload })), { ssr: false });
// const ModelRetraining = dynamic(() => import("@/components/model-retraining").then(mod => ({ default: mod.ModelRetraining })), { ssr: false });
// const ModelMetrics = dynamic(() => import("@/components/model-metrics").then(mod => ({ default: mod.ModelMetrics })), { ssr: false });

// export default function Dashboard() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <Header />
//       <div className="container mx-auto py-8 px-4">
//         <ClientOnly>
//           <Tabs defaultValue="predict" className="w-full">
//             <TabsList className="grid w-full grid-cols-5">
//               <TabsTrigger value="predict">Predict</TabsTrigger>
//               <TabsTrigger value="items">Fashion Items</TabsTrigger>
//               <TabsTrigger value="upload">Upload Data</TabsTrigger>
//               <TabsTrigger value="retrain">Retrain Model</TabsTrigger>
//               <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
//             </TabsList>
//             <TabsContent value="predict" className="mt-6">
//               <FashionPredictionForm />
//             </TabsContent>
//             <TabsContent value="items" className="mt-6">
//               <FashionItemsList />
//             </TabsContent>
//             <TabsContent value="upload" className="mt-6">
//               <DataUpload />
//             </TabsContent>
//             <TabsContent value="retrain" className="mt-6">
//               <ModelRetraining />
//             </TabsContent>
//             <TabsContent value="metrics" className="mt-6">
//               <ModelMetrics />
//             </TabsContent>
//           </Tabs>
//         </ClientOnly>
//       </div>
//     </main>
//   );
// }