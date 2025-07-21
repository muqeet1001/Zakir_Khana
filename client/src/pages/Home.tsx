import { Link } from 'wouter';
import { useInView } from '@/hooks/useInView';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function HeroSection() {
  const { ref, isInView } = useInView();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-yellow-500/20 animate-gradient-float"></div>
      
      <ThreeBackground particleCount={30} />
      
      <div ref={ref} className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className={`font-display font-bold text-5xl md:text-7xl mb-6 fade-in typewriter ${isInView ? 'visible' : ''}`}>
          Zakir Khan
          <span className="block gradient-text glow-text">Sakht Launda Official</span>
        </h1>
        <p className={`text-xl md:text-2xl mb-8 opacity-90 fade-in bounce-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.8s' }}>
          Comedy, Merchandise & Live Shows
        </p>
        <div className={`space-x-4 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '1.2s' }}>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:glow">
              Shop Merch
            </Button>
          </Link>
          <Link href="/shows">
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              Book Shows
            </Button>
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '1.6s' }}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
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

function VideoIntroSection() {
  const { ref, isInView } = useInView();
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Parallax Background Element */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 transform -skew-y-2 scale-110"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-secondary dark:text-white">
            Meet the <span className="gradient-text">Sakht Launda</span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Get to know the man behind the laughs in this exclusive introduction
          </p>
        </div>
        
        <div className={`relative max-w-4xl mx-auto fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="aspect-video bg-gradient-to-br from-secondary to-primary rounded-2xl shadow-2xl overflow-hidden relative group cursor-pointer hover-lift">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-2">Watch Zakir's Introduction</h3>
                <p className="text-lg opacity-90">5:30 minutes of pure comedy gold</p>
              </div>
            </div>
            
            {/* Overlay gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BehindTheScenesSection() {
  const { ref, isInView } = useInView();
  
  const quotes = [
    {
      text: "Comedy hai bhai, life hai. Jitna serious loge, utna mushkil hoga.",
      context: "On finding humor in everyday life"
    },
    {
      text: "Main sakht launda hun, lekin dil se bohot soft hun. Bas pata nahi chalta.",
      context: "Behind the 'Sakht Launda' persona"
    },
    {
      text: "Stage pe jaane se pehle main hamesha nervous hota hun. Yeh normal hai!",
      context: "Pre-show rituals"
    },
    {
      text: "Audience ke saath connection banane mein time lagta hai, lekin yeh connection hi toh asli magic hai.",
      context: "On connecting with audiences"
    }
  ];
  
  return (
    <section className="py-20 bg-secondary dark:bg-gray-800 text-white relative">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-bounce"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Behind the <span className="gradient-text">Scenes</span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Exclusive insights and quotes from Zakir's comedy journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => (
            <Card 
              key={index}
              className={`glass-effect p-8 hover-tilt transition-all duration-500 fade-in ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <blockquote className="text-xl font-medium mb-4 text-white italic">
                  "{quote.text}"
                </blockquote>
                <p className="text-gray-400 text-sm">{quote.context}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FanWallSection() {
  const { ref, isInView } = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Zakir bhai ne meri zindagi mein khushi wapas la di! His comedy is pure therapy.",
      rating: 5
    },
    {
      name: "Rohit Gupta", 
      location: "Delhi",
      text: "Best comedian in India! His relatability is unmatched. True Sakht Launda!",
      rating: 5
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      text: "I've seen him live 3 times. Each show is better than the last. Pure genius!",
      rating: 5
    },
    {
      name: "Karan Singh",
      location: "Pune",
      text: "His storytelling makes you feel like you're talking to your best friend.",
      rating: 5
    },
    {
      name: "Sneha Joshi",
      location: "Chennai",
      text: "Finally, comedy that speaks to every middle-class Indian soul!",
      rating: 5
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-secondary dark:text-white">
            Fan <span className="gradient-text">Wall</span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            What the Sakht Launda community is saying
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonial Cards */}
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index}
                  className="min-w-full md:min-w-1/2 lg:min-w-1/3 mx-4 bg-gradient-to-br from-gray-50 to-white shadow-xl hover-lift"
                >
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-lg font-medium mb-6 text-secondary italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="text-center">
                      <p className="font-semibold text-secondary">{testimonial.name}</p>
                      <p className="text-gray-400">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="hover:scale-110 transition-transform duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="hover:scale-110 transition-transform duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedClipSection() {
  const { ref, isInView } = useInView();
  
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
      {/* Parallax background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-24 translate-y-24 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`text-center fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 text-white">
            Featured <span className="text-secondary">Comedy Clip</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Watch Zakir's most viral stand-up moment that broke the internet
          </p>
          
          <div className="relative max-w-4xl mx-auto group cursor-pointer">
            <div className="aspect-video bg-black/30 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover-lift">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-white/30 transition-colors duration-300">
                    <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">"Sakht Launda" Origin Story</h3>
                  <p className="text-lg opacity-90 mb-6">The clip that started it all - 2.5M views</p>
                  <Button className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300">
                    Watch Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoIntroSection />
      <FeaturesSection />
      <BehindTheScenesSection />
      <FanWallSection />
      <FeaturedClipSection />
    </>
  );
}
