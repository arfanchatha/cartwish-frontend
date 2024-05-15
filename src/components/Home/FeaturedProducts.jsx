import "./FeaturedProducts.css";
import ProductCard from "../../components/Products/ProductCard";
import useData from "../../Hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

function FeaturedProducts() {
  const { data, error, isLoading } = useData("products/featured");
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data.map((product) => (
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
    </section>
  );
}

export default FeaturedProducts;
