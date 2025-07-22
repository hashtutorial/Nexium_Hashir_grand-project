'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Heart, 
  Clock, 
  Users, 
  Utensils, 
  ArrowLeft, 
  Trash2, 
  Languages,
  Globe,
  Search,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SavedRecipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  translated_urdu: string | null;
  created_at: string;
}

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showTranslated, setShowTranslated] = useState<{[key: string]: boolean}>({});
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

 const fetchSavedRecipes = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/recipes', {
      method: 'GET',
      credentials: 'include', 
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // User is not authenticated, redirect to login
        router.push('/login');
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched recipes:', data); // Debug log
    setSavedRecipes(data.recipes || []);
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    // You might want to show a toast notification here
  } finally {
    setLoading(false);
  }
};

  const deleteRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSavedRecipes(prev => prev.filter(recipe => recipe.id !== id));
      } else {
        throw new Error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  const filteredAndSortedRecipes = savedRecipes
    .filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const toggleTranslation = (recipeId: string) => {
    setShowTranslated(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
        >
          <ChefHat className="w-12 h-12 text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="icon"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Saved Recipes
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  {savedRecipes.length} recipe{savedRecipes.length !== 1 ? 's' : ''} in your collection
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search recipes by name or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 bg-white/70 dark:bg-slate-700/70"
              />
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white/70 dark:bg-slate-700/70 border-2 border-slate-200 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        {filteredAndSortedRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="p-6 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-900 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-16 h-16 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              {searchTerm ? 'No recipes found' : 'No saved recipes yet'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start saving recipes from your dashboard to see them here!'
              }
            </p>
            <Button
              onClick={() => router.push('/Dashboard')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredAndSortedRecipes.map((recipe, index) => {
                const isTranslated = showTranslated[recipe.id] && recipe.translated_urdu;
                const displayContent = isTranslated ? recipe.translated_urdu : null;
                
                return (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 h-full">
                      <CardContent className="p-6">
                        {/* Recipe Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex-shrink-0">
                              <ChefHat className="w-5 h-5 text-white" />
                            </div>
                            <h3 className={`font-bold text-lg text-slate-800 dark:text-slate-200 truncate ${isTranslated ? 'text-right font-urdu' : ''}`}>
                              {isTranslated ? displayContent?.split('\n')[0] : recipe.title}
                            </h3>
                          </div>
                          
                          <div className="flex gap-1 ml-2">
                            {/* Translation Toggle */}
                            {recipe.translated_urdu && (
                              <Button
                                onClick={() => toggleTranslation(recipe.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                title={isTranslated ? "Show English" : "Show Urdu"}
                              >
                                <Globe className="w-4 h-4" />
                              </Button>
                            )}
                            
                            {/* Delete Button */}
                            <Button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this recipe?')) {
                                  deleteRecipe(recipe.id);
                                }
                              }}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Delete recipe"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Recipe Content */}
                        <div className={`space-y-4 ${isTranslated ? 'rtl' : ''}`}>
                          {/* Ingredients */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Utensils className="w-4 h-4 text-green-500" />
                              <h4 className={`font-semibold text-slate-700 dark:text-slate-300 ${isTranslated ? 'font-urdu' : ''}`}>
                                {isTranslated ? 'اجزاء' : 'Ingredients'}
                              </h4>
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                {recipe.ingredients.length}
                              </span>
                            </div>
                            <div className="bg-green-50/50 dark:bg-green-900/10 rounded-lg p-3 max-h-32 overflow-y-auto">
                              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                                  <li key={i} className={`flex items-start ${isTranslated ? 'text-right font-urdu' : ''}`}>
                                    <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                                    <span className="truncate">{ingredient}</span>
                                  </li>
                                ))}
                                {recipe.ingredients.length > 4 && (
                                  <li className="text-slate-500 italic text-xs">
                                    +{recipe.ingredients.length - 4} more...
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Steps Preview */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <h4 className={`font-semibold text-slate-700 dark:text-slate-300 ${isTranslated ? 'font-urdu' : ''}`}>
                                {isTranslated ? 'ہدایات' : 'Instructions'}
                              </h4>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                {recipe.steps.length} steps
                              </span>
                            </div>
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-3 max-h-32 overflow-y-auto">
                              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                {recipe.steps.slice(0, 2).map((step, i) => (
                                  <div key={i} className={`flex items-start ${isTranslated ? 'text-right font-urdu' : ''}`}>
                                    <span className="text-blue-500 mr-2 flex-shrink-0 font-medium">{i + 1}.</span>
                                    <span className="line-clamp-2">{step}</span>
                                  </div>
                                ))}
                                {recipe.steps.length > 2 && (
                                  <div className="text-slate-500 italic text-xs">
                                    +{recipe.steps.length - 2} more steps...
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            Saved {new Date(recipe.created_at).toLocaleDateString()}
                          </span>
                          {recipe.translated_urdu && (
                            <div className="flex items-center gap-1">
                              <Languages className="w-3 h-3" />
                              <span>Urdu</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
