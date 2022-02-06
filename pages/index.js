// libraries
import React, { useState, useMemo, useReducer } from "react"
import { TailSpin } from "react-loader-spinner"
// hooks
import useData from "../hooks/useData"
import usePaginatedData from "../hooks/usePaginatedData"

// styles
import styles from "../styles/Home.module.css"

// components
import ProductGrid from "../components/productGrid"
import Filter from "../components/filter"

const backendLink = "backend/miista-export.json"

const initialFilterState = {
  color: [],
  categories: [],
  price: { from: "", to: "" }
}

function filterReducer(state, filter) {
  const property = filter.property
  const value = filter.value
  const type = filter.type

  switch (type) {
    case "add":
      return { ...state, [property]: [...state[property], value] }
    case "remove":
      return {
        ...state,
        [property]: state[property].filter((el) => el !== value)
      }
    case "price":
      return {
        ...state,
        price: { ...state.price, [property]: parseFloat(value) }
      }
    default:
      throw new Error("Invalid type")
  }
}

function filterData(filterState, data) {
  if (!filterState || !data) return []

  function moreThanFrom(from, price) {
    if (isNaN(price)) throw new Error("Price should be a number")
    if (isNaN(from) || typeof from === "string") return true
    return price > from
  }

  function lessThanTo(to, price) {
    if (isNaN(price)) throw new Error("Price should be a number")
    if (isNaN(to) || typeof to === "string") return true
    return price < to
  }

  const filteredByColor =
    filterState?.color?.length === 0
      ? data
      : data.filter((el) =>
          el?.node?.colorFamily?.some((fam) =>
            filterState?.color?.includes(fam.name)
          )
        )

  const filteredByCategory =
    filterState?.categories?.length === 0
      ? filteredByColor
      : filteredByColor.filter((el) =>
          el?.node?.categoryTags?.some((cat) =>
            filterState?.categories?.includes(cat)
          )
        )

  const filterPriceFrom = filteredByCategory.filter((el) =>
    moreThanFrom(
      filterState?.price?.from,
      parseFloat(el?.node?.shopifyProductEu?.variants?.edges[0]?.node?.price)
    )
  )

  const filterPriceTo = filterPriceFrom.filter((el) =>
    lessThanTo(
      filterState?.price?.to,
      parseFloat(el?.node?.shopifyProductEu?.variants?.edges[0]?.node?.price)
    )
  )

  const filtered = filterPriceTo
  return filtered
}

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, error, loading } = useData(backendLink)
  const dataArray = data?.data?.allContentfulProductPage?.edges

  const possibleFilters = useMemo(() => {
    if (!dataArray) return {}

    const uniqueColors = []
    dataArray.forEach((el) => {
      el?.node?.colorFamily?.forEach(
        (color) =>
          !uniqueColors.includes(color.name) && uniqueColors.push(color.name)
      )
    })

    const uniqueCategories = []
    dataArray.forEach((el) => {
      el?.node?.categoryTags?.forEach(
        (category) =>
          !uniqueCategories.includes(category) &&
          uniqueCategories.push(category)
      )
    })

    return { colors: uniqueColors, categories: uniqueCategories }
  }, [dataArray])

  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState)
  const filtered = filterData(filterState, dataArray)
  const { paginatedPosts, isLast } = usePaginatedData(filtered, pageNumber, 6)

  const handlePrev = () => {
    if (pageNumber === 1) return
    setPageNumber(pageNumber - 1)
  }

  const handleNext = () => {
    if (isLast) return
    setPageNumber(pageNumber + 1)
  }
  if (error) throw new Error(error)
  return (
    <div className={styles.container}>
      <Filter
        possibleFilters={possibleFilters}
        filterState={filterState}
        dispatch={dispatch}
        setPageNumber={setPageNumber}
      />
      {loading ? (
        <TailSpin color="#00BFFF" height={80} width={80} />
      ) : (
        <ProductGrid
          paginatedPosts={paginatedPosts}
          handleNext={handleNext}
          handlePrev={handlePrev}
          pageNumber={pageNumber}
        />
      )}
    </div>
  )
}
