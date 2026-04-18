"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaHeart, FaComment } from "react-icons/fa";

const mockPosts = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=600",
    caption: "Another aggressive widebody fully dialed in today. Matte black everything. 🦇 #glowtech #widebody #custom",
    likes: 842,
    comments: 45
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600",
    caption: "That electric blue chrome finish hits different under the neon lights. ⚡️💠 #wrap #chrome #perfection",
    likes: 1205,
    comments: 89
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=600",
    caption: "Engine bay aesthetics matching the performance numbers. Pure titanium exhaust system installed. 🐎💨",
    likes: 934,
    comments: 31
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600",
    caption: "Carbon fiber steering wheel and custom red leather refit for this absolutely beastly interior. 🏎️🔥",
    likes: 1540,
    comments: 112
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600",
    caption: "Dropping the stance just a few inches changes the entire aggressive profile. Coilovers dialed. 📐📉",
    likes: 765,
    comments: 24
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600",
    caption: "Spotless reflection after our signature 3-stage paint correction and ceramic coating. 💎✨",
    likes: 2130,
    comments: 145
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-glow-black-800 border-b border-glow-black-700">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-medium font-heading uppercase tracking-[-0.04em] text-white mb-2 flex items-center justify-center md:justify-start gap-4"
            >
              <FaInstagram className="text-glow-purple" />
              <span>@GLOW<span className="text-glow-blue">TECH</span></span>
            </motion.h2>
            <p className="text-gray-400">Join our community and see our latest projects.</p>
          </div>
          
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            href="https://instagram.com/glowtech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-glow-purple text-white font-medium px-8 py-4 rounded-md shadow-[0_0_20px_rgba(29,58,73,0.35)] hover:bg-[#24485a] hover:shadow-[0_0_30px_rgba(29,58,73,0.45)] hover:scale-105 transition-all duration-300"
          >
            <FaInstagram className="text-xl" />
            <span>Follow Us</span>
          </motion.a>
        </div>

        {/* Note: This grid simulates a third-party widget layout (like Flockler or Elfsight) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
          {mockPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square group overflow-hidden bg-glow-black-900 md:rounded-lg cursor-pointer"
            >
              <Image
                src={post.imageUrl}
                alt="Instagram Post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                <div className="flex items-center space-x-6 mb-4 text-white font-bold text-lg">
                  <span className="flex items-center gap-2"><FaHeart className="text-glow-purple"/> {post.likes}</span>
                  <span className="flex items-center gap-2"><FaComment className="text-glow-blue"/> {post.comments}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-3 hidden md:block">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* If using Elfsight or Flockler, you would replace the grid above with: */}
        {/* <div className="elfsight-app-[YOUR-ID]"></div> */}

      </div>
    </section>
  );
}