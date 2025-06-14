import { useRouter, useSearchParams } from 'next/navigation';

export function useUrlParam<T extends string>(key: string, defaultValue?: T) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = searchParams.get(key) ?? defaultValue ?? null;

  const setValue = (newValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValue === null) {
      params.delete(key);
    } else {
      params.set(key, newValue);
    }

    const query = params.toString();
    const url = query ? `?${query}` : '';
    router.replace(url, { scroll: false });
  };

  return [value, setValue] as const;
}
