import Image from 'next/image';
import Creators from './creators';
let parseText = function (text: string, limit: number) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === ' ' &&
        (text.charAt(i - 1) != ',' ||
          text.charAt(i - 1) != '.' ||
          text.charAt(i - 1) != ';')
      ) {
        return text.substring(0, i) + '...';
      }
    }
    return text.substring(0, limit) + '...';
  } else return text;
};

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
        <div className='flex-initial self-center rounded-2xl md:self-auto shadow-xl'>
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
            <p className='text-xl/5 md:text-6xl  font-bold'>
              {parseText(props.movieData.title, 100)}
            </p>
            <p className=' md:text-2xl font-light'>
              {hours}h {minutes}m
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
