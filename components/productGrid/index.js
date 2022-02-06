// libraries
import React from "react"

// components
import Product from "../product"
import Button from "../button"

// styles
import styles from "./productGrid.module.css"

export default function ProductGrid({
  paginatedPosts,
  handleNext,
  handlePrev,
  pageNumber
}) {
  return (
    <>
      <div className={styles.gridContainer}>
        {paginatedPosts.map((post, i) => (
          <div className={styles.gridElement} key={`${i}-${post.name}`}>
            <Product post={post.node} />
          </div>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button text={"Previous Page"} onClick={handlePrev} type={"positive"} />
        {pageNumber}
        <Button text={"Next Page"} onClick={handleNext} type={"negative"} />
      </div>
    </>
  )
}
