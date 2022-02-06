// libraries
import React, { useState, useEffect } from "react"
import cx from "classnames"

// components
import Button from "../button"

// styles
import styles from "./filter.module.css"

export default function Filter({
  possibleFilters,
  dispatch,
  filterState,
  setPageNumber
}) {
  const [choose, setChoose] = useState(false)

  useEffect(() => {
    setPageNumber(1)
  }, [filterState])

  const handlePriceChange = (e) => {
    dispatch({ type: "price", value: e.target.value, property: e.target.name })
  }
  return choose ? (
    <div className={styles.filterBox}>
      <section className={styles.section}>
        Colors:
        <div>
          {possibleFilters?.colors.map((color, i) => {
            const className = cx(styles.colorButton, {
              [styles.active]: filterState?.color?.includes(color)
            })
            return (
              <span key={color + i}>
                <Button
                  onClick={() =>
                    dispatch({
                      property: "color",
                      value: color,
                      type: filterState.color.includes(color) ? "remove" : "add"
                    })
                  }
                  customStyles={className}
                  text={color}
                />
              </span>
            )
          })}
        </div>
      </section>
      <section className={styles.section}>
        Categories:
        <div>
          {possibleFilters?.categories?.map((category, i) => {
            const className = cx(styles.categoryButton, {
              [styles.active]: filterState?.categories?.includes(category)
            })

            return (
              <span key={category + i}>
                <Button
                  onClick={() =>
                    dispatch({
                      property: "categories",
                      value: category,
                      type: filterState?.categories?.includes(category)
                        ? "remove"
                        : "add"
                    })
                  }
                  customStyles={className}
                  text={category}
                />
              </span>
            )
          })}
        </div>
      </section>
      <section className={styles.section}>
        <div>
          From:
          <input
            name="from"
            type="number"
            placeholder="price"
            onChange={handlePriceChange}
          />
          To:
          <input
            name="to"
            type="number"
            placeholder="price"
            onChange={handlePriceChange}
          />
        </div>
      </section>
    </div>
  ) : (
    <Button
      customStyles={styles.filterButton}
      text="Filter"
      onClick={() => setChoose(true)}
    />
  )
}
