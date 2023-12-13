import Image from 'next/image';
async function getData(query: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&page=1`,
    options
  );
  return res.json();
}

export default async function Results(props: any) {
  const searchParams = props.searchParams;
  const data = await getData(searchParams.query);
  console.log(typeof data);
  return (
    <div className='flex flex-wrap'>
      {data['results'].map((movie: any) => {
        return (
          <div
            key={movie.id}
            className=' mx-2 my-2 w-300 rounded-lg bg-gray-700 p-2'
          >
            <a href={`../${movie.media_type}/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie.poster_path ?? movie.profile_path
                }`}
                width={300}
                height={450}
                alt='missing'
              />
            </a>
            <br />
            <p>{movie.adult}</p>
            <p>{movie.name}</p>
            <p>{movie.release_date ?? movie.first_air_date}</p>
            <p>{movie.title}</p>
          </div>
        );
      })}
    </div>
  );
}
