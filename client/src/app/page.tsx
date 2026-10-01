import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, Star } from 'lucide-react';
import { categories, products } from '@/modules/catalog/mock';
import { ProductCard } from '@/modules/catalog/components/product-card';

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 sm:px-8 lg:px-12">
        <div className="relative min-h-[500px] overflow-hidden rounded-2xl bg-[#1D1F20] px-7 py-10 text-white sm:px-12 sm:py-16 lg:px-20">
          <div className="absolute -right-10 top-0 h-full w-3/5 bg-[radial-gradient(circle_at_70%_35%,rgba(132,234,83,.5),transparent_34%),linear-gradient(120deg,transparent_10%,rgba(255,255,255,.05)_90%)] opacity-90" />
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.23em] text-[#84EA53]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#84EA53]" /> The new
              essentials
            </p>
            <h1 className="font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl">
              Objects with a point of view.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Thoughtful fashion and everyday pieces, chosen for the way they
              make a room, an outfit, or a day feel.
            </p>
            <Link
              href="/search"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#84EA53] px-6 py-3.5 text-sm font-bold text-[#1D1F20] transition-transform hover:-translate-y-0.5"
            >
              Shop new arrivals <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="absolute bottom-8 right-8 hidden max-w-[190px] border-l border-white/20 pl-5 text-xs leading-5 text-white/55 lg:block">
            <Star size={15} fill="#84EA53" color="#84EA53" className="mb-3" />
            Curated goods for a considered life.
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Browse the edit</p>
            <h2 className="section-title mt-2">Shop by feeling</h2>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-semibold sm:flex"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={`/search?category=${category.name}`}
              className="group relative min-h-[220px] overflow-hidden rounded-xl bg-white sm:min-h-[300px]"
            >
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-display text-3xl">{category.name}</p>
                <p className="mt-1 text-xs text-white/70">
                  {category.count} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="eyebrow">Picked for you</p>
            <h2 className="section-title mt-2">The good stuff</h2>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-semibold"
          >
            Explore edit <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
