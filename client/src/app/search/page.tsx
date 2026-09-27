import { SearchShell } from "@/modules/catalog/components/search-shell";
import { products } from "@/modules/catalog/data";
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) { const { category } = await searchParams; const filtered = category ? products.filter((product) => product.category === category) : products; return <main><SearchShell products={filtered} category={category} /></main>; }
