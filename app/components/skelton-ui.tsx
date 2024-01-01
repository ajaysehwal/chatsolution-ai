import { Skeleton } from "@/components/ui/skeleton"

import React from 'react'

export function SkeletonUI() {
  return (
    <>

      <div className="flex flex-col w-[100%] m-auto lg:flex-row h-[100vh] align-middle gap-3">
         <div className="lg:w-1/6 hidden lg:flex md:hidden sm:hidden w-1/6 h-[100vh] m-auto pt-[22px] flex-col gap-3 px-3" >
        
         <Skeleton className="w-full h-[40px]  bg-gray-400" />
         <div className="flex flex-col  gap-3">
       
         
         <Skeleton   className="w-full h-[75vh]  bg-gray-400"/>
        
         
          </div>
           <div className="flex align-middle justify-center gap-1">
            <Skeleton className="w-12 h-12 rounded-full bg-gray-400"/>
           <Skeleton className="w-[70%] h-[50px]  bg-gray-400" />

           </div>


         </div>
         <div className="w-[95%] h-[100vh] m-auto pt-3">
         <Skeleton className="block lg:hidden sm:block md:block m-auto h-[45px] bg-gray-400" />
         <Skeleton className="flex-1 p-5 w-[97%] m-auto h-[80vh] bg-gray-400 mt-3" />
         <Skeleton className="flex-1 p-5  m-auto w-[97%] h-[45px] bg-gray-400 mt-5" />

         </div>
      </div>
    
    
    </>
  )
}
