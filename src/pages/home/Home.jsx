import React, { useEffect } from "react";
import Product from "../../components/product/Product";

// import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;
  const scrollToProduct = () => {
    if (url.includes("#product")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };
  useEffect(() => {
    scrollToProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <Slider /> */}
      <Product />
    </div>
  );
};

export default Home;
