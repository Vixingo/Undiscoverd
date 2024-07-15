import PropTypes from "prop-types";
import axios from "axios";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { BASE_URL } from "../../baseurl/baseurl";

const SinglePricing = ({
  price,
  title,
  serviceList,
  yearlyPrice,
  isToggled,
  isYearlyActive 
}) => {
  const stripe=useStripe();
  
  const getSessionToken=async()=>{
  
    const headers={
      headers:{
        authorization:`Bearer ${JSON.parse(localStorage?.getItem('user'))?.token}`
      }
    }

    let subscriptionType;


if(isYearlyActive ){
  subscriptionType="year"
price=yearlyPrice
}else{
 
  subscriptionType="month"
}

    let response=await axios.post(`${BASE_URL}/create-session`,{title,price,subscriptionType},headers)
    console.log(response.data)
   await stripe.redirectToCheckout({
      sessionId:response.data.session.id
    })
  }
  return (
    <div className="px-5 py-[30px] flex flex-col items-center gap-[30px]">
      {/* top */}
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-[18px] text-[#131313] font-medium "> {title} </p>
        <p className="text-[18px] text-[#131313] font-medium ">
          {" "}
          <span className="text-[32px] font-bold leading-7 ">
            {" "}
            ${isToggled ? yearlyPrice : price}{" "}
          </span>
          {isToggled ? "/year" : "/month"}
        </p>
      </div>

      {/* feature list */}
      <div className="space-y-5 py-2 px-4 lg:p-6 bg-[#F9FAFB]">
        {serviceList &&
          serviceList.map((item, index) => (
            <div className="flex items-center gap-2.5" key={index}>
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  className="w-full h-full"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                    fill="#131313"
                  />
                </svg>
              </div>
              <p className="text-[18px] leading-8 text-[#131313] font-normal ">
                {item}
              </p>{" "}
            </div>
          ))}
      </div>

      {/* get started button */}
      <button onClick={getSessionToken} className="text-base left-6 font-normal py-2.5 rounded-[30px] bg-[#fff] border border-solid border-primaryColor text-primaryColor ease-in-out duration-300 hover:bg-primaryColor hover:text-[#fff] w-full text-center  ">
        {" "}
        Get Started{" "}
      </button>
    </div>
  );
};

SinglePricing.propTypes = {
  price: PropTypes.number,
  yearlyPrice: PropTypes.number,
  title: PropTypes.string,
  serviceList: PropTypes.array,
  isToggled: PropTypes.bool,
};

export default SinglePricing;
