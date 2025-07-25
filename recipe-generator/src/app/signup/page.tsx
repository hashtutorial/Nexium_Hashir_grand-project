'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ChefHat, ArrowLeft, Mail, Lock, Sparkles, UserPlus, Star, Zap } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function SignUpPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      toast.success('Signup successful! Check your email to verify your account.');
      
      // Wait 2 seconds before redirecting
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Animated Background - matching homepage */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-background to-green-50/50 dark:from-orange-950/20 dark:via-background dark:to-green-950/20" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 dark:bg-yellow-800/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6 backdrop-blur-md bg-background/80">
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
          <Link href="/">
            <Button variant="outline" className="border-2 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:border-orange-300 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md relative z-10">
          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 bg-green-500 text-white p-3 rounded-full shadow-lg animate-float hidden sm:block">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="absolute -top-4 -right-8 bg-orange-500 text-white p-2 rounded-full shadow-lg animate-float animation-delay-1000 hidden sm:block">
            <Star className="w-4 h-4" />
          </div>
          <div className="absolute -bottom-8 -right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg animate-float animation-delay-2000 hidden sm:block">
            <Zap className="w-4 h-4" />
          </div>

          {/* Sign Up Card */}
          <Card className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-orange-500/20 to-green-500/20 rounded-3xl blur-xl" />
            
            <div className="relative z-10">
              <CardHeader className="text-center space-y-4 pb-8">
                {/* Welcome Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-sm font-medium mx-auto">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join ChefGPT
                </div>
                
                <CardTitle className="text-4xl font-black bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent">
                  Start Your Journey
                </CardTitle>
                
                <p className="text-lg text-muted-foreground">
                  Create your account and discover amazing recipes
                </p>

                {/* Benefits Preview */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-orange-50/80 dark:bg-orange-950/30 rounded-xl p-3 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">AI Recipes</span>
                    </div>
                  </div>
                  <div className="bg-green-50/80 dark:bg-green-950/30 rounded-xl p-3 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-300">Urdu Support</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                <form onSubmit={handleSignUp} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-foreground">
                      <Mail className="w-4 h-4 mr-2 text-green-500" />
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="chef@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 pl-4 pr-4 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-400 focus:ring-green-400/20 focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="flex items-center text-sm font-semibold text-foreground">
                      <Lock className="w-4 h-4 mr-2 text-orange-500" />
                      Create Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pl-4 pr-4 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-400 focus:ring-orange-400/20 focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground ml-1">
                      Make sure it is at least 6 characters long
                    </p>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-sm" />
                      <div className="relative bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-sm text-red-600 dark:text-red-400 font-medium text-center">
                          {errorMsg}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sign Up Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-green-500 to-orange-600 hover:from-green-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl cursor-pointer" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating Your Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Join ChefGPT Free
                      </>
                    )}
                  </Button>
                </form>

                {/* Terms and Privacy */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By signing up, you agree to our Terms of Service and Privacy Policy. 
                    We will send you a verification email to get started.
                  </p>
                </div>

                {/* Sign In Link */}
                <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    Already cooking with us?
                  </p>
                  <Link href="/signin">
                    <Button variant="outline" className="w-full border-2 hover:bg-green-50 dark:hover:bg-green-950/50 hover:border-green-300 transition-all duration-300 rounded-xl font-semibold">
                      <ChefHat className="w-4 h-4 mr-2" />
                      Sign In Instead
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Bottom Stats */}
          <div className="text-center mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>10K+ Happy Cooks</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>AI-Powered</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Join thousands discovering new flavors every day
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
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
