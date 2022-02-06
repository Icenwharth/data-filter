//libraries
import { useState, useEffect } from "react";

export default function usePaginatedData(data, pageNumber, divideInto) {
  if (!pageNumber) throw new Error("You must provide a page number");
  if (!Array.isArray(data)) throw new Error("Data must be an array");

  const [postsNumber, setPostsNumber] = useState(divideInto || 5);
  const [posts, setPosts] = useState(data || []);

  const currentPageNumber = pageNumber * postsNumber - postsNumber;
  const paginatedPosts = data.slice(
    currentPageNumber,
    currentPageNumber + postsNumber
  );
  const isLast =
    paginatedPosts[paginatedPosts.length - 1] === data[data.length - 1];

  if (!data) return [];

  return { paginatedPosts, isLast };
}
