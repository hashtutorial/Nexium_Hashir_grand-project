'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Egg, 
  Droplet, 
  Carrot, 
  Wheat, 
  Flame,
  ChefHat,
  Clock,
  Users,
  TrendingUp,
  Star,
  Zap,
  Plus,
  Sparkles,
  Globe,
  LogOut,
  X
} from 'lucide-react';
import clsx from 'clsx';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const quickAddItems = [
  {
    label: 'Dairy',
    icon: Droplet,
    items: ['Milk', 'Butter', 'Cheese', 'Yogurt'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20'
  },
  {
    label: 'Protein',
    icon: Egg,
    items: ['Eggs', 'Chicken', 'Beef', 'Tofu'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20'
  },
  {
    label: 'Vegetables',
    icon: Carrot,
    items: ['Onions', 'Tomatoes', 'Spinach', 'Carrots'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20'
  },
  {
    label: 'Grains',
    icon: Wheat,
    items: ['Flour', 'Bread', 'Rice', 'Pasta'],
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20'
  },
  {
    label: 'Essentials',
    icon: Flame,
    items: ['Salt', 'Sugar', 'Oil'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20'
  },
];

const recipeStats = [
  { icon: Clock, label: 'Avg Cook Time', value: '25 min', color: 'text-blue-500' },
  { icon: Users, label: 'Serves', value: '2-4', color: 'text-green-500' },
  { icon: TrendingUp, label: 'Success Rate', value: '94%', color: 'text-orange-500' },
  { icon: Star, label: 'Avg Rating', value: '4.8/5', color: 'text-yellow-500' },
];

const cuisineOptions = ['Desi', 'Continental', 'Asian', 'Mexican', 'Italian', 'Middle Eastern'];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ingredientInput, setIngredientInput] = useState('');
  const [pantry, setPantry] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [preference, setPreference] = useState('');
  const [fusionEnabled, setFusionEnabled] = useState(false);
  const [fusionCuisine, setFusionCuisine] = useState('');

  const availableFusionOptions = cuisineOptions.filter(cuisine => cuisine !== preference);

  const handleSignOut = async () => {
  await supabase.auth.signOut();
  router.push('/signin'); 
};


  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !pantry.includes(trimmed)) {
      setPantry((prev) => [...prev, trimmed]);
      setIngredientInput('');
    }
  };

  const handleQuickAdd = (item: string) => {
    if (!pantry.includes(item)) {
      setPantry((prev) => [...prev, item]);
    }
  };

  const handleRemove = (item: string) => {
    setPantry((prev) => prev.filter((i) => i !== item));
  };

const handleGenerateRecipe = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 text-foreground overflow-hidden relative">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 320, opacity: 0 }}
        animate={{ 
          width: sidebarOpen ? 320 : 0, 
          opacity: sidebarOpen ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={clsx(
          'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-700 overflow-hidden h-full relative z-10',
          {
            'shadow-2xl shadow-slate-900/20': sidebarOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChefHat className="w-8 h-8" />
              </motion.div>
              <h2 className="text-xl font-bold">Smart Pantry</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-black/20 cursor-pointer" 
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="px-6 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {/* Input */}
            <div className="space-y-3">
              <div className="relative">
                <Input
                  placeholder="Add ingredient..."
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddIngredient();
                  }}
                  className="pl-4 pr-12 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 transition-all duration-200 bg-white/70 dark:bg-slate-700/70"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddIngredient}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/*Quick Add */}
            <div className="space-y-4">
              {quickAddItems.map(({ label, icon: Icon, items, color, bgColor }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={clsx('p-4 rounded-xl transition-all duration-200', bgColor)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={clsx('p-2 rounded-lg bg-gradient-to-r', color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{label}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <motion.button
                        key={item}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                          'bg-white/80 dark:bg-slate-600/80 hover:bg-gradient-to-r hover:text-white shadow-sm hover:shadow-md',
                          `hover:${color}`
                        )}
                        onClick={() => handleQuickAdd(item)}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <Separator className="my-4" />

            {/*Pantry List */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Your Pantry</p>
                <div className="ml-auto bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {pantry.length} items
                </div>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                <AnimatePresence>
                  {pantry.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-slate-500 dark:text-slate-400"
                    >
                      <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Your pantry is empty</p>
                      <p className="text-xs">Add ingredients to get started!</p>
                    </motion.div>
                  )}
                  {pantry.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-white/70 dark:bg-slate-700/70 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300">{item}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item)}
                        className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.button
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={handleSignOut}
  className="fixed top-6 right-6 z-20 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
  title="Sign Out"
>
  <LogOut className="w-5 h-5" />
      </motion.button>
      <main className="flex-1 relative p-8 overflow-y-auto">
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed top-6 left-6 z-20  dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={clsx(
            'text-center mb-12',
            !sidebarOpen && 'pt-16'
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChefHat className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              ChefGPT
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
            </motion.div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your AI-powered culinary companion that transforms your pantry into gourmet possibilities
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
<Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <CardContent className="relative py-16 px-8">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30"
              />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full">
                <Zap className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              Ready to Cook?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transform your ingredients into extraordinary recipes with the power of AI. Add items to your pantry and let our intelligent chef create personalized culinary experiences just for you.
            </p>
          </div>

<div className="space-y-6">
  {/* Cuisine Preference Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 dark:from-slate-800/50 dark:to-blue-900/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
        <Globe className="w-5 h-5 text-white" />
      </div>
      <Label className="text-lg font-semibold text-slate-700 dark:text-slate-300">
        Cuisine Preference
      </Label>
    </div>
    
    <Select value={preference} onValueChange={setPreference}>
      <SelectTrigger className="w-full max-w-sm mx-auto bg-white/70 dark:bg-slate-700/70 border-2 border-slate-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-500 focus:border-orange-500 rounded-xl py-3 px-4 transition-all duration-200">
        <SelectValue placeholder="Choose your preferred cuisine..." />
      </SelectTrigger>
      <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
        {cuisineOptions.map((cuisine) => (
          <SelectItem 
            key={cuisine} 
            value={cuisine}
            className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 rounded-lg m-1 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              {cuisine}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </motion.div>

  {/* Fusion Mode Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <motion.div 
        animate={fusionEnabled ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </motion.div>
      <Label className="text-lg font-semibold text-slate-700 dark:text-slate-300">
        Fusion Mode
      </Label>
    </div>

    <div className="space-y-4">
      {/* Fusion Toggle */}
      <div className="flex items-center justify-center gap-3">
        <Label 
          htmlFor="fusion-toggle" 
          className="text-slate-600 dark:text-slate-400 font-medium"
        >
          Create fusion recipes
        </Label>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Switch
            id="fusion-toggle"
            checked={fusionEnabled}
            onCheckedChange={setFusionEnabled}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
          />
        </motion.div>
      </div>

      {/* Fusion Cuisine Selector */}
      <AnimatePresence>
        {fusionEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3"
          >
            <Label className="text-slate-600 dark:text-slate-400 font-medium block text-center">
              Choose second cuisine for fusion
            </Label>
            <Select value={fusionCuisine} onValueChange={setFusionCuisine}>
              <SelectTrigger className="w-full max-w-sm mx-auto bg-white/70 dark:bg-slate-700/70 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 focus:border-purple-500 rounded-xl py-3 px-4 transition-all duration-200">
                <SelectValue placeholder="Select second cuisine..." />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
                {availableFusionOptions.map((cuisine) => (
                  <SelectItem 
                    key={cuisine} 
                    value={cuisine}
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 rounded-lg m-1 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      {cuisine}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Fusion Preview */}
            {preference && fusionCuisine && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-3 mx-auto max-w-sm"
              >
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>{preference}</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Plus className="w-4 h-4 text-purple-500" />
                  </motion.div>
                  <span>{fusionCuisine}</span>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-4 h-4 text-pink-500 ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
</div>

          {/* Generate Button */}
          <motion.div
            whileHover={{ scale: pantry.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            className="pt-6"
          >
            <Button
              onClick={() => handleGenerateRecipe()}
              disabled={pantry.length === 0 || isGenerating}
              className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center gap-3"
                >
                  <span>Cooking...</span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-3">
                  <ChefHat className="w-6 h-6" />
                  <span>Generate Recipe</span>
                </div>
              )}
            </Button>
          </motion.div>

          {pantry.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2"
            >
              Add ingredients to your pantry to get started
            </motion.p>
          )}
        </div>
      </CardContent>
    </Card>
        </motion.div>
      </main>
    </div>
  );
}
