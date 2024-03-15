import React from "react";
import { Rating } from "react-simple-star-rating";
import "./ProductCard.css";

export default function ProductCard({ product, selectToggler }) {
  const { image, title, rating, price, id } = product;
  const { rate, count } = rating;
  return (
    <div className="ProductCard" key={id} onClick={() => selectToggler(id)}>
      <div className="ProductCard-image-container">
        <img src={image} alt={title} className="ProductCard-image" />
      </div>
      <p className="ProductCard-title">
        {title.length > 40 ? `${title.slice(0, 40)}...` : title}
      </p>
      <div className="ProductCard-rating-container">
        <Rating initialValue={rate} size={15} readonly />
        <span className="ProductCard-rating-count">({count})</span>
      </div>
      <h4 className="ProductCard-price">{`₹ ${price} /-`}</h4>
    </div>
  );
}
