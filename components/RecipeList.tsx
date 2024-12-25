'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        setRecipes(response.data.meals)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="grid gap-4">
      {recipes.map((recipe) => (
        <Link href={`/recipe/${recipe.idMeal}`} key={recipe.idMeal} className="block">
          <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.strMeal}</h3>
              <p className="text-gray-600 line-clamp-2">{recipe.strInstructions}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

