import { NextResponse } from "next/server"

// Mock metrics data
const mockMetrics = {
  current_version: "1.2.3",
  classification_report: {
    Casual: {
      precision: 0.92,
      recall: 0.89,
      f1_score: 0.9,
      support: 250,
    },
    Formal: {
      precision: 0.88,
      recall: 0.91,
      f1_score: 0.89,
      support: 180,
    },
    Sports: {
      precision: 0.95,
      recall: 0.93,
      f1_score: 0.94,
      support: 150,
    },
    Ethnic: {
      precision: 0.87,
      recall: 0.82,
      f1_score: 0.84,
      support: 100,
    },
    Party: {
      precision: 0.83,
      recall: 0.8,
      f1_score: 0.81,
      support: 120,
    },
    "Smart Casual": {
      precision: 0.79,
      recall: 0.76,
      f1_score: 0.77,
      support: 130,
    },
    Travel: {
      precision: 0.85,
      recall: 0.82,
      f1_score: 0.83,
      support: 90,
    },
    Home: {
      precision: 0.91,
      recall: 0.88,
      f1_score: 0.89,
      support: 80,
    },
    accuracy: 0.87,
    "macro avg": {
      precision: 0.88,
      recall: 0.85,
      f1_score: 0.86,
      support: 1100,
    },
    "weighted avg": {
      precision: 0.88,
      recall: 0.87,
      f1_score: 0.87,
      support: 1100,
    },
  },
}

export async function GET() {
  try {
    // Simulate a delay to mimic database query
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockMetrics)
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json({ error: "Failed to fetch model metrics" }, { status: 500 })
  }
}

