"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight } from "react-icons/fi";

const categories = ["All", "Body Kits", "Accessories", "Performance Parts"];

type Part = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  description: string;
  price_visible: string;
  enquiry_link?: string;
};

export default function PartsCatalogue() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchParts() {
      try {
        const res = await fetch("/api/parts");
        const json = await res.json();
        if (json.data) {
          setParts(json.data);
        }
      } catch (error) {
        console.error("Failed to load catalogue:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchParts();
  }, []);

  const filteredParts = parts.filter((part) => {
    const matchesCategory = filter === "All" || part.category === filter;
    const matchesSearch = part.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="parts" className="py-24 bg-glow-black-900 border-b border-glow-black-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium font-heading uppercase tracking-[-0.04em] text-white mb-6"
          >
            Performance <span className="text-glow-blue">Parts</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Browse our catalogue of high-end accessories and tuning components directly imported for you.
          </p>
        </div>

        {/* Controls (Search & Filter) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 border border-glow-black-700 ${
                  filter === cat
                    ? "bg-[#1d3a49] text-white border-[#1d3a49] shadow-[0_0_15px_rgba(29,58,73,0.35)]"
                    : "bg-glow-black-800 text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search parts by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-glow-black-800 border border-glow-black-700 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-glow-blue focus:ring-1 focus:ring-glow-blue transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-glow-blue"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredParts.length > 0 ? (
                filteredParts.map((part) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={part.id}
                    className="bg-glow-black-800 rounded-xl overflow-hidden border border-glow-black-700 group hover:border-glow-blue/50 flex flex-col transition-colors"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-glow-black-900 border-b border-glow-black-700">
                      <Image
                        src={part.image_url}
                        alt={part.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur text-glow-blue text-xs font-bold px-3 py-1 rounded border border-glow-blue/20 uppercase tracking-widest">
                        {part.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-medium font-heading text-white mb-2 leading-tight tracking-[-0.02em]">
                        {part.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-6 flex-grow">
                        {part.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-glow-chrome font-medium font-heading text-lg tracking-[-0.02em]">
                          {part.price_visible}
                        </span>
                        <a
                          href={part.enquiry_link || "#contact"}
                          className="flex items-center gap-2 text-glow-blue text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors"
                        >
                          Enquire <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 text-lg">No parts found matching your criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}