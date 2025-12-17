import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories"
import {
  AI_SEARCH_PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/lib/sanity/queries/products"
import { sanityFetch } from "@/sanity/lib/live"

interface PageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    color?: string
    material?: string
    minPrice?: number
    maxPrice?: number
    sort?: string
    inStock?: string
  }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams

  const searchQuery = params.q ?? ""
  const categorySlug = params.category ?? ""
  const color = params.color ?? ""
  const material = params.material ?? ""
  const minPrice = Number(params.minPrice) || 0
  const maxPrice = Number(params.maxPrice) || 0
  const sort = params.sort ?? "name"
  const inStock = params.inStock === "true"

  // Select query based on sort parameter
  const getQuery = () => {
    // If searching and sort is relevance, use relevance query
    if (searchQuery && sort === "relevance") {
      return AI_SEARCH_PRODUCTS_QUERY
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY
    }
  }

  // Fetch products with filters (server-side via GROQ)
  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  })

  // Fetch categories for filter sidebar
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  })

  // Fetch featured products for homepage carousel
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  })

  return (
    <div>
      {/* Featured Products Carousel */}

      {/* Page Banner */}

      {/* Category Titles */}

      {/* Products Section */}
    </div>
  )
}
