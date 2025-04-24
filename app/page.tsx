"use client"
import { createClient } from "@/utils/supabase/client";
import {useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { boolean } from "zod";


interface addfile{
  id: number, 
  task: string, 
  status: boolean
}
const MainPage = () => {
  const router = useRouter()
  
  const [addtaks, setAddtaks] = useState<addfile[]>()
  const [uploadtaks, setUploadTaks] = useState("")

const datas= {
  id: Number,
  task: uploadtaks,
  status: boolean
}
useEffect(()=>{
  shoscreen()

},[])

const updateTask = async(id: number, status: boolean)=> {
 const supabase = await createClient() 
 const {data, error} = await supabase.from("tasks").update({status: !status}).eq("id", id)
 if(data){
  setAddtaks(data)
 }else{
  console.log("something went wrong", error)
 }
}
const deleteTask = async(id:number)=>{
  const supabase = await createClient()
  const {data, error} = await supabase.from("tasks").delete().eq("id", id)
  if(error){
    console.log("something went wrong",error)
  }
  if(data){
    setAddtaks(data)
  }
}
const shoscreen= async()=>{
  const supabase = createClient()
  const {data, error} = await supabase.from("tasks").select("*")

  
  if(error){
    console.log("Sorry, something went wrong", error)
  }else{
    setAddtaks(data ); await shoscreen()
    router.refresh()
  }
}
  const onSubmit =  async()=>{
    
    const supabase = await createClient()
    const {data, error} = await supabase.from("tasks").insert(datas)
    if(data){
      setAddtaks(data)
      setUploadTaks(" ")
    }else if (error){
      console.log("something went wrong", error)
    }

  }
  return (  
    <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-2xl font-bold capitalize">Just add it!</h1>
    <div className="flex w-full items-center justify-center space-x-2.5">
      <button onClick={onSubmit} className="cursor-pointer bg-rose-700 p-3 rounded hover:bg-rose-900 font-semibold text-pretty">Enter task </button>
      <input type="task" value={uploadtaks} onChange={(e)=>setUploadTaks(e.target.value)} placeholder="Enter text here" className="w-[16rem] p-3 rounded border"/>
    </div>
    {addtaks?.map((file)=>(
      <div key={file.id} className="flex gap-2 space-x-3 w-62 ">
        <button onClick={()=>deleteTask( file.id)} className="bg-red-900 p-2 text-sm rounded text-white">deleteTask</button>
      <h1> {file.task}</h1>  
        <button onClick={()=>updateTask(file.id, file.status)} className="p-2 border cursor-pointer rounded pr-4 text-white w-10 ">{file.status ? ( <>done</>):(<>not done</>)}</button>
      
      </div>
    ))}
    </div>
  );  
}
 
export default MainPage;  