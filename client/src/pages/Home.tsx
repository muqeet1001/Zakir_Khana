import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Play, Star, Users, Calendar, Award, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'wouter';
import { usePageLoader } from '../hooks/usePageLoader';

type Mood = 'energetic' | 'relaxed' | 'inspired' | 'nostalgic' | null;
type Achievement = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

const ZakirKhanHomepage: React.FC = () => {
  usePageLoader();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isStageReady, setIsStageReady] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const quotes = [
    "Aise toh main bahut sakht launda hoon, lekin yahan main pighal gya",
      "Bhai tumhara warrior hai",
    "ek tarfa pyaar bhi relationship hoti hai",
    "Engineering se comedy tak ka safar... kya hi life hai yaar!",
    "Sakht launda hu, emotional nahi hota... bilkul jhooth hai ye!",
    "Delhi mein struggle, Mumbai mein success... filmy kahani lagi hai!",
    "Audience ke saath connection banana... ye hi toh asli magic hai!"
  ];

  const achievements: Achievement[] = [
    { year: "2012", title: "First Open Mic", description: "The journey begins at Canvas Laugh Club", icon: "https://imgs.search.brave.com/0H6JddSYLxy54islUCgOxH7-6LXEp2GLv1Y8cUHRl-o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODU0/NjI2OTg2L3Bob3Rv/L25ldy1kZWxoaS1p/bmRpYS1jb21lZGlh/bi16YWtpci1raGFu/LWR1cmluZy10aGUt/c2V2ZW50aC1lZGl0/aW9uLW9mLXNocmkt/cmFtLWNvbGxlZ2Ut/b2YtY29tbWVyY2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXNYT0M2czNDcUhT/cDZsTUpFX2tYbDlI/OVhzV3NOZVluaU5p/TzRvaHA3d289" },
    { year: "2015", title: "YouTube Sensation", description: "Sakht Launda goes viral", icon: "https://zakir-media-prod.s3.amazonaws.com/video-thumbnai/1712922662440"},
    { year: "2017", title: "Sold Out Tours", description: "First national comedy tour", icon: "https://zakirkhanlive.com/assets/images/main-slider/Banner-6-Laptop.jpg" },
    { year: "2019", title: "OTT Specials", description: "Comedy specials on major platforms", icon: "https://imgs.search.brave.com/9hjGNDOVmvBmI34ZVPVM5I07_S9yXd9VuWvp2a0rsGY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaW5kaWFuZXhw/cmVzcy5jb20vMjAx/OC8wNi96YWtpci1r/aGFuLTc1OS5qcGc" },
    { year: "2021", title: "Arena Shows", description: "Performing in 10,000+ capacity venues", icon: "https://zakirkhanlive.com/assets/images/main-slider/Banner-2-Tablet.jpg" },
    { year: "2024", title: "International Tours", description: "Taking Indian comedy global", icon: "https://zakirkhanlive.com/assets/images/main-slider/Banner-3-SmallTablet.jpg" }
  ];

  const testimonials = [
    { name: "Priya Sharma", text: "Zakir's show made me forget all my worries. Pure magic!", rating: 5, city: "Mumbai" },
    { name: "Rahul Gupta", text: "Best comedy experience ever! Can't wait for the next show.", rating: 5, city: "Delhi" },
    { name: "Sneha Patel", text: "Laughed until my stomach hurt. Absolute genius!", rating: 5, city: "Bangalore" },
    { name: "Arjun Singh", text: "Relatable, hilarious, and heartwarming. Zakir is the best!", rating: 5, city: "Pune" }
  ];

  const moodThemes = {
    energetic: { bg: 'from-red-50 via-orange-50 to-yellow-50', accent: 'orange', text: 'text-red-900' },
    relaxed: { bg: 'from-blue-50 via-indigo-50 to-purple-50', accent: 'blue', text: 'text-blue-900' },
    inspired: { bg: 'from-green-50 via-emerald-50 to-teal-50', accent: 'green', text: 'text-green-900' },
    nostalgic: { bg: 'from-amber-50 via-yellow-50 to-orange-50', accent: 'amber', text: 'text-amber-900' },
    default: { bg: 'from-slate-50 via-gray-50 to-neutral-50', accent: 'gray', text: 'text-gray-900' }
  };

  const currentTheme = selectedMood ? moodThemes[selectedMood] : moodThemes.default;

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const stageElement = stageRef.current;
    if (stageElement) {
      stageElement.addEventListener('mousemove', handleMouseMove);
      return () => stageElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Stage curtain animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStageReady(true);
      setTimeout(() => setCurtainOpen(true), 500);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const playInteractionSound = () => {
    if (audioEnabled) {
      // In a real implementation, you'd play actual sound files
      console.log('Playing interaction sound');
    }
  };

  const navigateToShows = () => {
    playInteractionSound();
    setLocation('/shows');
  };

  const navigateToStore = () => {
    playInteractionSound();
    setLocation('/shop');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br transition-all duration-1000 ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Zakir Khan</div>
          <div className="hidden md:flex items-center space-x-8">
            <button className="hover:text-orange-600 transition-colors">About</button>
            <button onClick={navigateToShows} className="hover:text-orange-600 transition-colors">Shows</button>
            <button onClick={navigateToStore} className="hover:text-orange-600 transition-colors">Store</button>
            <button className="hover:text-orange-600 transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Interactive Comedy Stage */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Stage Background */}
        <div 
          ref={stageRef}
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-red-900/10 to-orange-900/20"
        >
          {/* Spotlight Effect */}
          <div
            className="absolute w-96 h-96 bg-gradient-radial from-yellow-300/30 via-orange-200/20 to-transparent rounded-full blur-3xl transition-all duration-300"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* Stage Lights */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 shadow-lg animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Audience Silhouettes */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex items-end justify-center h-full space-x-2 pb-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-black/60 rounded-t-full animate-bounce"
                  style={{
                    width: `${Math.random() * 8 + 4}px`,
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 2 + 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stage Curtains */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-800 via-red-700 to-red-600 transform transition-transform duration-2000 ${
              curtainOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
          />
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-800 via-red-700 to-red-600 transform transition-transform duration-2000 ${
              curtainOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
        </div>

        {/* Main Content */}
        <div className={`relative z-30 text-center max-w-6xl mx-auto px-6 transition-all duration-1000 ${curtainOpen ? 'opacity-100' : 'opacity-0'}`}>
          {/* Zakir's Character */}
          <div className="mb-12 relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center text-9xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgsvxWMeJRVnVQdHfDlE0ZEVwtn1I0-v2PI9tbIcaREPtqr-7Ieu1Mjp5QVZaEeewMzH8-TqezKSLIZMHSvFwlw" alt="Zakir Khan" className="w-full h-full object-cover" />
              <div className=" w-30 h-30 absolute bottom-0 right-10 bg-gradient-to-r from-orange-600 via-white-600 to-yellow-600 rounded-full p-3 shadow-lg animate-bounce flex items-center justify-center">
                <img src="header_logo.gif" alt="Ticket_section.gif" className="w-30 h-20 object-contain" />
              </div>
            </div>
            
            {/* Floating Quote Bubble */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl max-w-md animate-float">
              <div className="text-lg font-medium text-gray-800 italic">
                "{quotes[currentQuote]}"
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-white/95 rotate-45" />
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 mb-12">
            <h1 className="text-7xl md:text-8xl font-bold leading-tight">
              India's Most
              <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Beloved Comedian
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light opacity-80 max-w-3xl mx-auto leading-relaxed">
              From engineering dreams to comedy stages, witness the journey of the original
              <span className="font-bold text-orange-600"> Sakht Launda</span>
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={navigateToShows}
              className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Book Live Shows
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={navigateToStore}
              className="group bg-white/20 backdrop-blur-md hover:bg-white/30 border-2 border-white/30 text-current px-12 py-6 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              🛍️
              Shop Exclusive Merch
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-70">Shows Performed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-lg opacity-70">Hearts Touched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-70">Cities Conquered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Selector Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">How Are You Feeling Today?</h2>
          <p className="text-xl opacity-70 mb-16">Tap your mood to change the theme.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { mood: 'energetic' as Mood, emoji: '⚡', label: 'Energetic', color: 'orange' },
              { mood: 'relaxed' as Mood, emoji: '😌', label: 'Relaxed', color: 'blue' },
              { mood: 'inspired' as Mood, emoji: '✨', label: 'Inspired', color: 'green' },
              { mood: 'nostalgic' as Mood, emoji: '💭', label: 'Nostalgic', color: 'amber' }
            ].map(({ mood, emoji, label, color }) => (
              <button
                key={mood}
                onClick={() => {
                  setSelectedMood(mood);
                  playInteractionSound();
                }}
                className={`p-8 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl
                  ${selectedMood === mood 
                    ? `bg-${color}-200 border-4 border-${color}-500 shadow-2xl` 
                    : 'bg-white/40 backdrop-blur-md hover:bg-white/60 border-2 border-white/30'
                  }
                `}
              >
                <div className="text-6xl mb-4">{emoji}</div>
                <div className="text-xl font-bold">{label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 px-6 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Sakht Launda Chronicles</h2>
            <p className="text-xl opacity-70">From small town dreams to national fame</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 transform -translate-y-1/2" />
            
            {/* Timeline Items */}
            <div className="flex overflow-x-auto space-x-8 pb-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.year}
                  className="flex-none w-80 relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10" />
                  
                  {/* Content Card */}
                  <div className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                    index % 2 === 0 ? 'mt-16' : 'mb-16'
                  }`}>
                    <div className="text-5xl mb-6 text-center w-[200px] h-[160px] mx-auto">
                      {achievement.icon.startsWith('http') ? (
                        <img src={achievement.icon} alt={achievement.title} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        achievement.icon
                      )}
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">{achievement.year}</div>
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">What Fans Are Saying</h2>
            <p className="text-xl opacity-70">Real reactions from real people</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Featured Testimonial */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl font-medium mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm opacity-70">{testimonials[activeTestimonial].city}</div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold mb-2">10M+</div>
                <div className="text-sm opacity-70">Happy Audience</div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                <Award className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-70">Awards Won</div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                <Play className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <div className="text-3xl font-bold mb-2">100M+</div>
                <div className="text-sm opacity-70">Video Views</div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <div className="text-3xl font-bold mb-2">4.9</div>
                <div className="text-sm opacity-70">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-8">Ready to Join the Experience?</h2>
          <p className="text-2xl mb-12 opacity-90">
            Don't just watch comedy, live it. Be part of India's biggest comedy revolution.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <button
              onClick={navigateToShows}
              className="group bg-white text-orange-600 px-12 py-6 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 hover:bg-gray-50"
            >
              <Calendar className="w-6 h-6" />
              Book Your Laugh Session
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={navigateToStore}
              className="group bg-transparent border-2 border-white text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/10"
            >
              🛍️
              Get Your Zakir Gear
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-6xl mb-6  "><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgsvxWMeJRVnVQdHfDlE0ZEVwtn1I0-v2PI9tbIcaREPtqr-7Ieu1Mjp5QVZaEeewMzH8-TqezKSLIZMHSvFwlw" alt="Zakir Khan" className="w-20 h-20 object-cover rounded-full m-auto" /></div>
          <h3 className="text-3xl font-bold mb-4">Zakir Khan</h3>
          <p className="text-xl mb-8 opacity-70">India's Original Sakht Launda</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <button className="hover:text-orange-400 transition-colors text-lg">About</button>
            <button className="hover:text-orange-400 transition-colors text-lg">Shows</button>
            <button className="hover:text-orange-400 transition-colors text-lg">Store</button>
            <button className="hover:text-orange-400 transition-colors text-lg">Contact</button>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-sm opacity-60">
            © 2025 Zakir Khan. All rights reserved. Made with ❤️ and lots of chai.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZakirKhanHomepage;
