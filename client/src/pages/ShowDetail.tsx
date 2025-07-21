import { useParams } from 'wouter';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useInView } from '@/hooks/useInView';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users } from 'lucide-react';
import type { Show } from '@shared/schema';

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="glass-effect p-8 mb-12">
      <CardContent className="p-0">
        <h3 className="font-display font-semibold text-2xl mb-6 text-center text-white">Show Starts In</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-primary rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="text-sm text-white">Days</div>
          </div>
          <div className="bg-primary rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-sm text-white">Hours</div>
          </div>
          <div className="bg-primary rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-sm text-white">Minutes</div>
          </div>
          <div className="bg-primary rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-sm text-white">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ShowDetail() {
  const { id } = useParams<{ id: string }>();
  const { ref, isInView } = useInView();

  const { data: show, isLoading } = useQuery<Show>({
    queryKey: ['/api/shows', id],
    enabled: !!id,
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
            <p className="mt-4 text-white">Loading show details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-white">Show not found</h1>
          <p className="mt-2 text-gray-400">The show you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="relative">
        <ThreeBackground particleCount={20} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div ref={ref} className={`text-center mb-12 fade-in ${isInView ? 'visible' : ''}`}>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
              {show.title}
            </h1>
            <p className="text-2xl text-primary font-semibold mb-4">{show.venue}</p>
            <p className="text-xl text-gray-400">
              {formatDate(show.date)} • {show.time}
            </p>
          </div>
          
          {/* Countdown Timer */}
          <CountdownTimer targetDate={new Date(show.date)} />
          
          {/* Show Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className={`glass-effect p-6 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-0">
                <h3 className="font-display font-semibold text-xl mb-4 text-white">Venue Details</h3>
                <div className="space-y-3 text-white">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{show.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Duration: {show.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Capacity: {show.capacity} seats</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`glass-effect p-6 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-0">
                <h3 className="font-display font-semibold text-xl mb-4 text-white">Ticket Pricing</h3>
                <div className="space-y-3 text-white">
                  <div className="flex justify-between items-center">
                    <span>Premium</span>
                    <span className="font-semibold">₹{parseFloat(show.price) * 1.5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Standard</span>
                    <span className="font-semibold">₹{show.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Economy</span>
                    <span className="font-semibold">₹{Math.round(parseFloat(show.price) * 0.6)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA Button */}
          <div className={`text-center fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.5s' }}>
            <Button className="bg-primary hover:bg-accent text-white font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 hover:scale-105">
              🎫 Book Tickets Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
