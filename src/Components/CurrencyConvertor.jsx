import { IoMdSwap } from "react-icons/io";
import exchangeCurrency from "./Exchangecurrency";
import { useState,useRef } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";
import selectcurrency from "./SelectCountry";
const CurrencyConvertor = () => {
const select="flex items-center justify-between h-[max(2.7rem,12vw)] w-[max(6rem,28vw)] lg:w-[max(16vh,8vw)] lg:h-[max(6.8vh,3vw)] max-w-[140px] lg:max-w-[180px] max-h-[63px] lg:text-[2.8vh]  focus:outline-[#9995dc] focus:outline-2 focus:border-transparent border-2 border-[#cac9ca] rounded-lg text-[clamp(1rem,0.6625rem+1.8vw,1.5625rem)] cursor-pointer";
const [Exchange, setExchange] = useState("");
const [Amount, setAmount] = useState("");
const [country, setcountry] = useState(false)
const [Currencyflag, setCurrencyflag] = useState([])
const [SearchData, setSearchData] = useState("")
const [SelectCountryData, setSelectCountryData] = useState("Select")
const [value, setvalue] = useState(false)
const [from, setfrom] = useState("");
const [To, setTo] = useState("");
const [Swapfrom, setSwapfrom] = useState("");
const [Swapto, setSwapto] = useState("");
const ref=useRef();
const search=useRef();
const hide=useRef();
const selected=useRef();
const to=useRef();
const fromimg=useRef();
const toimg=useRef();
let handleClick=async ()=>{
  if(Amount!="" && (Swapfrom!="" && Swapto!="")){
    setExchange("Getting exchange rate...");
    let exchange=await exchangeCurrency(Amount,from,To);
    if(exchange){
      setTimeout(()=>{
        setExchange(exchange);
        ref.current.innerHTML="Last updated on : "+ new Date().toLocaleDateString()+", " + (new Date(1734825601*1000).toLocaleString()).slice(11);
      },500)
     }
    }
    else{
      alert("Please select a country")
    }
  }
 

useEffect(()=>{
  let flagresponse=async ()=>{ 
  if(country && Currencyflag.length==0){

    let response=await selectcurrency();
    setCurrencyflag(response["currencies"])
  }
  
}
flagresponse();
},[country,Currencyflag])


useEffect(()=>{
  if(value &&  SelectCountryData!="Select"){
    to.current.innerHTML=SelectCountryData
    setTo(SelectCountryData);
    setSwapfrom(SelectCountryData);
    toimg.current.setAttribute('src',`https://flagcdn.com/16x12/${SelectCountryData.slice(0,2).toLowerCase()}.png`)
   toimg.current.setAttribute('alt',SelectCountryData);
  }
  else{
    selected.current.innerHTML=SelectCountryData
    setfrom(SelectCountryData);
    setSwapto(SelectCountryData);
    if( SelectCountryData!="Select"){
      fromimg.current.setAttribute('src',`https://flagcdn.com/16x12/${SelectCountryData.slice(0,2).toLowerCase()}.png`)
      fromimg.current.setAttribute('alt',SelectCountryData);

    }
  }
},[value,SelectCountryData])


let handleData=(e)=>{
  setSelectCountryData(e.target.textContent.slice(-5,-2))
setcountry(!country)
setSearchData("");
 
}

let Selecthandleflag= ()=>{
  setcountry(!country)
  setvalue(false)
   fromimg.current.style.display="flex"
}

let Tohandleflag=()=>{
  setcountry(!country)
  setvalue(true)
  toimg.current.style.display="flex"
}

let SwapData=()=>{
  //Swapping data with each other
  selected.current.innerHTML=Swapfrom;
  fromimg.current.setAttribute('src',`https://flagcdn.com/16x12/${Swapfrom.slice(0,2).toLowerCase()}.png`)
  fromimg.current.setAttribute('alt',Swapfrom);
  setfrom(Swapfrom);
  //Swapping data with each other
  to.current.innerHTML=Swapto;
  toimg.current.setAttribute('src',`https://flagcdn.com/16x12/${Swapto.slice(0,2).toLowerCase()}.png`)
  toimg.current.setAttribute('alt',Swapto);
  setTo(Swapto);
  //Swap data To => from
  setSwapfrom(Swapto);
  //Swap data from => To
  setSwapto(Swapfrom);
}

//Filter Search data
const searchdata = Object.keys(Currencyflag).filter((data)=> data.includes(SearchData.toUpperCase()));
  return (
    <>
    <main className="h-screen w-screen md:bg-black md:flex md:items-center md:justify-center">
<section ref={hide} className={country?"hidden":"flex justify-around items-center flex-col bg-white  shadow-[inset_-4px_4px_3px_-2px,inset_4px_-4px_3px_-2px] shadow-[rgba(11,10,10,0.75)] h-screen w-screen min-[800px]:h-[min(50em,85vh)] min-[800px]:w-[max(40em,70vw)] lg:w-[max(28vw,62vh)]  lg:h-[max(26em,76vh)]  md:rounded-2xl "}>
<h3 className="text-black text-center text-[clamp(1.8825rem,0.875rem+4.6875vw,3.125rem)] lg:text-[5vh] font-[600] ">Currency Convertor</h3>


<form onSubmit={(e)=>e.preventDefault()} className="h-[80%] w-[80%] flex items-center justify-around flex-col ">
  <div className="flex flex-col h-auto gap-[7px]">
  <label htmlFor="amount" className="text-[clamp(1.25rem,0.8036rem+2.2321vw,1.875rem)] font-medium lg:text-[3.3vh]">Enter Amount</label>
  <input id="amount" className=" focus:outline-[#9995dc] focus:outline-3 focus:border-transparent text-[clamp(1rem,0.6625rem+1.8vw,1.5625rem)] pl-[5%] lg:text-[2.8vh] border-2 border-[#cac9ca] rounded-lg h-[max(2.7rem,12vw)] max-h-[71px] max-w-[535px] w-[max(18rem,80vw)] lg:w-[max(52vh,22vw)] lg:h-[max(7vh,3vw)] lg:max-w-[590px]" type="number" name="amount" placeholder="Enter Amount"
  onChange={(e)=>setAmount(e.target.value)} required></input>
</div>
<div className="w-[100%] flex justify-between items-center">
  <span className="flex flex-col gap-[7px]">
<h3 className="text-[clamp(1.25rem,0.8036rem+2.2321vw,1.875rem)] font-medium lg:text-[3.3vh]">From</h3>
<span name="Select Country" title="Select Country " id="Country" className={select} onClick={Selecthandleflag}>
<img ref={fromimg} className="object-cover object-center h-[max(1rem,2.8vw)] w-auto min-[800px]:h-[max(0.8rem,2.4vw)] lg:h-[max(2.5vh,1vw)] lg:max-h-[30px] relative left-[6%] hidden"
src=""
alt=""/>
<span ref={selected} className="ml-[5%]">Select</span>
<IoIosArrowDropdownCircle className="mr-[2%]" />
</span>
  </span>

<span className="relative top-[22%]" onClick={SwapData}>
<IoMdSwap className="text-[clamp(1rem,0.6625rem+3vw,2.0625rem)] lg:text-[4.5vh] cursor-pointer"/>
</span>


  <span className="flex flex-col gap-[7px]">
  <h3 className="text-[clamp(1.25rem,0.8036rem+2.2321vw,1.875rem)] font-medium lg:text-[3.3vh]">To</h3>
  <span  name="Select Country" title="Select Country " id="Country" className={select} onClick={Tohandleflag}>
  <img ref={toimg} className="object-cover object-center h-[max(1rem,2.8vw)] w-auto min-[800px]:h-[max(0.8rem,2.4vw)] lg:h-[max(2.5vh,1vw)] lg:max-h-[30px] relative left-[6%] hidden"
   src=""
   alt=""/>
<span className="ml-[5%]" ref={to}>Select</span>
<IoIosArrowDropdownCircle className="mr-[2%]" />
</span>
  </span>
</div>
<span className=" w-[100%] ">
  <h4  className=" text-[clamp(1.25rem,0.8036rem+2.2321vw,1.875rem)] font-medium lg:text-[3.3vh]">{Exchange}</h4>
  <h4 ref={ref} className=" text-[clamp(1rem,0.5056rem+2vw,1.395rem)] font-medium lg:text-[2.1vh] pt-[2%]"></h4>
</span>
<input type="submit" value={"Get Exchange Rate"} className="w-[80%] min-h-[45px] h-[10%] rounded-lg text-white bg-black text-[clamp(1rem,0.6625rem+1.8vw,1.5625rem)] min-[450px]:h-[12%] lg:text-[2.8vh] lg:h-[12%] cursor-pointer active:scale-[0.9] transition-transform duration-[200ms] shadow-[10px_8px_20px_0px] shadow-black" onClick={handleClick}> 
  </input>
</form>
</section>


{
  country?<ul className="overflow-scroll absolute flex items-center flex-col bg-white  shadow-[inset_-4px_4px_3px_-2px,inset_4px_-4px_3px_-2px] shadow-[rgba(11,10,10,0.75)] h-screen w-screen min-[800px]:h-[min(50em,85vh)] min-[800px]:w-[max(40em,70vw)] lg:w-[max(28vw,62vh)]  lg:h-[max(26em,76vh)]  md:rounded-2xl ">
    <div className="absolute top-[5%] flex items-center w-[90%] h-auto">
    <IoIosArrowRoundBack className="text-[clamp(2rem,0.6625rem+4vw,2.5625rem)] lg:text-[5vh] cursor-pointer relative right-[2%]" onClick={()=>setcountry(!country)} />
<input ref={search} className=" focus:outline-[#9995dc] focus:outline-3 focus:border-transparent placeholder:text-[clamp(1rem,0.6625rem+1.8vw,1.5625rem)] pl-[5%] placeholder:lg:text-[2.8vh] border-2 border-[#cac9ca] rounded-full h-[max(2.7rem,12vw)] max-h-[71px] max-w-[535px] w-[max(18rem,80vw)] lg:w-[max(48vh,20vw)] lg:h-[max(6.3vh,2.9vw)] lg:max-w-[582px]" value={SearchData} type="search" placeholder="Search Currency" name="currency" id="currency" onChange={(e)=>setSearchData(e.target.value)}></input>
    </div>
{
 searchdata.map((data,id)=>{
  return(
    <li key={id} className="relative top-[20%] w-[90%] h-auto flex py-[3%] gap-[5%] items-center  active:bg-blue-400 active:rounded-4xl active:transition-colors active:duration-[70ms]" onClick={handleData}>
    <img className="object-cover object-center h-[max(1rem,3.5vw)] w-auto min-[800px]:h-[max(1.6rem,3vw)] lg:h-[max(3vh,1vw)] lg:max-h-[45px] pl-[2%]"
  src={`https://flagcdn.com/16x12/${data.slice(0,2).toLocaleLowerCase()}.png` }
  alt={`${data.slice(0,2)}`}/>
  <h4 className="text-[clamp(1rem,0.8036rem+2.2321vw,1.575rem)] font-medium lg:text-[2.8vh] cursor-pointer "> {Currencyflag[data] }  ({ data}) </h4>
   
    </li>
  )
  }

)}
</ul>:""
}
</main>
  
    </>
  )
}

export default CurrencyConvertor