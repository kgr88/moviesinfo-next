'use server';
export default async function getTrending(type: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/week?language=en-US&page1`,
    options
  );
  return res.json();
}
