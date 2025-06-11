import { useLocation } from "wouter";

export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void] {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);

  const setSearchParams = (params: URLSearchParams) => {
    const newSearch = params.toString();
    const path = location.split('?')[0];
    setLocation(`${path}${newSearch ? `?${newSearch}` : ''}`);
  };

  return [searchParams, setSearchParams];
}
