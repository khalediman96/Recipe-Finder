"use client"
import axios from 'axios';
import { useState } from 'react';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const API_URL = `https://api.spoonacular.com/recipes/findByIngredients`;

  const handleSearch = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          ingredients: ingredients,
          apiKey: API_KEY,
          number: 10,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setIngredients('');
    setRecipes([]);
  };

  return (
    <section className=' container h-[100vh] mx-auto max-w-[100%] p-4 bg-slate-800'>
                 <div className=" container mx-auto max-w-[100%]  md:max-w-[80%] lg:max-w-[60%] flex flex-col rounded-lg mt-[80px] p-6 bg-slate-950">
                        <div className=" flex flex-col justify-center items-center ">
                            <h1 className="text-4xl font-bold text-center text-slate-200 mb-2">
                               Recipe Finder
                            </h1>
                            <p className='text-gray-400 font-normal text-md mb-8'> By Khaled Iman</p>

                            {/* Search Bar */}
                            <div className=" w-[80%] flex flex-col  gap-2 mb-8">
                                <input
                                    type="text"
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    placeholder="Enter ingredients (comma separated)"
                                    className="flex-1 p-4 border  text-gray-300 w-[100%] bg-slate-700 border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-300"
                                />
                                <div className='flex flex-row gap-3 mt-3'>
                                    <button
                                        onClick={handleSearch}
                                        disabled={loading}
                                        className="px-6 w-[100%] text-md py-5 bg-amber-700 text-white rounded-lg hover:bg-amber-600 disabled:bg-orange-400 transition-all duration-300"
                                    >
                                        {loading ? 'Searching...' : 'Search'}
                                    </button>
                                    <button
                                    onClick={handleRefresh}
                                        className="px-6 w-[40%] text-md py-5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>

           
                        </div>

                         {/* Recipe Grid */}
                            <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <div
                                key={recipe.id}
                                className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                                >
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-normal text-gray-300 mb-2">
                                    {recipe.title}
                                    </h2>
                                    <p className="text-gray-400">
                                    Missing Ingredients: {recipe.missedIngredientCount}
                                    </p>
                                </div>
                                </div>
                            ))}
                            </div>

                            {/* No Results Message */}
                            {recipes.length === 0 && !loading && (
                            <p className="text-center text-gray-500 mt-8 animate-fade-in">
                                No recipes found. Try entering different ingredients!
                            </p>
                            )}
                 </div>
    </section>
  );
};

export default RecipeFinder;