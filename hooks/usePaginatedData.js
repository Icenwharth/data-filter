export default function usePaginatedData(data, pageNumber, divideInto) {
  if (!pageNumber) throw new Error("You must provide a page number")
  if (!Array.isArray(data)) throw new Error("Data must be an array")

  const postsNumber = divideInto || 5

  const currentPageNumber = pageNumber * postsNumber - postsNumber
  const paginatedPosts = data.slice(
    currentPageNumber,
    currentPageNumber + postsNumber
  )
  const isLast =
    paginatedPosts[paginatedPosts.length - 1] === data[data.length - 1]

  if (!data) return []

  return { paginatedPosts, isLast }
}
