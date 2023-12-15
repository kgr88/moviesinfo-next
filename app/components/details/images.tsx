'use client';
import Image from 'next/image';
import { useEffect } from 'react';
export default function Images(props: { images:any }) {
  const scrollImages = (direction: string, slidesContainer: any) => {
    const slideWidth = slidesContainer.querySelector('.slide').clientWidth;
    const computedStyles = window.getComputedStyle(slidesContainer);
    const padding = parseInt(computedStyles.paddingTop, 10) - 24;
    console.log(padding);
    if (direction === 'next') {
      slidesContainer.scrollLeft += (slideWidth + padding);
    } else if (direction === 'prev') {
      slidesContainer.scrollLeft -= (slideWidth + padding);
    }
  };

  useEffect(() => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slidesContainer = document.querySelector('.slides-container');
    if (prevButton) {
      prevButton.addEventListener('click', () =>
        scrollImages('prev', slidesContainer)
      );
    }

    if (nextButton) {
      nextButton.addEventListener('click', () =>
        scrollImages('next', slidesContainer)
      );
    }
  }, []);
  if (props.images.backdrops.length < 3) return '';
  else
    return (
      <div className='relative mt-4 sm:m-4'>
        <div className='absolute right-2 flex h-full items-center'>
          <button
            role='button'
            className='next group rounded-full text-neutral-300 drop-shadow-xl'
            aria-label='next'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-10 w-10 drop-shadow-xl transition-all duration-200 ease-linear'
            >
              <path d='M8.25 4.5l7.5 7.5-7.5 7.5'></path>
            </svg>
          </button>
        </div>
        <div className='absolute left-2 flex h-full items-center'>
          <button
            role='button'
            className='prev group rounded-full text-neutral-300'
            aria-label='prev'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-10 w-10 transition-all duration-200 ease-linear group-active:-translate-x-2'
            >
              <path d='M15.75 19.5L8.25 12l7.5-7.5'></path>
            </svg>
          </button>
        </div>
        <div className='bg-surface1 slides-container shadow-outer flex snap-x snap-mandatory overflow-hidden overflow-x-auto scroll-smooth py-6 md:py-8 sm:rounded-2xl md:space-x-2'>
          {props.images.backdrops.slice(0, 5).map((image: any) => (
            <div
              key={image.file_path}
              className='slide flex-none basis-full md:basis-1/3 md:rounded-3xl'
            >
              <img
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt={image.id}
                className='md:rounded-3xl'
              />
            </div>
          ))}
        </div>
      </div>
    );
}
