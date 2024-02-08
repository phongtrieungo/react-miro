"use client"

import qs from 'query-string';
import { Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  useEffect,
  useState
} from 'react';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debounceValue = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/',
      query: {
        search: debounceValue[0]
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debounceValue, router]);

  return (
    <section className='w-full relative'>
      <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input className='w-full max-w-[516px] pl-9' placeholder='Search board' onChange={handleChange} value={value} />
    </section>
  )
}