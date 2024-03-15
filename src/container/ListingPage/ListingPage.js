import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListingPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import Loader from "../../components/Loader/Loader";

export default function ListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get("https://fakestoreapi.com/products");
      console.log({ data });
      setProducts(data);
      const { data: categories } = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategory(categories);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        if (selectedCategory) {
          return (
            product.category === selectedCategory &&
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        return product.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [products, search, selectedCategory]);

  const categoryHandler = (c) => {
    if (c === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(c);
    }
  };

  const selectToggler = (id) => {
    console.log({ id });
    if (id) {
      setSelectedProductId(id);
    } else {
      setSelectedProductId("");
    }
  };

  if (loading)
    return (
      <div className="Loader-backdrop">
        <Loader />
      </div>
    );

  return (
    <div className="ListingPage-container">
      <header className="ListingPage-header">
        <h3> Products </h3>
        <input
          type="text"
          placeholder="Search"
          className="ListingPage-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {category.length > 0 && (
          <div className="ListingPage-category">
            {category?.map((c) => (
              <p
                className={`ListingPage-category-item ${
                  selectedCategory === c ? "active-category" : ""
                }`}
                onClick={() => categoryHandler(c)}
              >
                {" "}
                {c}{" "}
              </p>
            ))}
          </div>
        )}
      </header>
      <main className="ListingPage-main">
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectToggler={selectToggler}
              />
            ))}
          </>
        ) : (
          <h3> No Products Matches :( </h3>
        )}
      </main>
      {selectedProductId && (
        <aside
          className="ProductModal-backdrop"
          onClick={() => selectToggler()}
        >
          <DetailsModal
            productId={selectedProductId}
            selectToggler={selectToggler}
          />
        </aside>
      )}
    </div>
  );
}
