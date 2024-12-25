import RecipeList from '../components/RecipeList'
import FavoritesList from '../components/FavoritesList'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Recipe Viewer</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recipes</h2>
          <RecipeList />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
          <FavoritesList />
        </div>
      </div>
    </main>
  )
}

