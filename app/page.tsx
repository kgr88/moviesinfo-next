import getTrending from './utils/get-trending';
import TrendingMovies from './components/trending/trending-movies';
import UpcomingMovies from './components/trending/upcoming-movies';
import { get } from 'lodash';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTdiYTI1ODA0Njk5NmMwN2E5ZGM4Y2RlMWI3MTc2ZiIsInN1YiI6IjYzZTEwYzQ2MjNkMjc4MDA4MWNjYzY2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VPrhQPGmaB3mN8dPbv8qnP1nR1Z4mdKliprN8Jl2-kM',
  },
};

async function getUpcoming() {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?page=1',
    options
  );
  return res.json();
}
export default async function Page() {
  const upcoming = await getUpcoming();
  const trending = await getTrending('movie');
  return (
    <div >
      <TrendingMovies trending={trending.results} />
      <p className='max-w-1366 mx-auto font-bold text-4xl p-2 py-4 mt-6'>UPCOMING</p>
      <UpcomingMovies upcoming={upcoming.results} />
    </div>
  );
}
