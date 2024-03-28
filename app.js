const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_S9X7XMZAIJ7CllPV4TvGhTdcA7CcTsLanmU7M9UY";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg =document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
      }
      if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}


const updateflag = (element) => {
    let currCode= element.value;
    let countryCode=countryList[currCode];
    console.log(currCode,countryCode);
    let newLink =`https://flagsapi.com/${countryCode}/flat/64.png`;
    //our element is select , and image is present in the parent container 
    let img = element.parentElement.querySelector("img");
    img.src=newLink;
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    
    if(amtVal===""|| amtVal<0){
         amtVal=1;
        amount.value="1";
    }

    const URL =`${BASE_URL}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    
    let response =await fetch(URL);
    let data = await response.json();
   // let rate =data[toCurr.value[value]];
   let rate =data.data[toCurr.value].value;
   let finalAmount=amtVal*rate;
   msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});


