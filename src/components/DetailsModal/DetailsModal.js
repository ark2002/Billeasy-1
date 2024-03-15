import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import Loader from "../Loader/Loader";
import "./DetailsModal.css";

export default function DetailsModal({ productId, selectToggler }) {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { title, description, image, rating = {}, price } = productDetails;
  const { rate, count } = rating;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      console.log({ data });
      setProductDetails(data);
      setLoading(false);
    })();
  }, [productId]);

  return (
    <main className="DetailsModal" onClick={(e) => e.stopPropagation()}>
      {loading ? (
        <div className="Loader-backdrop">
          <Loader />
        </div>
      ) : (
        <>
          <span className="DetailsModal-close" onClick={() => selectToggler()}>
            X
          </span>
          <img src={image} alt={title} className="DetailsModal-image" />
          <aside className="DetailsModal-details">
            <h2 className="DetailsModal-title">{title}</h2>
            <div className="DetailsModal-rating-container">
              <Rating initialValue={rate} size={30} readonly />
              <span className="DetailsModal-rating-count">({count})</span>
            </div>
            <h3 className="DetailsModal-price">{`₹ ${price} /-`}</h3>
            <p className="DetailsModal-desc">{description}</p>
            <footer className="DetailsModal-options">
              <button className="DetailsModal-Btn cart">Add to cart</button>
              <button className="DetailsModal-Btn buy">Buy Now</button>
            </footer>
          </aside>
        </>
      )}
    </main>
  );
}
