import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./PoductsSidebar.css";

import useData from "../../Hooks/useData";

function ProductsSidebar() {
  const { data: category, error } = useData("/category");
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}

        {category &&
          category.map((item) => (
            <LinkWithIcon
              title={item.name}
              link={`/products?category=${item.name}`}
              emoji={`http://localhost:5000/category/${item.image}`}
              sidebar={true}
              key={item._id}
            />
          ))}
      </div>
    </aside>
  );
}

export default ProductsSidebar;
