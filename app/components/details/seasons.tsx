import Image from 'next/image';
export default function Seasons(props: { seasonData: any }) {
  return (
    <div className='mx-2 mt-4 rounded-2xl bg-surface1 p-4 lg:p-6 shadow-outer md:mx-4'>
      <p className='text-3xl font-bold mb-4'>SEASONS:</p>
      <div className='grid gap-4 md:grid-cols-2'>
        {props.seasonData.map((season: any) => {
          return (
            <div className='flex flex-auto rounded-2xl bg-surface2 shadow-outer2'>
              <div className='flex-0'>
                <Image
                  className='max-w-1/3 md:max-h-auto md:max-w-full rounded-2xl'
                  src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                  width={160}
                  height={240}
                />
              </div>
              <div className='m-2 md:m-4 mt-4 flex flex-1 flex-col justify-start'>
                <p className='text-2xl/4 font-bold'>{season.name}</p>
                <p className=' font-light'>
                  {season.episode_count} episode
                  {season.episode_count > 1 ? 's' : null}{' '}
                </p>
                <p className='text-base/4 font-light'>{season.air_date}</p>
                
                <div className='text-xs lg:text-base mt-2 line-clamp-[5] md:line-clamp-[6]'>{season.overview}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
