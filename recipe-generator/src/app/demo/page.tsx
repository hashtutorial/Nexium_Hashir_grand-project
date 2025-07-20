'use client';

import { useState } from 'react';
import { ChefHat, Utensils, Globe, Sparkles, Clock, Users, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Recipe {
  ingredients: string[];
  instructions: string[];
  servingInfo: string[];
}

export default function RecipeGeneratorPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [fusionCuisine, setFusionCuisine] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoHome = () => {
    router.push('/');
  };

  const handleSubmit = async () => {
    
    if (!ingredients.trim()) {
      setError('Please enter some ingredients');
      return;
    }
    
    setLoading(true);
    setError('');
    setRecipe('');
    
    try {
      const input = `Ingredients: ${ingredients}. Preference of cuisine: ${cuisine || 'any'}. Fuse with: ${fusionCuisine || 'none'}.`;
      
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }
      
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatRecipe = (recipeText: string) => {
    if (!recipeText) return null;
    
    const recipes = recipeText.split(/Recipe \d+:/).filter(Boolean);
    
    return recipes.map((recipe, index) => {
      const lines = recipe.trim().split('\n');
      const title = lines[0];
      
      let currentSection: 'ingredients' | 'instructions' | 'servingInfo' | '' = '';
      const sections: Recipe = {
        ingredients: [],
        instructions: [],
        servingInfo: []
      };
      
      lines.slice(1).forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;
        
        if (trimmedLine.toLowerCase().includes('ingredients:')) {
          currentSection = 'ingredients';
          return;
        }
        if (trimmedLine.toLowerCase().includes('instructions:')) {
          currentSection = 'instructions';
          return;
        }
        if (trimmedLine.toLowerCase().includes('estimated serving')) {
          currentSection = 'servingInfo';
        }
        
        if (currentSection === 'ingredients' && trimmedLine.startsWith('*')) {
          sections.ingredients.push(trimmedLine.substring(1).trim());
        } else if (currentSection === 'instructions' && /^\d+\./.test(trimmedLine)) {
          sections.instructions.push(trimmedLine);
        } else if (currentSection === 'servingInfo' && trimmedLine.toLowerCase().includes('serving')) {
          sections.servingInfo.push(trimmedLine);
        }
      });
      
      return (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <ChefHat className="text-orange-500 mr-2" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Utensils className="text-green-500 mr-2" size={20} />
                <h4 className="text-lg font-semibold text-gray-700">Ingredients</h4>
              </div>
              <ul className="space-y-1">
                {sections.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <Clock className="text-blue-500 mr-2" size={20} />
                <h4 className="text-lg font-semibold text-gray-700">Instructions</h4>
              </div>
              <ol className="space-y-2">
                {sections.instructions.map((instruction, i) => (
                  <li key={i} className="text-gray-600 text-sm">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
          
          {sections.servingInfo.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <Users className="text-purple-500 mr-2" size={16} />
                <div className="text-sm text-gray-600">
                  {sections.servingInfo.map((info, i) => (
                    <span key={i} className="font-medium">{info}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <ChefHat className="text-orange-500" size={24} />
              <span className="font-semibold text-gray-800">Recipe Generator</span>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-orange-500 mr-3" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">AI Recipe Generator</h1>
          </div>
          <p className="text-lg text-gray-600">Create fusion recipes with your available ingredients</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="ingredients" className="flex items-center text-lg font-medium text-gray-700 mb-2">
                  <Utensils className="mr-2 text-green-500" size={20} />
                  Ingredients *
                </label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., chicken, bell peppers, onions, rice, garlic..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cuisine" className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <Globe className="mr-2 text-blue-500" size={20} />
                    Primary Cuisine
                  </label>
                  <input
                    id="cuisine"
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="e.g., Mexican, Italian, Indian..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="fusion" className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <Sparkles className="mr-2 text-purple-500" size={20} />
                    Fusion With
                  </label>
                  <input
                    id="fusion"
                    type="text"
                    value={fusionCuisine}
                    onChange={(e) => setFusionCuisine(e.target.value)}
                    placeholder="e.g., Thai, Korean, Mediterranean..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Recipes...
                  </>
                ) : (
                  <>
                    <ChefHat className="mr-2" size={20} />
                    Generate Recipes
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {recipe && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Custom Recipes</h2>
              <p className="text-gray-600">Here are some delicious recipes tailored to your needs!</p>
            </div>
            
            <div className="space-y-6">
              {formatRecipe(recipe)}
            </div>
          </div>
        )}
        
        <button
          onClick={handleGoHome}
          className="fixed bottom-8 right-8 bg-white hover:bg-gray-50 text-gray-700 hover:text-orange-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 group z-40"
          title="Go to Home"
        >
          <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
