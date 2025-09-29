import SearchPage from '@/components/search-page'
import AppLayout from '@/components/app-layout'

export default function Search() {
  return (
    <AppLayout currentPage="search">
      <SearchPage />
    </AppLayout>
  )
}
