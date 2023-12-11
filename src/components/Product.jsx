import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {removeFromCartAsync,addToCartAsync} from "../redux/Slices/CartSlice";

const Product = ({post,setincart,user_id}) => {

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();


const addToCart = async (event) => {
    event.stopPropagation();

    try {
      dispatch(addToCartAsync(post,post._id, user_id));
      setincart(true);
      toast.success("Item added to Cart");
      console.log("this is cart : ",cart);
    }
    catch (error) {

      console.error("Error adding to cart:", error.message);

    }
  };


const removeFromCart = async (event) => {
    event.stopPropagation();
    
    try {
     console.log("this is product id ",post._id);
      dispatch(removeFromCartAsync(post._id, user_id));
      setincart(false);
      toast.error("Item removed from Cart");
      console.log("this is cart : ",cart);
    }
    catch (error) {

      console.error("Error removing from cart:", error.message);

    }
  };
  
  
  
  

  return (
    <div className="flex w-[300px] sm:w-[400px] h-[400px] flex-col items-center hover:cursor-pointer justify-between 
    hover:scale-110  transition duration-300 ease-in gap-3 p-4 mt-10 mx-auto rounded-xl outline">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{post.description.split(" ").slice(0,10).join(" ") + "..."}</p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} className="h-full w-full " />
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${post.price}</p>
        </div>
        
        {
          cart.some((p) => p._id === post._id) ?
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
          onClick={removeFromCart}>
            Remove Item
          </button>) 
          :

          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
          onClick={addToCart}>
            Add to Cart
          </button>)
        }
      </div>
    </div>
  );
};

export default Product;
