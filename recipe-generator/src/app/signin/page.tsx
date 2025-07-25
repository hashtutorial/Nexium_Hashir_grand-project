'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ChefHat, ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function SignInPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/Dashboard');
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
          <div className="absolute -top-6 -left-6 bg-orange-500 text-white p-3 rounded-full shadow-lg animate-float hidden sm:block">
            <ChefHat className="w-5 h-5" />
          </div>
          <div className="absolute -top-4 -right-8 bg-green-500 text-white p-2 rounded-full shadow-lg animate-float animation-delay-1000 hidden sm:block">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Sign In Card */}
          <Card className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-green-500/20 to-orange-500/20 rounded-3xl blur-xl" />
            
            <div className="relative z-10">
              <CardHeader className="text-center space-y-4 pb-8">
                {/* Welcome Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mx-auto">
                  <Mail className="w-4 h-4 mr-2" />
                  Welcome Back
                </div>
                
                <CardTitle className="text-4xl font-black bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
                  Sign In
                </CardTitle>
                
                <p className="text-lg text-muted-foreground">
                  Ready to create some amazing recipes?
                </p>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-foreground">
                      <Mail className="w-4 h-4 mr-2 text-orange-500" />
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
                        className="h-12 pl-4 pr-4 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-400 focus:ring-orange-400/20 focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="flex items-center text-sm font-semibold text-foreground">
                      <Lock className="w-4 h-4 mr-2 text-green-500" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pl-4 pr-4 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-400 focus:ring-green-400/20 focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      />
                    </div>
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

                  {/* Sign In Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl cursor-pointer" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing You In...
                      </>
                    ) : (
                      <>
                        <ChefHat className="w-5 h-5 mr-2" />
                        Start Cooking
                      </>
                    )}
                  </Button>
                </form>

                {/* Additional Links */}
                <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    Do not have an account yet?
                  </p>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-2 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:border-orange-300 transition-all duration-300 rounded-xl font-semibold">
                      Create Your Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Bottom Decorative Element */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
              Join thousands of home cooks using AI
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