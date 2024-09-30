'use client';
import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext'

const ProductDetails = ({ params }) => {
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([])
  const [index, setIndex] = useState(0)

  const {decQty, incQty, qty, onAdd, setShowCart } = useStateContext()
  
  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
      const fetchedProduct = await client.fetch(query);
      setProduct(fetchedProduct);
    };

    const getAllProducts = async () => {
      const query = '*[_type == "product"]'
      const products = await client.fetch(query)
      setProducts(products)
    }

    fetchProduct();
    getAllProducts()
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  const { image, name, details, price } = product;

  return (
     <div>
      <div className="product-detail-container">
        <div className="image-container">
          <img src={urlFor(image[index])} alt={name} className='product-detail-image'/>
        
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details : </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                {qty}
              </span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
         <h2>You may also like</h2>
         <div className='marquee'>
           <div className='maylike-products-container'>
             {
              products.map(item => (
                <Product key={item._id} product={item} />
              ))
             }
           </div>
         </div>
      </div>
     </div>
  );
};

export default ProductDetails;
