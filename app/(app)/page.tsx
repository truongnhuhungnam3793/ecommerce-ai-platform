import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories"
import { sanityFetch } from "@/sanity/lib/live"

export default async function Home() {
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
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
