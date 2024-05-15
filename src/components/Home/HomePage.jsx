import HeroSection from "./HeroSection";

import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

function HomePage() {
  return (
    <div>
      <HeroSection
        image={iphone}
        title="Iphone 14 Pro"
        subtitle="Iphone"
        link="/products/663b889ab908f3811027896a"
      />
      <FeaturedProducts />
      <HeroSection
        image={mac}
        title="MacBook"
        subtitle="Macbook"
        link="/products/663b889ab908f38110278972"
      />
    </div>
  );
}

export default HomePage;
