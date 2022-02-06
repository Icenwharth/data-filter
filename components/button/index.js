// libraries
import React from "react"
import cx from "classnames"

// styles
import styles from "./button.module.css"

export default function Button({ text, onClick, type, customStyles }) {
  const className = cx(styles.button, {
    [styles.positive]: type === "positive",
    [styles.negative]: type === "negative"
  })

  return (
    <button className={customStyles ?? className} onClick={onClick}>
      {text}
    </button>
  )
}
