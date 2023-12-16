import Image from 'next/image';
async function getProviders(id: string, type:string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
    options
  );
  return res.json();
}

export default async function Providers(props: { movieData: any, mediaType: string }) {
  const providers = await getProviders(props.movieData['id'], props.mediaType);

  if (providers.results.PL?.flatrate === undefined) {
    return <p>Not available right now</p>;
  } else {
    const availableProviders = providers.results.PL.flatrate;
    return (
      <div className='mt-2 grid grid-cols-2 gap-2'>
        {availableProviders.map((provider: any) => (
          <div id={provider.provider_id} className='col-span-1 flex gap-x-2'>
            <Image
              src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`}
              width={45}
              height={45}
              className='max-h-[45px] max-w-[45px] rounded-lg'
              alt='logo'
            />
            <p className='self-center truncate '>{provider.provider_name}</p>
          </div>
        ))}
      </div>
    );
  }
}
