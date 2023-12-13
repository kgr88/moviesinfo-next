import Images from '../../components/details/images';
import Backdrop from '../../components/details/backdrop';
import Description from '../../components/details/description';
import Cast from '../../components/details/cast';
import Trailer from '../../components/details/trailer';



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      `Bearer ${process.env.TMDB_KEY}`,
  },
};
async function getMovieData(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?language=en-US`,
    options
  );
  return res.json();
}

async function getCredits(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}/credits`,
    options
  );
  return res.json();
}

async function getImages(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}/images`,
    options
  );

  return res.json();
}

async function getVideos(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}/videos`,
    options
  );

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const movieData = await getMovieData(params.id);
  const credits = await getCredits(params.id);
  const images = await getImages(params.id);
  const videos = await getVideos(params.id);
  const trailerUrl = videos.results.filter(({ type }) => type === 'Trailer')[0]?.key;
  return (
    <>
      <Backdrop movieData={movieData} type={'movie'} credits={credits} />

      <div className='mx-auto max-w-1366 justify-center'>
        <Description movieData={movieData} />
        <Images images={images} />
       { trailerUrl ? <Trailer trailerUrl={trailerUrl} /> : null}
        <Cast credits={credits} />

        
      </div>
    </>
  );
}
