import { removeFromCard, updateCard } from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
const CartItem = ({ data }) => {
  const p = data.attributes;
  const dispatch = useDispatch();
  const updateCartItems = (e, key) => {
let payload = {
  key,
  val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
  id: data.id,
};
dispatch(updateCard(payload))
  }

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* Image start  */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">
        <Image
          height={120}
          width={120}
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
        />
      </div>
      {/* Image end  */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product title  */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p.name}
          </div>
          {/* Product title  */}

          {/* product Subtitle  */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden ">
            {p.subtitle}
          </div>
          {/* product Subtitle  */}

          {/* product price  */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 ">
            MRP:&#8377;{p.price}
          </div>
          {/* product price  */}
        </div>
        {/* product Subtitle  */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block ">
          {p.subtitle}
        </div>
        {/* product Subtitle  */}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold"> Size:</div>
              <select
                                className="hover:text-black"
                                onChange={(e) =>
                                    updateCartItems(e, "selectedSize")
                                }
                            >
                                {p.size.data.map((item, i) => {
                                    return (
                                        <option
                                            key={i}
                                            value={item.size}
                                            disabled={
                                                !item.enabled ? true : false
                                            }
                                            selected={
                                                data.selectedSize === item.size
                                            }
                                        >
                                            {item.size}
                                        </option>
                                    );
                                })}
                            </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select className="hover:text-black"
              onChange={(e)=>updateCartItems(e, "quantity")}>
                {Array.from({length:10}, (_, i) => i + 1).map((q,i)=>{
                  return(

                    <option
                     key={i}
                      value={q}
                      selected={data.quantity === q}
                      >{q}</option>
                  )
                })}
                
              </select>
            </div>
          </div>
          <RiDeleteBin6Line 
          onClick={()=> dispatch(removeFromCard({id: data.id}))}
          className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
