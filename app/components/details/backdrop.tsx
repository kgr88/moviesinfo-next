import MovieHeader from './movie-header';
export default function Backdrop(props: {
  movieData: any;
  type: string;
  credits: any;
}) {
  return (
    <div
      className='flex h-80 bg-cover bg-center bg-no-repeat p-2 md:p-4 bg-blend-darken sm:h-96 md:h-600'
      style={{
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url("https://image.tmdb.org/t/p/original${props.movieData.backdrop_path}")`,
      }}
    >
      <MovieHeader movieData={props.movieData} type={'movie'} credits={props.credits} />
    </div>
  );
}
