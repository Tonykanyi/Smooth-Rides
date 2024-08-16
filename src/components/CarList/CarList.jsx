import React, { useState, useEffect } from 'react';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/carlist')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
      {cars.map(car => (
        <div key={car.id} className="bg-white rounded-lg shadow-md">
          <img src={car.image} alt={car.title} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{car.title}</h2>
            <p className="text-sm text-gray-600">Start Production: {car.start_production}</p>
            <p className="text-sm text-gray-600">Class: {car.class}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;