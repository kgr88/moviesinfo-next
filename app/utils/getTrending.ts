'use server'
export default async function getTrending() {
  //console.log(query);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?language=en-US&page1`,
    options
  );
  return res.json();
}
