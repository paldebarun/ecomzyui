import React, { useState } from 'react'



const Profileinfo = () => {
   
   const [editname,seteditname]=useState(false);
   
   const [editemail,seteditemail]=useState(false);
   
   
   const [nameform,setnameform]=useState({
    firstname:"",
    lastname:"",
    gender:""
   });
    
   const  [emailform,setemailform]=useState({
    email:""
   })
   
   
   const handlenameonchange=(event)=>{
      const {name,value}=event.target;
   
      setnameform((prev)=>({
        ...prev,
        [name]:value
      }))
   
      console.log("name form : ",nameform);
   }
   
   const handleremailonchange=(event)=>{
    const {name,value}=event.target;
   
    setemailform((prev)=>({
      ...prev,
      [name]:value
    }))
   
    console.log("email form : ",emailform);
   }
   
   const namesubmithandler=()=>{
    console.log("this is name form : ",nameform);
  }

  const emailsubmithandler=()=>{
    console.log("this is email form : ",emailform);

  }

  return (
    <div className='p-[20px] shadow-lg w-full lg:scale-100 md:scale-95 sm:scale-90    h-full flex flex-col gap-[30px] sm:gap-[60px] bg-white '>
    <div className='flex flex-col gap-[20px] sm:gap-[50px]'>
    <div className='flex sm:flex-row flex-col  gap-[30px] md:gap-[30px] sm:items-center '>
    <div className='text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-xl'>Personal Information </div>
    {
      editname ? <div className='text-blue-500 text-[10px] xs:text-xs sm:text-sm md:text-lg hover:cursor-pointer' onClick={()=>{seteditname(false)}}>Cancel</div>:<div className='text-blue-500 text-[10px] xs:text-xs sm:text-sm md:text-lg hover:cursor-pointer' onClick={()=>{seteditname(true)}}>Edit</div>
    }
     
    </div>
     
     <div className='flex gap-[10px] md:flex-row flex-col lg:gap-[30px]'>

     {editname ?<input onChange={handlenameonchange} type="text" name="firstname" value={nameform.firstname} placeholder="First Name" className='border sm:w-7/12 md:w-[200px] lg:w-[250px] text-[10px] xs:text-xs md:text-md outline-none p-2 rounded-md'/>:<div className='md:w-[200px] lg:w-[250px] h-[40px] border rounded-md bg-slate-100 p-2 text-slate-400 flex justify-center'>
        dummy text
     </div>}

      {editname ?<input onChange={handlenameonchange} type="text" name="lastname" value={nameform.lastname} placeholder="Last Name" className='border sm:w-7/12 md:w-[200px] lg:w-[250px] text-[10px] xs:text-xs md:text-md outline-none p-2 rounded-md'/>:<div className='md:w-[200px] lg:w-[250px] h-[40px] border rounded-md bg-slate-100 text-slate-400 flex justify-center p-2'>dummy text</div>}

      {editname ?<div onClick={namesubmithandler} className=' p-2 w-[70px] text-[10px] md:text-sm  md:w-[100px] flex justify-center text-white hover:cursor-pointer bg-blue-500 rounded-md'>Save
      </div>:<div></div>}
     </div>
    {editname ? <div className='flex flex-col gap-[20px]'>
     <div className='text-[10px] xs:text-xs sm:text-sm'>Your Gender</div>
     
     <div className='flex gap-[10px] items-center' >
 
     <input type="radio" onChange={handlenameonchange}    id="male" name="gender" value="male" />
     <label for="male"  className='text-[10px] xs:text-xs sm:text-sm'>Male</label>
     <input type="radio" onChange={handlenameonchange}  id="female" name="gender" value="female"/>
     <label for="female" className='text-[10px] xs:text-xs sm:text-sm'>Female</label>
     </div>
     </div>:<div></div>}
      </div>

     <div className='flex flex-col gap-[20px]'>
     <div className='flex flex-col sm:flex-row gap-[20px] md:gap-[30px] sm:items-center'>
    <div className='text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-xl'>Email Address </div>
     {editemail?<div onClick={()=>{seteditemail(false)}} className='text-blue-500 text-[10px] xs:text-xs sm:text-sm md:text-lg hover:cursor-pointer'>Cancel</div>:<div onClick={()=>{seteditemail(true)}} className='text-blue-500 text-[10px] xs:text-xs sm:text-sm md:text-lg hover:cursor-pointer'>Edit</div>}
    </div>
     
     <div className='flex gap-[10px] flex-col md:flex-row md:gap-[30px]'>
     { editemail ?<input onChange={handleremailonchange} name="email" value={emailform.email} type="email" className='outline-none border sm:w-7/12 md:w-[200px] text-[10px] xs:text-xs md:text-md lg:w-[250px] p-2 rounded-md' placeholder="Email Adress" />:<div className='md:w-[200px] lg:w-[250px] h-[40px] border rounded-md bg-slate-100 p-2 text-slate-400 flex justify-center'>dummy text</div>
    }
    {editemail ?<div onClick={emailsubmithandler} className='p-2 w-[70px] text-[10px] md:text-sm  md:w-[100px] flex justify-center text-white bg-blue-500 hover:cursor-pointer rounded-md'>Save
      </div>:<div></div>}
     </div>
    
     </div>
    <div className='h-[100px] w-full'></div>
    </div>
  )
}


export default Profileinfo;
