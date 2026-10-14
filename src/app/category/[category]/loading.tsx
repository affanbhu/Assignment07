
export default function CategoryLoading() {
  return (
    <main
      className="min-h-screen bg-[#f3f7f3] text-[#1d251e]"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-56 rounded bg-[#e2eae2]" />
          <div className="mt-3 h-4 w-40 rounded bg-[#e8eee8]" />
        </div>

        <p className="mb-4 text-sm text-[#6f776f]">
          পণ্য লোড হচ্ছে...
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="min-h-[120px] animate-pulse rounded-xl border border-[#e2e8e3] bg-white p-3"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-[#e8eee8]" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-3/4 rounded bg-[#e8eee8]" />
                  <div className="h-3 w-1/2 rounded bg-[#eef1ee]" />
                </div>
              </div>

              <div className="mt-5 h-4 w-24 rounded bg-[#e8eee8]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
