import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: '',
    returnDate: '',
    name: '',
    email: '',
    phoneNumber: '',
  });

  // Fetch the list of cars from the API
  useEffect(() => {
    fetch('http://localhost:3000/carlist')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle booking form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (selectedCar) {
      fetch('http://localhost:3000/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: selectedCar.id,
          pickupDate: bookingDetails.pickupDate,
          returnDate: bookingDetails.returnDate,
          name: bookingDetails.name,
          email: bookingDetails.email,
          phoneNumber: bookingDetails.phoneNumber,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Booking successful:', data);
          // Clear form and selection
          setBookingDetails({
            pickupDate: '',
            returnDate: '',
            name: '',
            email: '',
            phoneNumber: '',
          });
          setSelectedCar(null);
        })
        alert('Booking successful!')
        .catch((err) => console.error('Booking failed:', err));
    }
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <Slider {...settings}>
        {cars.map((car) => (
          <div key={car.id} className="p-2">
            <div className="bg-white rounded-lg shadow-md">
              <img src={car.image} alt={car.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{car.title}</h2>
                <p className="text-sm text-gray-600">Start Production: {car.start_production}</p>
                <p className="text-sm text-gray-600">Class: {car.class}</p>

                {/* Booking Button */}
                <button
                  onClick={() => setSelectedCar(car)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Book this car
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Booking Form */}
      {selectedCar && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Book {selectedCar.title}</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={bookingDetails.pickupDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={bookingDetails.returnDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={bookingDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
