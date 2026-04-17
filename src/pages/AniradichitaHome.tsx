import React, { useEffect, useState } from 'react';
import { useUIStore } from '../store/modalStore';
import { SERVICES, PORTFOLIO_WORKS, BLOG_POSTS, STATS, GALLERY_IMAGES } from '../data/aniradichita';

// Hero Section
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[520px] flex items-end pt-16 px-4 sm:px-8 pb-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          src="https://aniradichita.wordpress.com/wp-content/uploads/2024/10/20240712_193542-1.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-35 brightness-60"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 to-black/30 mix-blend-multiply bg-gradient-to-t from-black/95 to-transparent -z-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <div className="bg-red-600 text-white text-xs font-bold tracking-widest px-3 py-1 rounded inline-block mb-3.5">
          🏆 TOP 50 STARTUP · 3M-CII YOUNG INNOVATORS 2021
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-2.5">
          Where <span className="text-red-600">Art</span> Meets<br />
          Business
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 font-italic mb-3.5">
          "Hum Aap ke PAaaS Hai"
        </p>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-xl">
          India's first Performing Arts As A Service startup — blending drama, music, dance & film into marketing, CSR, training & education for all businesses.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-black px-6 py-2.5 rounded font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            ▶ Our Services
          </button>
          <button className="bg-gray-700/60 text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-gray-700/90 transition-colors">
            ℹ More Info
          </button>
          <button className="bg-red-600 text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-red-700 transition-colors">
            🎙️ Book Studio
          </button>
        </div>
      </div>
    </section>
  );
};

// News Ticker
const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<{ headline: string; source: string }[]>([
    { headline: 'Fetching latest performing arts news...', source: 'News' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    // Simulated news for demo
    const sampleNews = [
      { headline: 'Indian theatre companies report 40% growth in corporate partnerships', source: 'The Hindu' },
      { headline: 'CSR through performing arts gains momentum across Gujarat', source: 'TOI' },
      { headline: 'Experiential learning modules replace traditional training', source: 'ET' },
      { headline: 'Flash mob marketing trend rises across Indian cities', source: 'Mint' },
      { headline: '­OTT platforms invest in Indian regional content and theatre', source: 'Variety' },
      { headline: 'Performing arts therapy earns recognition in corporate wellness', source: 'HBR' },
    ];
    setNews([...sampleNews, ...sampleNews]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-950 border-t-2 border-red-600 flex items-stretch overflow-hidden">
      <div className="bg-red-600 text-white text-xs font-bold tracking-widest px-3 sm:px-4 py-2.5 flex items-center whitespace-nowrap flex-shrink-0">
        🔴 LIVE NEWS
      </div>
      <div className="overflow-hidden flex-1">
        <div className="flex gap-12 animate-scroll whitespace-nowrap py-2.5 px-4">
          {news.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-400 inline-flex">
              <span className="text-red-600">●</span>
              {item.headline}
              <span className="text-gray-600 text-xs ml-1">[{item.source}]</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={fetchNews}
        disabled={isLoading}
        className="bg-transparent border-l border-gray-800 text-gray-600 text-xs px-3 sm:px-4 hover:text-red-600 transition-colors flex-shrink-0"
      >
        ⟳
      </button>
    </div>
  );
};

// Stats Strip
const StatsStrip: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-700 mx-4 sm:mx-8 mt-9 rounded-lg overflow-hidden">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-gray-900 px-4 sm:px-6 py-6 sm:py-8 text-center">
          <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">{stat.value}</div>
          <div className="text-xs text-gray-600 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Service Cards
const ServiceCards: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-11">
      <div className="flex items-center gap-2.5 mb-4">
        <h2 className="text-base font-bold text-gray-300 uppercase">Our Services — PAaaS</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SERVICES.map((svc) => (
          <div
            key={svc.id}
            className="bg-gray-900/50 rounded-lg overflow-hidden cursor-pointer hover:scale-104 hover:shadow-xl hover:border-red-600 transition-all border border-transparent group"
          >
            <div
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ background: svc.color }}
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute text-4xl">{svc.icon}</div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {svc.tag}
              </div>
            </div>
            <div className="p-3.5">
              <h3 className="font-bold text-sm mb-1">{svc.title}</h3>
              <p className="text-xs text-gray-500 mb-2.5 leading-snug">{svc.description}</p>
              <button className="bg-transparent border border-red-600 text-red-600 text-xs font-bold px-2.5 py-1 rounded hover:bg-red-600 hover:text-white transition-colors">
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Gallery
const GallerySection: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 pb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <h2 className="text-base font-bold text-gray-300 uppercase">From Our Performances</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square rounded overflow-hidden cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          >
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

// Featured Works
const FeaturedWorks: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-11">
      <div className="flex items-center gap-2.5 mb-4">
        <h2 className="text-base font-bold text-gray-300 uppercase">Featured Works</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PORTFOLIO_WORKS.slice(0, 3).map((work) => (
          <div
            key={work.id}
            className="bg-gray-900/50 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-lg transition-all border border-transparent hover:border-gray-700"
          >
            <div
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ background: work.bgGradient }}
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute text-4xl">{work.icon}</div>
            </div>
            <div className="p-3.5">
              <p className="text-xs text-red-600 font-bold tracking-wide mb-1.5">{work.category}</p>
              <h3 className="font-bold text-sm mb-1">{work.title}</h3>
              <p className="text-xs text-gray-500">{work.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Blog Preview
const BlogPreview: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-11">
      <div className="flex items-center gap-2.5 mb-4">
        <h2 className="text-base font-bold text-gray-300 uppercase">From the Blog</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="bg-gray-900/50 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-3px] transition-transform">
            <div className="bg-gray-800 h-32 flex items-center justify-center text-3xl">
              {post.icon}
            </div>
            <div className="p-3">
              <p className="text-xs text-red-600 font-bold tracking-wide mb-1">{post.category}</p>
              <h3 className="font-bold text-xs mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Hero />
      <NewsTicker />
      <StatsStrip />
      <ServiceCards />
      <GallerySection />
      <FeaturedWorks />
      <BlogPreview />
    </div>
  );
};
