import { useEffect, useRef } from "react";
import partners from "@/content/partners.json";
import Link from "next/link";

const PartnersElement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const originalContent = container.innerHTML;
    container.innerHTML += originalContent;

    const totalWidth = container.scrollWidth / 2;
    let scrollAmount = 0;
    const stepSize = 0.3;

    const scrollStep = () => {
      scrollAmount += stepSize;
      container.scrollLeft = scrollAmount;

      if (scrollAmount >= totalWidth) {
        container.scrollLeft = scrollAmount - totalWidth;
        scrollAmount = container.scrollLeft;
      }

      requestAnimationFrame(scrollStep);
    };

    scrollStep();
  }, []);

  return (
    <div className='bg-sectionbg p-20 mb-12 overflow-hidden relative'>
      <div
        ref={containerRef}
        className='flex gap-28 items-center justify-start'
        style={{
          overflowX: "hidden",
          display: "flex",
          whiteSpace: "nowrap",
          maskImage: "linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)"
        }}
      >
        {partners.map((el, index) => (
          <Link
            key={index}
            href={el.href}
            className='select-none outline-none h-40 min-w-36 grayscale hover:grayscale-0 transition-all duration-300'
          >
            <img src={el.src} alt={el.alt} className='h-40 object-contain' />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PartnersElement;
