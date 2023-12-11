import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SearchInput from './form-input';

async function create(formData: FormData) {
  'use server';
  const query = formData.get('query');
  revalidatePath('/');
  redirect(`/search/?query=${query}`);
}

export default function Form() {
  return (
    <div className='h-30 w-full bg-[#202124]'>
      <form
        className='border-none flex w-full justify-center px-8 py-4 shadow-outer'
        action={create}
      >
        {/*<input
          className='bg-surface-container-high w-1/5 appearance-none rounded-full px-3 py-2 leading-tight text-gray-700 shadow'
          type='search'
          id='query'
          name='query'
          placeholder="Search..."
  />*/}
        
        <SearchInput/>
        <button
          className=' focus:shadow-outline grid content-center rounded-full px-3 py-3 font-bold -ml-12 z-10 focus:outline-none'
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
