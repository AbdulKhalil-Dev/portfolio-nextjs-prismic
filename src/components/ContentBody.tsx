import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { components } from "@/slices";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date),
      );
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article" className="[&>div]:max-w-4xl">
      {/* Mobile par padding px-4 aur py-8 ki hai, desktop (md) par wapis pehle wali ho jayegi */}
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-8 sm:px-6 md:px-16 md:py-20">
        
        {/* Responsive Heading: Mobile par text-2xl/text-3xl aur desktop par large ho jayegi */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl md:text-4xl lg:text-5xl mb-4">
          {page.data.title}
        </h1>

        <div className="flex gap-4 text-orange-400 text-xl font-bold">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}