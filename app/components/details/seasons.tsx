'use client';
import Image from 'next/image';
import { useCollapse } from 'react-collapsed';

function renderSeasons(seasonData: any) {
  return (
    <div className='grid gap-4 mt-4 md:grid-cols-2'>
      {seasonData.map((season: any, index: number) => {
        return (
          <div
            key={index}
            className='flex flex-auto rounded-2xl bg-surface2 shadow-outer2'
          >
            <div className='flex-0'>
              <Image
                className='md:max-h-auto max-w-1/3 rounded-2xl md:max-w-full'
                src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                width={160}
                height={240}
              />
            </div>
            <div className='m-2 mt-4 flex flex-1 flex-col justify-start md:m-4'>
              <p className='text-2xl/4 font-bold'>{season.name}</p>
              <p className=' font-light'>
                {season.episode_count} episode
                {season.episode_count > 1 ? 's' : null}{' '}
              </p>
              <p className='text-base/4 font-light'>{season.air_date}</p>
              <div className='mt-2 line-clamp-[5] text-xs md:line-clamp-[6] lg:text-base'>
                {season.overview}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Seasons(props: { seasonData: any }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
    easing: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
    duration: 1000,
  });

  return (
    <div className='mx-2 mt-4 rounded-2xl bg-surface1 p-4 shadow-outer md:mx-4 lg:p-6'>
      <p className='mb-4 text-3xl font-bold'>SEASONS:</p>
      {props.seasonData.length == 1
        ? renderSeasons(props.seasonData.slice(0, 1))
        : props.seasonData.length >= 2
          ? renderSeasons(props.seasonData.slice(0, 2))
          : null}
      <section {...getCollapseProps()}>
        {props.seasonData.length > 2
          ? renderSeasons(props.seasonData.slice(2))
          : null}
      </section>
      <button
        {...getToggleProps()}
        className={'mx-auto mt-4 block rounded-full bg-surface2 px-4 py-3 shadow-outer2 ' + (props.seasonData.length <= 2 ? 'hidden' : null)}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button> 
    </div>
  );
}
