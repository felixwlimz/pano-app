import { FooterBanner, HeroBanner } from "@/components";
import { client } from "@/lib/client";
import { Product } from "@/components";

const Home = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);


  return (
    <>
      <HeroBanner heroBanner={bannerData.length > 0 ? bannerData[0] : null} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product}/>
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );
};

export default Home;
