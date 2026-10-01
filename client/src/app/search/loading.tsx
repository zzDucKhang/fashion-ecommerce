export default function Loading() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8">
      <div className="h-12 w-full animate-pulse rounded-xl bg-white" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[.88] animate-pulse rounded-xl bg-[#e9e5dc]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white" />
          </div>
        ))}
      </div>
    </main>
  );
}
