'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  [key: string]: string
}

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        setRecipe(response.data.meals[0])
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    const checkFavorite = async () => {
      try {
        const response = await axios.get(`/api/favorites/${id}`)
        setIsFavorite(response.data.isFavorite)
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    fetchRecipe()
    checkFavorite()
  }, [id])

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/api/favorites/${id}`)
      } else {
        await axios.post('/api/favorites', {
          recipeId: recipe?.idMeal,
          recipeName: recipe?.strMeal,
          imageUrl: recipe?.strMealThumb
        })
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (!recipe) return <div>Loading...</div>

  const ingredients = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => recipe[key])

  const measures = Object.keys(recipe)
    .filter(key => key.startsWith('strMeasure') && recipe[key])
    .map(key => recipe[key])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.strMeal}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-lg shadow-lg" />
        <div>
          <button
            onClick={toggleFavorite}
            className={`mb-4 px-4 py-2 rounded ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{`${ingredient} - ${measures[index]}`}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p className="whitespace-pre-line">{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  )
}

