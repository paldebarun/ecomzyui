import React from 'react';

const Orderpage = ({ orders }) => {

   console.log("orders",orders);

  return (
    <div className='h-[500px] w-auto overflow-y-scroll'>
      {
        orders.length === 0 ? 
        <div> No items to show</div> :
        (
          <div className='flex flex-col gap-[50px] w-full items-center'>
            
            {orders.map((order, index) => (
              <div className='border border-stone-700 rounded-xl p-5' key={index}>
              <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{order.title}</p>
              <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{order.description.split(" ").slice(0,10).join(" ") + "..."}</p>
              <div className='w-[200px] sm:w-[300px] md:w-[400px]'>
              <img src={order.image} className="h-full w-full " />
              </div>
              

              <div> arriving in 15 days</div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default Orderpage;
