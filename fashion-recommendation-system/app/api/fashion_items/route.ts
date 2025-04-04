import { NextResponse } from "next/server"

// Mock data for fashion items
const mockFashionItems = [
  {
    _id: "1",
    gender: "Men",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "T-shirts",
    baseColour: "Blue",
    season: "Summer",
    year: 2023,
    usage: "Casual",
  },
  {
    _id: "2",
    gender: "Women",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Shirts",
    baseColour: "White",
    season: "Spring",
    year: 2023,
    usage: "Formal",
  },
  {
    _id: "3",
    gender: "Men",
    masterCategory: "Footwear",
    subCategory: "Shoes",
    articleType: "Sports Shoes",
    baseColour: "Black",
    season: "Fall",
    year: 2022,
    usage: "Sports",
  },
  {
    _id: "4",
    gender: "Women",
    masterCategory: "Accessories",
    subCategory: "Bags",
    articleType: "Handbags",
    baseColour: "Pink",
    season: "Summer",
    year: 2023,
    usage: "Party",
  },
  {
    _id: "5",
    gender: "Unisex",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Sweatshirts",
    baseColour: "Grey",
    season: "Winter",
    year: 2022,
    usage: "Casual",
  },
  {
    _id: "6",
    gender: "Men",
    masterCategory: "Apparel",
    subCategory: "Bottomwear",
    articleType: "Jeans",
    baseColour: "Blue",
    season: "Fall",
    year: 2023,
    usage: "Casual",
  },
  {
    _id: "7",
    gender: "Women",
    masterCategory: "Apparel",
    subCategory: "Ethnic",
    articleType: "Kurtas",
    baseColour: "Red",
    season: "Spring",
    year: 2023,
    usage: "Ethnic",
  },
  {
    _id: "8",
    gender: "Men",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Formal Shirts",
    baseColour: "White",
    season: "Summer",
    year: 2023,
    usage: "Formal",
  },
  {
    _id: "9",
    gender: "Women",
    masterCategory: "Footwear",
    subCategory: "Shoes",
    articleType: "Casual Shoes",
    baseColour: "Brown",
    season: "Fall",
    year: 2022,
    usage: "Smart Casual",
  },
  {
    _id: "10",
    gender: "Unisex",
    masterCategory: "Accessories",
    subCategory: "Watches",
    articleType: "Smart Watches",
    baseColour: "Black",
    season: "Winter",
    year: 2023,
    usage: "Sports",
  },
  {
    _id: "11",
    gender: "Men",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Polo Shirts",
    baseColour: "Green",
    season: "Summer",
    year: 2023,
    usage: "Smart Casual",
  },
  {
    _id: "12",
    gender: "Women",
    masterCategory: "Apparel",
    subCategory: "Topwear",
    articleType: "Blouses",
    baseColour: "Yellow",
    season: "Spring",
    year: 2023,
    usage: "Formal",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const gender = searchParams.get("gender")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter by gender if provided
    let filteredItems = mockFashionItems
    if (gender) {
      filteredItems = mockFashionItems.filter((item) => item.gender === gender)
    }

    // Apply limit
    const limitedItems = filteredItems.slice(0, limit)

    // Simulate a delay to mimic database query
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ items: limitedItems })
  } catch (error) {
    console.error("Error fetching fashion items:", error)
    return NextResponse.json({ error: "Failed to fetch fashion items" }, { status: 500 })
  }
}

