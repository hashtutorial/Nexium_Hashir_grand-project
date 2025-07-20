'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Package,
  DollarSign,
  ChefHat,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

interface ShoppingItem {
  name: string;
  quantity?: string;
  category: string;
  checked: boolean;
  estimatedPrice?: number;
}

const categoryIcons = {
  'Dairy': '🥛',
  'Protein': '🥩',
  'Vegetables': '🥕',
  'Fruits': '🍎',
  'Grains': '🌾',
  'Spices': '🧄',
  'Essentials': '🧂',
  'Herbs': '🌿',
  'Pantry': '🏺',
  'Other': '📦'
};

const categoryColors = {
  'Dairy': 'from-blue-500 to-cyan-500',
  'Protein': 'from-orange-500 to-red-500',
  'Vegetables': 'from-green-500 to-emerald-500',
  'Fruits': 'from-pink-500 to-rose-500',
  'Grains': 'from-yellow-500 to-amber-500',
  'Spices': 'from-purple-500 to-violet-500',
  'Essentials': 'from-gray-500 to-slate-500',
  'Herbs': 'from-lime-500 to-green-500',
  'Pantry': 'from-brown-500 to-amber-600',
  'Other': 'from-indigo-500 to-blue-500'
};

// Create a separate component for the shopping content
function ShoppingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [recipeName, setRecipeName] = useState('');
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    const ingredients = searchParams.get('ingredients');
    const recipe = searchParams.get('recipe');
    
    if (ingredients && recipe) {
      setRecipeName(decodeURIComponent(recipe));
      const parsedIngredients = JSON.parse(decodeURIComponent(ingredients));
      
      const categorizedItems = parsedIngredients.map((ingredient: string) => ({
        name: ingredient,
        quantity: extractQuantity(ingredient),
        category: categorizeIngredient(ingredient),
        checked: false,
        estimatedPrice: estimatePrice(ingredient)
      }));
      
      setShoppingList(categorizedItems);
      
      const total = categorizedItems.reduce((sum: number, item: ShoppingItem) => 
        sum + (item.estimatedPrice || 0), 0);
      setTotalEstimatedCost(total);
    }
  }, [searchParams]);

  const extractQuantity = (ingredient: string): string => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?\s*(?:cup|cups|tbsp|tsp|oz|lb|lbs|g|kg|ml|l)?)\s+/i);
    return match ? match[1] : '1 unit';
  };

  const categorizeIngredient = (ingredient: string): string => {
    const lowerCase = ingredient.toLowerCase();
    
    if (lowerCase.includes('milk') || lowerCase.includes('butter') || 
        lowerCase.includes('cheese') || lowerCase.includes('yogurt') || 
        lowerCase.includes('cream')) return 'Dairy';
    
    if (lowerCase.includes('chicken') || lowerCase.includes('beef') || 
        lowerCase.includes('fish') || lowerCase.includes('egg') || 
        lowerCase.includes('tofu') || lowerCase.includes('meat')) return 'Protein';
    
    if (lowerCase.includes('onion') || lowerCase.includes('tomato') || 
        lowerCase.includes('carrot') || lowerCase.includes('potato') || 
        lowerCase.includes('pepper') || lowerCase.includes('spinach') ||
        lowerCase.includes('lettuce') || lowerCase.includes('broccoli')) return 'Vegetables';
    
    if (lowerCase.includes('apple') || lowerCase.includes('banana') || 
        lowerCase.includes('orange') || lowerCase.includes('lemon') || 
        lowerCase.includes('lime') || lowerCase.includes('berry')) return 'Fruits';
    
    if (lowerCase.includes('flour') || lowerCase.includes('rice') || 
        lowerCase.includes('bread') || lowerCase.includes('pasta') || 
        lowerCase.includes('oats') || lowerCase.includes('quinoa')) return 'Grains';
    
    if (lowerCase.includes('salt') || lowerCase.includes('pepper') || 
        lowerCase.includes('cumin') || lowerCase.includes('paprika') || 
        lowerCase.includes('cinnamon') || lowerCase.includes('garlic powder')) return 'Spices';
    
    if (lowerCase.includes('basil') || lowerCase.includes('cilantro') || 
        lowerCase.includes('parsley') || lowerCase.includes('mint') || 
        lowerCase.includes('thyme') || lowerCase.includes('rosemary')) return 'Herbs';
    
    if (lowerCase.includes('oil') || lowerCase.includes('vinegar') || 
        lowerCase.includes('sugar') || lowerCase.includes('honey')) return 'Essentials';
    
    return 'Other';
  };

  const estimatePrice = (ingredient: string): number => {
    const lowerCase = ingredient.toLowerCase();
    
    if (lowerCase.includes('saffron') || lowerCase.includes('truffle')) return 25;
    if (lowerCase.includes('beef') || lowerCase.includes('lamb')) return 12;
    if (lowerCase.includes('chicken') || lowerCase.includes('fish')) return 8;
    if (lowerCase.includes('cheese') || lowerCase.includes('butter')) return 6;
    if (lowerCase.includes('milk') || lowerCase.includes('yogurt')) return 4;
    if (lowerCase.includes('vegetables') || lowerCase.includes('fruits')) return 3;
    if (lowerCase.includes('spices') || lowerCase.includes('herbs')) return 2;
    
    return Math.floor(Math.random() * 5) + 2; // Random price between $2-7
  };

  const toggleItem = (index: number) => {
    const newList = [...shoppingList];
    newList[index].checked = !newList[index].checked;
    setShoppingList(newList);
    setCheckedCount(newList.filter(item => item.checked).length);
  };

  const groupedItems = shoppingList.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, ShoppingItem[]>);

  const completionPercentage = shoppingList.length > 0 ? 
    Math.round((checkedCount / shoppingList.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.back()}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping List
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  For: {recipeName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Progress</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {completionPercentage}%
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Items</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {checkedCount}/{shoppingList.length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Est. Total</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    ${totalEstimatedCost.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                >
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={clsx(
                          'p-2 rounded-lg bg-gradient-to-r text-white',
                          categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-slate-500'
                        )}>
                          <span className="text-lg">
                            {categoryIcons[category as keyof typeof categoryIcons] || '📦'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                          {category}
                        </h3>
                        <Badge variant="secondary" className="ml-auto">
                          {items.length} items
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {items.map((item, itemIndex) => (
                          <motion.div
                            key={`${category}-${itemIndex}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIndex * items.length + itemIndex) * 0.05 }}
                            className={clsx(
                              'flex items-center justify-between p-4 rounded-xl transition-all duration-200',
                              item.checked 
                                ? 'bg-green-50/80 dark:bg-green-900/20 border border-green-200/50 dark:border-green-700/50' 
                                : 'bg-slate-50/80 dark:bg-slate-700/50 hover:bg-slate-100/80 dark:hover:bg-slate-600/50'
                            )}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Checkbox
                                  checked={item.checked}
                                  onCheckedChange={() => toggleItem(shoppingList.indexOf(item))}
                                  className="w-5 h-5"
                                />
                              </motion.div>
                              
                              <div className="flex-1">
                                <p className={clsx(
                                  'font-medium transition-all duration-200',
                                  item.checked 
                                    ? 'text-green-700 dark:text-green-300 line-through' 
                                    : 'text-slate-700 dark:text-slate-300'
                                )}>
                                  {item.name}
                                </p>
                                {item.quantity && (
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Qty: {item.quantity}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {item.estimatedPrice && (
                                <span className={clsx(
                                  'text-sm font-medium px-3 py-1 rounded-full',
                                  item.checked 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                )}>
                                  ${item.estimatedPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipe Quick View */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <ChefHat className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      Recipe Ready?
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Once you have gathered all ingredients, head back to start cooking!
                  </p>
                  
                  <Button
                    onClick={() => router.push('/Dashboard')}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    <ChefHat className="w-4 h-4 mr-2" />
                    Back to Kitchen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for suspense fallback
function ShoppingPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your shopping list...</p>
        </div>
      </div>
    </div>
  );
}

export default function ShoppingPage() {
  return (
    <Suspense fallback={<ShoppingPageLoading />}>
      <ShoppingContent />
    </Suspense>
  );
}
