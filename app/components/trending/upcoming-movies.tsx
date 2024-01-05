'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
export default function UpcomingMovies(props: { upcoming: any }) {
  const containerRef = useRef(null);
  const slideRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const slideLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className='relative mx-auto max-w-1366'>
      <div className='slides-container mx-2 p-1 flex gap-3 overflow-x-auto rounded-2xl scroll-smooth'
      ref={containerRef}>
        {props.upcoming.slice(0, 10).map((movie: any) => {
          return (
            <div key={movie.id} className='flex flex-shrink flex-col bg-surface1 rounded-xl shadow-outer2'>
              <Link href={`../movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  width={300}
                  height={450}
                  alt='missing'
                  className='min-w-[150px] rounded-xl sm:min-w-[175px] md:min-w-[200px]'
                />
              </Link>
              <p className='p-2 font-bold'>{movie.title}</p>
            </div>
          );
        })}
      </div>
      <button
        className='absolute left-4 top-[130px] hidden md:block'
        onClick={slideLeft}
      >
        <MdArrowBackIosNew
          size={40}
          className='mx-2 rounded-full bg-surface p-2'
        />
      </button>

      <button
        className='absolute right-4 hidden md:top-[130px] md:block'
        onClick={slideRight}
      >
        <MdArrowForwardIos
          size={40}
          className='mx-2 rounded-full bg-surface p-2'
        />
      </button>
    </div>
  );
}
