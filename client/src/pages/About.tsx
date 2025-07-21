import { useInView } from '@/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';

// Import Zakir Khan images
import formalPortrait from '@assets/imgi_59_wp8181808_1753118680310.jpg';
import stagePerformance from '@assets/imgi_53_wp8181675_1753118680311.jpg';
import casualPhoto from '@assets/imgi_63_wp8181845_1753118680311.jpg';

export default function About() {
  const { ref: mainRef, isInView: mainInView } = useInView();
  const { ref: journeyRef, isInView: journeyInView } = useInView();
  const { ref: achievementsRef, isInView: achievementsInView } = useInView();
  const { ref: philosophyRef, isInView: philosophyInView } = useInView();
  const { ref: socialRef, isInView: socialInView } = useInView();

  const achievements = [
    { number: "1M+", label: "YouTube Subscribers" },
    { number: "50+", label: "Cities Performed" },
    { number: "100K+", label: "Live Audience" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={mainRef} className={`text-center mb-16 fade-in ${mainInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-secondary">
            About <span className="gradient-text">Zakir Khan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The story of India's beloved "Sakht Launda" and his journey through comedy.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Main Story */}
          <Card className={`bg-gray-100 p-8 text-center fade-in ${mainInView ? 'visible' : ''}`}>
            <CardContent className="p-0">
              <div className="text-6xl mb-6">🎭</div>
              <blockquote className="text-2xl font-medium text-secondary mb-6 italic">
                "Main sakht launda hun, main kisi se nahi darta!"
              </blockquote>
              <p className="text-lg text-gray-400 leading-relaxed">
                Zakir Khan has become one of India's most beloved stand-up comedians, known for his relatable storytelling and the iconic phrase "Sakht Launda." His comedy resonates with millions of Indians who see their own experiences reflected in his humorous anecdotes about relationships, family, and everyday life.
              </p>
            </CardContent>
          </Card>
          
          {/* Journey Section */}
          <div ref={journeyRef} className="grid md:grid-cols-2 gap-8">
            <div className={`fade-in ${journeyInView ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="font-display font-semibold text-2xl mb-4 text-secondary">The Journey</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                From a young dreamer in Indore to one of India's most recognized comedic voices, Zakir's journey has been nothing short of remarkable. His authentic style of comedy, which draws from personal experiences and observations about Indian society, has earned him a loyal fanbase.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Through his shows, Zakir has created a community where everyone can laugh at the shared experiences of growing up in middle-class India, dealing with parents, and navigating the complexities of modern relationships.
              </p>
            </div>
            
            <div className={`fade-in ${journeyInView ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div 
                className="w-full h-80 bg-cover bg-center bg-no-repeat rounded-2xl shadow-lg hover-lift transition-transform duration-300"
                style={{
                  backgroundImage: `url(${stagePerformance})`,
                  backgroundPosition: 'center center'
                }}
              />
            </div>
          </div>
          
          {/* Achievements */}
          <div ref={achievementsRef} className={`fade-in ${achievementsInView ? 'visible' : ''}`} style={{ animationDelay: '0.4s' }}>
            <h3 className="font-display font-semibold text-2xl mb-8 text-center text-secondary">Achievements & Recognition</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.label}
                  className="text-center p-6 hover-tilt transition-all duration-300"
                >
                  <div className="text-4xl text-primary font-bold mb-2">{achievement.number}</div>
                  <p className="text-gray-400">{achievement.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Philosophy */}
          <Card ref={philosophyRef} className={`bg-secondary text-white p-8 fade-in ${philosophyInView ? 'visible' : ''}`} style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-0">
              <h3 className="font-display font-semibold text-2xl mb-6 text-center">Comedy Philosophy</h3>
              <p className="text-lg text-center leading-relaxed">
                "Comedy is not just about making people laugh; it's about creating a moment where strangers become friends, where differences fade away, and where we all realize that we're more similar than we think. That's the true power of a 'Sakht Launda.'"
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Social Links */}
        <div ref={socialRef} className={`text-center mt-16 fade-in ${socialInView ? 'visible' : ''}`} style={{ animationDelay: '0.6s' }}>
          <h3 className="font-display font-semibold text-2xl mb-8 text-secondary">Connect With Zakir</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all duration-300"
            >
              <span className="text-xl">▶️</span>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all duration-300"
            >
              <span className="text-xl">📷</span>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all duration-300"
            >
              <span className="text-xl">🐦</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
