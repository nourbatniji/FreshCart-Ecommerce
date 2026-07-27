import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import image1 from "../../assets/images/slider-image-1.jpeg";
import image2 from "../../assets/images/slider-image-2.jpeg";
import image3 from "../../assets/images/slider-image-3.jpeg";
import image4 from "../../assets/images/slider-2.jpeg";
import promo1 from "../../assets/images/grocery-banner.png";
import promo2 from "../../assets/images/grocery-banner-2.jpeg";

const slides = [
  {
    image: image1,
    eyebrow: "Fresh & Organic",
    title: "Groceries delivered to your door, today",
    subtitle: "Hand-picked fruits, vegetables & pantry staples at prices you'll love.",
  },
  {
    image: image4,
    eyebrow: "Limited Time",
    title: "Save big on your weekly essentials",
    subtitle: "New deals every week across every category in the store.",
  },
  {
    image: image2,
    eyebrow: "Just Landed",
    title: "Discover this season's freshest picks",
    subtitle: "Sourced from trusted local farms and top-tier brands.",
  },
  {
    image: image3,
    eyebrow: "Fast Delivery",
    title: "From cart to doorstep in record time",
    subtitle: "Track your order in real time, every step of the way.",
  },
];

export default function MainSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const active = slides[index];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Main hero carousel */}
      <div
        className="lg:col-span-8 relative h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60 group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={active.image}
            alt={active.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-emerald-300 text-xs font-extrabold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                {active.eyebrow}
              </span>
              <h2 className="text-white text-2xl sm:text-4xl font-extrabold mt-4 max-w-lg leading-tight">
                {active.title}
              </h2>
              <p className="text-white/80 mt-2 max-w-md text-sm sm:text-base hidden sm:block">
                {active.subtitle}
              </p>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 mt-5 bg-active hover:bg-active/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-active/20 transition duration-200 text-sm"
              >
                Shop Now <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows (visible on hover, desktop) */}
        <button
          onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-200 cursor-pointer"
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-200 cursor-pointer"
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors duration-200 cursor-pointer"
              style={{ width: i === index ? 24 : 8 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === index && (
                <motion.span
                  layoutId="activeSlideDot"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Side promo stack */}
      <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
        <motion.div
          whileHover="hover"
          className="relative h-40 sm:h-[218px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60 bg-amber-50"
        >
          <motion.img
            src={promo1}
            alt="Fresh produce"
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-sm sm:text-base">Fresh Produce</p>
            <Link to="/categories" className="text-white/85 text-xs font-semibold hover:text-white transition">
              Shop now <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </Link>
          </div>
        </motion.div>

        <motion.div
          whileHover="hover"
          className="relative h-40 sm:h-[218px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60 bg-sky-50"
        >
          <motion.img
            src={promo2}
            alt="Snacks and treats"
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-sm sm:text-base">Snacks & Treats</p>
            <Link to="/product" className="text-white/85 text-xs font-semibold hover:text-white transition">
              Shop now <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
