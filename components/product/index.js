// libraries
import React from "react"
import cx from "classnames"

// components
import Image from "next/image"

// styles
import styles from "./product.module.css"

export default function Product({ post, key }) {
  const imgSrc = `https:${post.thumbnailImage.file.url}`

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImageContainer}>
        <Image
          className={styles.imageStyle}
          src={imgSrc}
          alt={`photo-${post.name}`}
          placeholder={"blur"}
          blurDataURL="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image-300x225.png"
          layout="fill"
          key={imgSrc}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{post.name}</div>
        <span>€{post?.shopifyProductEu?.variants?.edges[0]?.node?.price}</span>
      </div>
      <small className={styles.categoryTags}>
        {post?.categoryTags?.map((cat, i) => (
          <div className={styles.tag} key={i}>
            {cat}
          </div>
        ))}
      </small>
      <small className={styles.colorFamily}>
        {post?.colorFamily?.map((fam, i) => {
          const className = cx(styles.family, {
            [styles[fam?.name?.toLowerCase()]]: !!fam.name
          })
          return (
            <div className={className} key={i}>
              {fam.name}
            </div>
          )
        })}
      </small>
    </div>
  )
}
