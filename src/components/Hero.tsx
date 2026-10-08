import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#f3f7f4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative overflow-hidden rounded-2xl border border-[#e1e8e3] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

          {/* Left Content */}
          <div className="relative z-10 max-w-[650px]">

            {/* Date */}
            <div className="mb-4 inline-flex rounded-full bg-[#e7f6ed] px-4 py-2 text-sm font-medium text-[#16834b]">
              বৃহস্পতিবার, ৬ আগস্ট, ২০২৬
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold leading-tight text-[#202722] sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[620px] text-sm leading-7 text-[#66716a] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম -
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex rounded-lg bg-[#009b4d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008542] active:scale-95"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Right Side Image */}
          <div className="mt-8 flex justify-center lg:absolute lg:right-10 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              width={300}
              height={220}
              className="h-auto w-[220px] object-contain sm:w-[260px] lg:w-[300px]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}