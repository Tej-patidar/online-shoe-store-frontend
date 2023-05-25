import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { FetchDataFromApi } from "@/utils/api";
export default function Home({ products }) {
  return (
    <>
      <main>
        <HeroBanner />
        <Wrapper>
          {/* Heading & paragraph start */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Cushioning For Your Miles
            </div>
            <div className="text-md md:text-xl">
              A LightWeight Nike ZoomX midsole is Combined With increased stack
              heights to help provide Cushioning during extened stretches of
              Running.
            </div>
          </div>
          {/* heading  & paragraph end */}
          {/* products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>

          {/* products grid end  */}
        </Wrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const products = await FetchDataFromApi("/api/products?populate=*");

  return {
    props: { products },
  };
}
