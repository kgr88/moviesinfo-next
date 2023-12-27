import getTrending from './utils/get-trending';
import TrendingMovies from './components/trending/trending-movies';
export default async function Page() {
  const trending = await getTrending('movie');
  return(
    <TrendingMovies trending={trending.results} />
  )
  
  
}
