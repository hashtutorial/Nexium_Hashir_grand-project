'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { ChefHat, Languages, Sparkles, ShoppingCart, HeartPulse, Star, Zap, Globe, Shuffle,Brain,CheckCircle,Target } from 'lucide-react';
import { cn } from '@/lib/utils';

function EnhancedFeaturesWithHover() {
  return (
    <section className="relative px-8 py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6">
          <Target className="w-4 h-4 mr-2" />
          Why ChefGPT is Different
        </div>
        <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
          Features That Actually Matter
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Built specifically for individual culinary preferences and taste, our AI understands your culture, language, and taste preferences like no other platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <FeatureCard
          icon={<ChefHat className="h-8 w-8" />}
          title="Smart Recipes"
          description="Get AI-curated recipes based on your preferences and available ingredients."
          gradient="from-orange-500 to-red-500"
          delay="0"
          benefits={["Smart pantry option", "Preference-based filtering", "Serving size provisioning"]}
        />
        <FeatureCard
          icon={<Languages className="h-8 w-8" />}
          title="Urdu Translation"
          description="Every recipe is beautifully translated into Urdu with proper cooking terminology and cultural context."
          gradient="from-blue-500 to-purple-500"
          delay="200"
          benefits={["Native cooking terminology", "Cultural context preserved", "Toggle between languages"]}
        />
        <FeatureCard
          icon={<Sparkles className="h-8 w-8" />}
          title="Fusion Mode"
          description="Create innovative fusion dishes by mixing Pakistani flavors with international cuisines."
          gradient="from-purple-500 to-pink-500"
          delay="400"
          benefits={["Smart flavor pairing", "Cultural fusion logic", "User defined fusion recipes"]}
        />
        <FeatureCard
          icon={<ShoppingCart className="h-8 w-8" />}
          title="Smart Grocery List"
          description="Auto-generate optimized shopping list based on missing input ingredients."
          gradient="from-green-500 to-teal-500"
          delay="600"
          benefits={["Missing ingredient detection", "Local market prices", "Ingredient checklist"]}
        />
        <FeatureCard
          icon={<HeartPulse className="h-8 w-8" />}
          title="Nutritional Intelligence"
          description="Get detailed nutritional analysis with calorie count and nutrient value."
          gradient="from-red-500 to-orange-500"
          delay="800"
          benefits={["Caloric value", "Dietary awareness", "Portion planning"]}
        />
         <FeatureCard
          icon={<Shuffle className="h-8 w-8" />}
          title="Surprise Me!"
          description="Don't know what to cook? Let our AI surprise you with a random recipe based on your preferences and fusion choice."
          gradient="from-pink-500 to-rose-500"
          delay="1200"
          benefits={["Random recipe discovery", "Seasonal ingredient focus", "Adventure cooking mode"]}
        />
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: string;
  benefits?: string[];
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      text: "ChefGPT helped me cook healthy food in my own language. The fusion dishes are my new favorite. Love the design too!",
      author: "Zara A., Home Cook from Lahore",
      rating: 5
    },
    {
      text: "The AI suggestions are incredibly accurate. I've discovered so many new recipes that my family absolutely loves!",
      author: "Ahmed M., Food Enthusiast from Karachi",
      rating: 5
    },
    {
      text: "Finally, a recipe app that understands Pakistani taste preferences. The Urdu translations are perfect!",
      author: "Fatima K., Professional Chef from Islamabad",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-background to-green-50/50 dark:from-orange-950/20 dark:via-background dark:to-green-950/20" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 dark:bg-yellow-800/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Enhanced Navbar */}
      <header className={cn(
        "sticky top-0 z-50 flex items-center justify-between p-6 transition-all duration-300 backdrop-blur-md",
        isScrolled 
          ? "bg-background/80 shadow-lg border-b border-border/50" 
          : "bg-transparent"
      )}>
       <Link href="/" className="flex items-center space-x-3 group">
  <div className="relative">
    <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
    <div className="relative z-10 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-full p-2 shadow-lg border border-orange-200 dark:border-orange-700 group-hover:shadow-xl transition-all duration-300">
      <Image 
        src="/icons/chef-icon.png" 
        alt="ChefGPT logo" 
        width={30} 
        height={30}
        className="group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
  </div>
  <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
    ChefGPT
  </h1>
</Link>
      <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href="/signin">
            <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/*Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-24 gap-12">
        <div className="max-w-2xl space-y-8 z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium animate-fade-in">
              AI-Powered Recipe Generation
            </div>
            <h2 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight animate-slide-up">
              Your <span className="bg-gradient-to-r from-orange-500 via-red-500 to-green-600 bg-clip-text text-transparent animate-gradient">Personalized</span> AI Recipe Assistant
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up animation-delay-200">
              Discover personalized meals, smart cooking tips, and fusion cuisine generated just for you. 
              <span className="font-semibold text-foreground"> Translated in Urdu</span>, with optional grocery lists and nutrition facts.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
            <Link href="/signup">
              <Button size="lg" className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="cursor-pointer border-2 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:border-orange-300 transition-all duration-300 px-8">
                <Globe className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 animate-slide-up animation-delay-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">10K+</div>
              <div className="text-sm text-muted-foreground">Recipes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">24/7</div>
              <div className="text-sm text-muted-foreground">AI Assistance</div>
            </div>
          </div>
        </div>

        {/* Enhanced Hero Image */}
        <div className="relative w-full max-w-lg z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-green-400/30 rounded-2xl blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl">
            <Image
              src="/icons/chef-ai.png"
              alt="ChefGPT AI Assistant"
              width={500}
              height={500}
              className="relative z-10 rounded-xl hover:scale-105 transition-transform duration-500"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-orange-500 text-white p-3 rounded-full shadow-lg animate-float">
              <ChefHat className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-float animation-delay-1000">
              <Brain className="w-6 h-6" />
            </div>
            <div className="absolute top-1/2 -right-6 bg-blue-500 text-white p-2 rounded-full shadow-lg animate-float animation-delay-2000">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <EnhancedFeaturesWithHover />


      {/* Testimonials */}
      <section className="relative px-8 py-20 bg-gradient-to-r from-orange-50/50 to-green-50/50 dark:from-orange-950/20 dark:to-green-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12 bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
            Loved by all kinds of Cooks
          </h3>
          
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-2xl italic text-foreground mb-6 leading-relaxed">
              {testimonials[currentTestimonial].text}
            </blockquote>
            
            <p className="text-lg text-muted-foreground font-medium">
              — {testimonials[currentTestimonial].author}
            </p>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentTestimonial === index 
                      ? "bg-orange-500 w-8" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-orange-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-8 text-center bg-gradient-to-r from-orange-500/10 via-background to-green-500/10">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-5xl font-black mb-6 bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
            Ready to revolutionize your cooking?
          </h4>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistani home cooks who have transformed their kitchen experience with AI
          </p>
          <Link href="/signup">
            <Button size="lg" className="cursor-pointer bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 px-12 py-6 text-lg font-bold rounded-full">
              <Zap className="w-6 h-6 mr-3" />
              Start Cooking Smarter Today
            </Button>
          </Link>
        </div>
      </section>

      {/*  Footer */}
      <footer className="relative p-8 border-t border-border/50 text-center bg-gradient-to-r from-muted/50 to-background">
      <div className="flex justify-center items-center space-x-2 mb-4">
  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-full p-1 shadow-md border border-orange-200 dark:border-orange-700">
    <Image src="/icons/chef-icon.png" alt="ChefGPT" width={24} height={24} />
  </div>
  <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
    ChefGPT
  </span>
</div>
        <p className="text-muted-foreground">
          © 2025 ChefGPT. Revolutionizing Pakistani kitchens with AI.
        </p>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, delay, benefits }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-white/30 hover:border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0  opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl bg-gradient-to-r from-orange-500 to-green-500" />
      
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
        {icon}
      </div>
      
      <h4 className="font-black text-2xl mb-4 text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
        {title}
      </h4>
      
      <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
        {description}
      </p>
      
      {isHovered && benefits && (
        <div className="space-y-2 animate-fadeIn">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

