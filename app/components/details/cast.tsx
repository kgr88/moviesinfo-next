import Image from 'next/image';

export default function Cast(props: { credits: any }) {
  const cast = props.credits.cast.filter(
    ({ known_for_department }) => known_for_department === 'Acting'
  );

  return (
    <div className='bg-surface1 shadow-outer rounded-2xl py-4 px-2 md:px-10 mx-2 md:mx-4 mt-4'>
      <p className='text-3xl font-bold'>CAST:</p>  
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className=' flex flex-row gap-2'>
            <Image
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              width={64}
              height={64}
              className='max-w-[48px] rounded-full [clip-path:circle(40%)]'
            />
            <br />
            <div className='self-center'>
            <p className='text-xs lg:text-lg font-bold'>{actor.name}</p>
            <p className='text-xs lg:text-base'>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
