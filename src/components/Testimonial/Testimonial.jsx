import React from "react";

const testimonialData = [
  {
    name: "Dilshad",
    image: "", 
    description: "Smooth Rides made renting a car for my road trip so easy! The booking process was seamless, the car was in perfect condition, and the customer service was fantastic. I'll definitely be recommending them to friends and family.",
    aosDelay: "0",
  },
  {
    name: "Satya",
    image: "", 
    description: "I was really impressed with the affordable rates at Smooth Rides. They had the best prices I could find, and there were no hidden fees or surprises. The car was clean and comfortable, and the whole rental experience was a breeze.",
    aosDelay: "300",
  },
  {
    name: "Sabir",
    image: "", 
    description: "When my flight was canceled, I was worried about my car rental, but Smooth Rides was incredibly understanding and helpful. They rearranged my booking without any hassle and provided excellent customer service. I highly recommend them!",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Here is what some of our clients say about us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
