'use client';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import mapGenres from '@/app/utils/map-genres';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function TrendingMovies(props: { trending: any }) {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNextMovie = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
      setCurrentSlide((prev) => Math.min(prev + 1, props.trending.length - 1));
    }
  };

  const handlePreviousMovie = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className='relative mx-auto max-w-[100rem]'>
      <div
        className='relative slides-container m-4 mx-auto flex h-600 w-full max-w-[100rem] snap-x flex-row justify-start overflow-x-scroll scroll-smooth md:rounded-2xl'
        ref={containerRef}
      >
        {props.trending.map((movie: any, index: number) => (
          <div
            key={index}
            className='flex min-w-full flex-col justify-end gap-4 bg-cover bg-center bg-no-repeat px-4 bg-blend-darken sm:px-6 md:justify-center'
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
              ),url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
            }}
          >
            <p className='px-2 text-3xl font-bold  sm:max-w-[75%] sm:px-0 sm:text-4xl md:max-w-[50%] md:text-6xl'>
              {movie.title}
            </p>
            <div className='flex flex-wrap gap-2'>
              {mapGenres(movie.genre_ids, 'movie')?.map((genre: string) => {
                return (
                  <div className='rounded-full bg-surface1 p-1 px-4 shadow-outer2'>
                    {genre}
                  </div>
                );
              })}
            </div>
            <p className='max-w-[60ch]'>{movie.overview}</p>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <button onClick={handlePreviousMovie} className=' left-0 top-1/2'>
          <MdArrowBackIosNew size={30} />
        </button>
        <div className=' items-center flex space-x-2'>
        {props.trending.map((_, index: number) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
        <button onClick={handleNextMovie} className=' right-0 top-1/2'>
          <MdArrowForwardIos size={30} />
        </button>
        
      </div>
    </div>
  );
}
