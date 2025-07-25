import { Link } from 'wouter';
import { useInView } from '@/hooks/useInView';
import { ThreeHeroStage } from '@/components/ThreeBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function Floating404() {
  return (
    <div className="canvas-container mb-12 h-64">
      <ThreeHeroStage />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rotating-box text-8xl font-bold flex items-center justify-center text-primary">
          404
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Floating404 />
        
        <div ref={ref} className={`fade-in ${isInView ? 'visible' : ''}`}>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            Oops! <span className="gradient-text">Zakir couldn't find this page.</span>
          </h1>
          
          <Card className="glass-effect p-8 mb-8 max-w-2xl mx-auto">
            <CardContent className="p-0">
              <p className="text-2xl font-medium mb-4 italic text-white">
                "Yaar, yahan kuch nahi mila. Shayad ye page bhi meri tarah sakht ho gaya hai!"
              </p>
              <p className="text-lg text-gray-400">
                The page you're looking for seems to have disappeared faster than my confidence on a first date.
              </p>
            </CardContent>
          </Card>
          
          <div className="space-x-4">
            <Link href="/">
              <Button className="bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                🏠 Go Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                🛍️ Shop Instead
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-6xl animate-float">🎭</div>
        </div>
      </div>
    </section>
  );
}
