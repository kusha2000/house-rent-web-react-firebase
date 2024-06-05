import { useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import Spinner from "../components/Spinner"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y,EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import {getAuth} from "firebase/auth"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-fade";
import { useNavigate } from "react-router";

const Slider = () => {
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  SwiperCore.use([Autoplay,Navigation,Pagination])
  const navigate=useNavigate()
  useEffect(()=>{
    async function fetchListings(){
      const listingRef=collection(db,"listings")
      const q =query(listingRef,orderBy("timestamp","desc"),limit(5))
      const querySnap=await getDocs(q)
      let listings=[];
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings(listings)
      //console.log(listings);
      setLoading(false)

    }
    fetchListings()
  },[])

  if(loading){
    return <Spinner/>
  }
  if(listings.length === 0){
    return <></>
  }
  return listings && (
    <>
    {
        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y,EffectFade]}
        navigation
        slidesPerView={1} 
         pagination={{type:"progressbar"}} 
         effect='fade' 
         autoplay={{delay:3000}}
  
      >
        
  
          {listings.map(({data,id}) => (
            <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">Rs.{data.discountedPrice ?? data.regularPrice} {data.type==="rent" && " / month"}</p>
            </SwiperSlide>
          ))}
      </Swiper>
    }
    </>
  )
}

export default Slider