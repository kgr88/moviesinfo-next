import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

export default function Form2(props: { sidebarOpen: boolean, closeSidebar: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search/?query=${inputValue}`);
    props.closeSidebar();
  };

  return (
    <div className='relative w-full'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full justify-center border-none'
      >
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='h-full w-full appearance-none rounded-3xl border border-[#5f6368] bg-[#202124] p-3 px-6 leading-tight text-on-surface outline-none focus:border-0 focus:bg-[#303134] focus:shadow-outer2'
          placeholder='Search...'
        />
        <button type='submit' className='absolute right-5 self-center'><MdSearch size={20}/></button>
      </form>
    </div>
  );
}
