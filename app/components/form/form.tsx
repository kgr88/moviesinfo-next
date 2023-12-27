import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SearchInput from './form-input';
import getTrending from '../../utils/get-trending';
import orderBy from 'lodash/orderBy';
import Link from 'next/link';
import mapGenres from '@/app/utils/map-genres';


async function create(formData: FormData) {
  'use server';
  const query = formData.get('query');
  revalidatePath('/');
  redirect(`/search/?query=${query}`);
}

async function formatTrending(){
  const data = await getTrending('all');
  const trending = data.results;
  const sortedTrending = orderBy(trending, 'popularity', 'desc');
  const names = sortedTrending.map((item: any) => ({
    name: item.title || item.name,
    description: item.overview || null,
    type: item.media_type,
    genres: item.media_type === 'movie' ? mapGenres(item.genre_ids, 'movie'):
    item.media_type === 'tv' ? mapGenres(item.genre_ids, 'tv'):
    null, 
  }));
  return names;
}

export default async function Form() {
  const trendingWeekly = await formatTrending();
  return (
    <div className='h-30 w-full bg-[#202124] justfy-start flex'>
      <Link href='/'> Home </Link>
      <form
        className='border-none flex w-full justify-center px-8 py-4 shadow-outer'
        action={create}
        id='search'
      >    
        <SearchInput searchList={trendingWeekly}/> 
        <button
          className=' focus:shadow-outline grid content-center rounded-full px-3 py-3 font-bold -ml-12 focus:outline-none z-[100]'
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
