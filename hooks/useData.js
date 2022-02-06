//libraries
import useSWR from "swr";

//utils
import { fetcher } from "../utils/fetcher";

const baseUrl = "https://jsonplaceholder.typicode.com";

export default function useData(url, fetchedData) {
  if (!url) throw new Error("You need to provide me with a link!");

  const { data, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  return { data, error, loading };
}
