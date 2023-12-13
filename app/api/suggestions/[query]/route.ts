import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { query: string }}) {
  const query = params.query;
  console.log(query);
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
  //console.log(res.json());
  return NextResponse.json(res);
}
