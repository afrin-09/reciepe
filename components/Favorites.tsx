'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Favorite {
  _id: string
  recipeId: string
  recipeName: string
  imageUrl: string
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites')
        setFavorites(response.data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [])

  const removeFavorite = async (id: string) => {
    try {
      await axios.delete(`/api/favorites/${id}`)
      setFavorites(favorites.filter(fav => fav._id !== id))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  return (
    <div className="grid gap-4">
      {favorites.map((favorite) => (
        <div key={favorite._id} className="border rounded-lg overflow-hidden shadow-md flex">
          <Link href={`/recipe/${favorite.recipeId}`} className="flex-grow">
            <div className="flex">
              <img src={favorite.imageUrl} alt={favorite.recipeName} className="w-24 h-24 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{favorite.recipeName}</h3>
              </div>
            </div>
          </Link>
          <button
            onClick={() => removeFavorite(favorite._id)}
            className="bg-red-500 text-white px-4 hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

