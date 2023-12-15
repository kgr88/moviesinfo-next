import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SearchInput from './form-input';
import getTrending from '../utils/getTrending';
import orderBy from 'lodash/orderBy';

const movieGenres = {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}

const tvGenres = {
    "genres": [
      {
        "id": 10759,
        "name": "Action & Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 10762,
        "name": "Kids"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10763,
        "name": "News"
      },
      {
        "id": 10764,
        "name": "Reality"
      },
      {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
      },
      {
        "id": 10766,
        "name": "Soap"
      },
      {
        "id": 10767,
        "name": "Talk"
      },
      {
        "id": 10768,
        "name": "War & Politics"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
  }

async function create(formData: FormData) {
  'use server';
  const query = formData.get('query');
  revalidatePath('/');
  redirect(`/search/?query=${query}`);
}

function mapGenres(genreIds: number[], genresMap:any){
  if(genreIds.length === 0){
    return null;
  }

  return genreIds.map((id: number) => {
    const genre = genresMap.find((item: any) => item.id === id);
    return genre ? genre.name: null;
  })
}

async function formatTrending(){
  const data = await getTrending();
  const trending = data.results;
  const sortedTrending = orderBy(trending, 'popularity', 'desc');
  const names = sortedTrending.map((item: any) => ({
    name: item.title || item.name,
    description: item.overview || null,
    type: item.media_type,
    genres: item.media_type === 'movie' ? mapGenres(item.genre_ids, movieGenres.genres):
    item.media_type === 'tv' ? mapGenres(item.genre_ids, tvGenres.genres):
    null, 
  }));
  //console.log(names);
  return names;
}

export default async function Form() {
  const trendingWeekly = await formatTrending();
  return (
    <div className='h-30 w-full bg-[#202124]'>
      <form
        className='border-none flex w-full justify-center px-8 py-4 shadow-outer'
        action={create}
      >    
        <SearchInput searchList={trendingWeekly}/> 
        <button
          className=' focus:shadow-outline grid content-center rounded-full px-3 py-3 font-bold -ml-12 z-10 focus:outline-none z-[100]'
          type='submit'
          value='Submit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
            fill='#5f6368'
          >
            <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
          </svg>
        </button>
      </form>
    </div>
  );
}
