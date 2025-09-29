import FavoritesPage from '@/components/favorites-page'
import AppLayout from '@/components/app-layout'

export default function Favorites() {
  return (
    <AppLayout currentPage="favorites">
      <FavoritesPage />
    </AppLayout>
  )
}
