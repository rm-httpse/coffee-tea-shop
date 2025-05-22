'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const HeroSection = () => {

  const router = useRouter();

  const slides = [
    {
      image: '/images/main1.webp',
      text: 'This is how you enjoy the day',
      heading: 'Awaken Your Senses with Every Sip',
      description:
        'A perfect harmony of rich flavors and aromatic blends. Discover hand-selected coffee and tea crafted for every moment of your day. Smooth, bold, and always fresh.',
    },
    {
      image: '/images/main2.jpg',
      text: 'Taste the Best of Nature',
      heading: 'Savor the Perfect Brew',
      description:
        'Experience the natural flavors of premium blends. Our coffees and teas are handpicked for their exquisite taste and aroma, making every cup an indulgence.',
    },
    {
      image: '/images/main3.jpg',
      text: 'A Moment of Pure Bliss',
      heading: 'Relax and Unwind with Every Sip',
      description:
        'Delight in our rich, smooth, and flavorful brews. Whether you need energy or relaxation, our selection of coffees and teas are the perfect companion.',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-transition every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleNavigate = () => {
    router.push("/products");
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center opacity-85">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-10 lg:px-20 text-white z-20">
        <p className="text-lg md:text-xl">{slides[currentSlide].text}</p>
        <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight mt-4 max-w-lg">
          {slides[currentSlide].heading}
        </h3>
        <p className="mt-4 text-lg md:text-xl max-w-lg">
          {slides[currentSlide].description}
        </p>

        <div className="mt-6">
          <button
            onClick={handleNavigate}
            className="border border-white text-white px-6 py-3 text-lg flex items-center hover:bg-white hover:text-black transition"
          >
            Discover More <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>

  );
};

export default HeroSection;
