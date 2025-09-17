"use client";
import { motion } from "framer-motion";
import { Info, Rocket, Code2 } from "lucide-react";

export default function About() {
  return (
    <section className="min-h-screen text-white px-4 sm:px-6 py-12 sm:py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8 sm:space-y-10">
        {/* Heading */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center"
        >
          About My Website
        </motion.h1>

        {/* Description with Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Info className="text-teal-400 mt-1" size={24} />
            <p className="text-base sm:text-lg">
              Welcome to <span className="text-teal-400 font-semibold">Get Me a Chai</span> — a fun and interactive
              platform where people can support developers and creators by sending small contributions (₹5, ₹10, ₹50).
              Think of it as a &quot;thank you&quot; or a virtual chai ☕!
            </p>
          </div>

          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Rocket className="text-purple-400 mt-1" size={24} />
            <p className="text-base sm:text-lg">
              Built using modern technologies like <span className="font-semibold">Next.js, Tailwind CSS</span>, and
              integrated with <span className="font-semibold">Razorpay</span> for secure payments.
            </p>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <Code2 className="text-blue-400 mt-1" size={24} />
            <p className="text-base sm:text-lg">
              Whether you&apos;re a fan, a friend, or just someone who likes what I build — your support is truly
              appreciated ❤️.
            </p>
          </div>
        </motion.div>

        {/* Animated Coins Section */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-6 pt-8 sm:pt-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {[1, 2, 3].map((coin, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: index * 0.2,
              }}
              className="w-14 h-14 sm:w-20 sm:h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl shadow-lg"
            >
              ₹
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
