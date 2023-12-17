import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useUser } from "@clerk/clerk-react";


const Profileinfo = () => {
   
   const [editname,seteditname]=useState(false);
   
   const [editemail,seteditemail]=useState(false);

   const [firstname,setfirstname]=useState('');
   const [lastname,setlastname]=useState('');
   const [email,setemail]=useState('');
  
   
   const {user}=useUser();
   
   const [nameform,setnameform]=useState({
    firstname:"",
    lastname:"",
    gender:""
   });
    
   const  [emailform,setemailform]=useState({
    email:""
   })
   
   useEffect(() => {
     
     const getprofiledata=async ()=>{
        
      try {
        const response = await axios.post('https://ecomzyserver4.onrender.com/api/v1/getprofileinfonames', { user: user.id });

        const response_=await axios.post('https://ecomzyserver4.onrender.com/api/v1/getemaildata',{user:user.id});

        console.log("this is response : ", response.data.profileInfo);
        setemail(response_.data.emailData.email)
        setfirstname(response.data.profileInfo.firstName);
        setlastname(response.data.profileInfo.lastName);
        
        
        setnameform({
          firstname:"",
    lastname:"",
    gender:response.data.profileInfo.gender
        })

        
     } catch (error) {
        console.error("Error fetching data:", error);
     }
     }

     


     getprofiledata();
   }, []);


   const submitNames=async ()=>{
    try{
      
      const obj={
       user:user.id,
       firstName:nameform.firstname,
       lastName:nameform.lastname,
       gender:nameform.gender
      }

     const response=await axios.post('https://ecomzyserver4.onrender.com/api/v1/saveprofileinfoname',obj);

     console.log("this is response : ",response);

     setfirstname(nameform.firstname);
     setlastname(nameform.lastname);

     seteditname(false);


    }
    catch(error){

      console.error("Error submitting names:", error);

    }

   }
   
   
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
   
   

  const emailsubmithandler= async()=>{
    
    try{
      
      const obj={
        user:user.id,
        email:emailform.email

       }
 
      const response=await axios.post('https://ecomzyserver4.onrender.com/api/v1/submitemail',obj);
 
      console.log("this is response : ",response);
 
      setemail(emailform.email)
 
      seteditemail(false);
       
    }
    catch(error){
      console.error("Error submitting names:", error);
    }

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
        {firstname}
     </div>}

      {editname ?<input onChange={handlenameonchange} type="text" name="lastname" value={nameform.lastname} placeholder="Last Name" className='border sm:w-7/12 md:w-[200px] lg:w-[250px] text-[10px] xs:text-xs md:text-md outline-none p-2 rounded-md'/>:<div className='md:w-[200px] lg:w-[250px] h-[40px] border rounded-md bg-slate-100 text-slate-400 flex justify-center p-2'>{lastname}</div>}

      {editname ?<div onClick={submitNames} className=' p-2 w-[70px] text-[10px] md:text-sm  md:w-[100px] flex justify-center text-white hover:cursor-pointer bg-blue-500 rounded-md'>Save
      </div>:<div></div>}
     </div>
    {editname ? <div className='flex flex-col gap-[20px]'>
     <div className='text-[10px] xs:text-xs sm:text-sm'>Your Gender</div>
     
     <div className='flex gap-[10px] items-center' >
 
     <input type="radio" onChange={handlenameonchange} checked={nameform.gender === "male"}   id="male" name="gender" value="male" />
     <label for="male"  className='text-[10px] xs:text-xs sm:text-sm'>Male</label>
     <input type="radio" onChange={handlenameonchange}  checked={nameform.gender === "female"}  id="female" name="gender" value="female"/>
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
     { editemail ?<input onChange={handleremailonchange} name="email" value={emailform.email} type="email" className='outline-none border sm:w-7/12 md:w-[200px] text-[10px] xs:text-xs md:text-md lg:w-[250px] p-2 rounded-md' placeholder="Email Adress" />:<div className='md:w-[200px] lg:w-[250px] h-[40px] border rounded-md bg-slate-100 p-2 text-slate-400 flex justify-center'>{email}</div>
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
