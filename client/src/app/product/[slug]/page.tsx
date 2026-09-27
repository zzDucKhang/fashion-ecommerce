import { notFound } from "next/navigation";
import { ProductDetail } from "@/modules/catalog/components/product-detail";
import { getProduct, products } from "@/modules/catalog/data";
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = products.find((item) => item.slug === slug); if (!product) notFound(); return <ProductDetail product={getProduct(slug)} />; }
