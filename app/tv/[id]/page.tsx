import Images from '../../components/details/images';
import Backdrop from '../../components/details/backdrop';
import Description from '../../components/details/description';
import Cast from '../../components/details/cast';
import Trailer from '../../components/details/trailer';
import Seasons from '../../components/details/seasons';
import Test from '../../components/details/test';
import { revalidatePath } from 'next/cache';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_KEY}`,
  },
};
async function getMovieData(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${query}?append_to_response=videos%2Cimages%2Ccredits`,
    options
  );
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const movieData = await getMovieData(params.id);
  //console.log(movieData, 'test')
  const trailerUrl = movieData.videos.results.filter(
    ({ type }) => type === 'Trailer'
  )[0]?.key;
  return (
    <>
      <Backdrop
        movieData={movieData}
        type={'tv series'}
        credits={movieData.credits}
      />

      <div className='mx-auto max-w-1366 justify-center'>
        <Description movieData={movieData} mediaType='tv' />
        <Seasons seasonData={movieData.seasons} />
        <Images images={movieData.images} />
        {trailerUrl ? <Trailer trailerUrl={trailerUrl} /> : null}
        <Cast credits={movieData.credits} />
        
      </div>
    </>
  );
}
