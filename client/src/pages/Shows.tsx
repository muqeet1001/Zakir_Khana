import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Show } from '@shared/schema';

export default function Shows() {
  const { ref, isInView } = useInView();

  const { data: shows = [], isLoading } = useQuery<Show[]>({
    queryKey: ['/api/shows'],
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-white">Loading shows...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-white">
            Upcoming <span className="gradient-text">Live Shows</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience Zakir Khan live across India. Book your tickets now for an unforgettable comedy experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shows.map((show, index) => (
            <Card 
              key={show.id}
              className={`glass-effect overflow-hidden hover:shadow-2xl transition-all duration-300 hover-tilt fade-in ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/show/${show.id}`}>
                <a className="block">
                  <img 
                    src={show.image} 
                    alt={`${show.city} Comedy Show`} 
                    className="w-full h-48 object-cover"
                  />
                </a>
              </Link>
              <CardContent className="p-6 text-white">
                <Link href={`/show/${show.id}`}>
                  <a>
                    <h3 className="font-display font-semibold text-2xl mb-2 hover:text-primary transition-colors">
                      {show.city}
                    </h3>
                  </a>
                </Link>
                <p className="text-primary font-semibold mb-2">{show.venue}</p>
                <p className="text-gray-400 mb-4">
                  {formatDate(show.date)} • {show.time}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">₹{show.price} onwards</span>
                  <Link href={`/show/${show.id}`}>
                    <Button className="bg-primary hover:bg-accent text-white transition-all duration-300 hover:scale-105">
                      Book Tickets
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
