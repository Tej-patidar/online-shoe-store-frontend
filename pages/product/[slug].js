import ProductDetailCarousel from "@/components/ProductDetailCarousel";
import RelatedProducts from "@/components/RelaedPoducts";
import RelaedPoducts from "@/components/RelaedPoducts";
import Wrapper from "@/components/Wrapper";
import { addToCart } from "@/store/cartSlice";
import { FetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0]?.attributes;
  const notify =()=>{
    toast.success('Success .. Check your Cart', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <div>
      <div className="w-full md:py-20">
        <ToastContainer/>
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
            {/* left column start  */}
            <div className="w-full md:w-auto flex-[1,5] max-w-[500px] lg:max-w-[900px] mx-auto lg:mx-0">
              <ProductDetailCarousel images={p.image.data} />
            </div>
            {/* left column end  */}

            {/* Right Column start  */}
            <div className="flex-[1] py-3 ">
              {/* product title  */}
              <div className="text-[29px] font-semibold mb-2 w-[300px] leading-tight">
                {p.name}
              </div>

              {/* product subtitle  */}
              <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

              {/* [product Price] */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">
                  MRP:&#8377;{p.price}
                </p>
                {p.original_price && (
                  <>
                    <p className="text-base font-medium line-through">
                      &#8377;{p.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(p.original_price, p.price)}%
                      off
                    </p>
                  </>
                )}
              </div>
              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all Applicable Duties)`}
              </div>
              {/* product size range start */}
              <div className="mb-10">
                {/* heading start  */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Select Guide
                  </div>
                </div>
                {/* heading end  */}
                {/* size start  */}
                <div  id="sizesGrid" className="grid grid-cols-3 gap-2">
                  {p.size.data.map((item, i) => (
                    <div
                      key={i}
                      className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer${
                        item.enabled
                          ? "hover:border-black cursor-pointer"
                          : "cursor-not-allowed bg-black/[0.1] opacity-50"
                      }
                      ${
                        selectedSize === item.size
                            ? "border-black"
                            : ""
                    }`}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>

                {/* size end  */}

                {/* show error start */}
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size Selection Is Required
                  </div>
                )}
              </div>

              {/* product size range end  */}
              {/* Add To Cart Button Start  */}
              <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={()=>{
                if(!selectedSize){
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                }else{

                  dispatch(addToCart({
                    ...product?.data?.[0],
                    selectedSize,
                    oneQuantityPrice: p.price
                  }))
                  notify()
                }
               
              }}>
                Add TO Cart
              </button>
              {/* Add To Cart Button End  */}

              {/* add to whishlist button Start */}
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist <IoMdHeartEmpty size={20} />
              </button>
              {/* add to whishlist button end */}
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="text-md mb-5">
                  Feel unbeatable from the tee box to the fine put in a design
                  that's pure early MJ: speed, class and laden with true early
                  90's touches like visible Air and a translucent rubber sole
                  thats continue to stand to test of time . This model fuses the
                  strut of 1st MJ's championship with some of our best golf
                  technology , helping you make a statement of confidence when
                  it comes time to tame the course .
                </div>
              </div>
            </div>
            {/* Right Column End  */}
          </div>
          <RelatedProducts  products={products}/>
        </Wrapper>
      </div>
    </div>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  const products = await FetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await FetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await FetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
