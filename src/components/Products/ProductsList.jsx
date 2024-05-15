import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../Hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";

function ProductsList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const category = search.get("category");
  const searchQuery = search.get("search");

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: { search: searchQuery, category, page },
    },
    [searchQuery, category, page]
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: +currentParams.page + 1 });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isLoading]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [data, sortBy]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data &&
          sortedProducts.map((product) => (
            <ProductCard
              image={product.images[0]}
              price={product.price}
              reviews={product.reviews}
              stock={product.stock}
              title={product.title}
              id={product._id}
              key={product._id}
              rating={product.reviews.rate}
              reviewCounts={product.reviews.counts}
              product={product}
            />
          ))}
        {isLoading &&
          skeletons.map((item) => <ProductCardSkeleton key={item} />)}
      </div>
      {/* <Pagination
        totalPosts={data?.totalProducts}
        postsPerPage={data?.postPerPage}
        onClick={handlePageChange}
        currentPage={page}
      /> */}
    </section>
  );
}

export default ProductsList;
