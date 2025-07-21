import { Link } from 'wouter';
import { useInView } from '@/hooks/useInView';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Button } from '@/components/ui/button';

function HeroSection() {
  const { ref, isInView } = useInView();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground particleCount={30} />
      
      <div ref={ref} className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className={`font-display font-bold text-5xl md:text-7xl mb-6 fade-in ${isInView ? 'visible' : ''}`}>
          Zakir Khan
          <span className="block gradient-text">Sakht Launda Official</span>
        </h1>
        <p className={`text-xl md:text-2xl mb-8 opacity-90 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          Comedy, Merchandise & Live Shows
        </p>
        <div className={`space-x-4 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.4s' }}>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
              Shop Merch
            </Button>
          </Link>
          <Link href="/shows">
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
              Book Shows
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const { ref, isInView } = useInView();

  const features = [
    {
      icon: "👕",
      title: "Premium Merch",
      description: "High-quality apparel and accessories designed with Zakir's signature style."
    },
    {
      icon: "🎤",
      title: "Live Shows",
      description: "Experience Zakir's comedy live across India's major cities."
    },
    {
      icon: "❤️",
      title: "Community",
      description: "Join the Sakht Launda community and connect with fellow comedy lovers."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-secondary">
            Why Choose <span className="gradient-text">Sakht Launda</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From premium merchandise to unforgettable live shows, experience the best of Zakir Khan's comedy universe.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`text-center p-8 hover-tilt transition-all duration-300 fade-in ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="font-display font-semibold text-2xl mb-4 text-secondary">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
