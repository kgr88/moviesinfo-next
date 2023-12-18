import Image from 'next/image';
import Creators from './creators';

export default function MovieHeader(props: {
  movieData: any;
  type: string;
  credits: any;
}) {
  const hours = (props.movieData.runtime - (props.movieData.runtime % 60)) / 60;
  const minutes = props.movieData.runtime % 60;
  return (
    <>
      <div className='mx-auto mt-auto flex w-full max-w-1366 gap-x-2'>
        <div className='flex-initial self-center rounded-2xl shadow-xl md:self-auto'>
          <img
            src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`}
            alt={props.movieData.id}
            className=' max-w-1/3 rounded-2xl md:max-w-xs'
          />
        </div>
        <div className='flex flex-col '>
          <div className='m-0  flex flex-1 flex-col justify-end p-1'>
            <p className=' font-black text-[#EBE9A0] md:text-2xl'>
              {props.type.toUpperCase()}
            </p>
            <p className='text-xl/5 font-bold  md:text-6xl'>
              {props.movieData.title || props.movieData.name}
            </p>
            <p className=' font-light md:text-2xl'>
              {props.type == 'movie'
                ? `${hours}h ${minutes}m`
                : props.movieData.status}
            </p>
          </div>

          <div className='m-0 p-1 text-xs md:text-base'>
            <Creators
              credits={props.credits}
              releaseDate={props.movieData.release_date}
            />
          </div>
        </div>
      </div>
    </>
  );
}
