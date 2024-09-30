import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/carlist/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((err) => console.error('Error fetching car details:', err));
  }, [id]);

  if (!car) {
    return <div>Loading car details...</div>;
  }

  return (
    <div>
      <h1>{car.title}</h1>
      <img src={car.image} alt={car.title} />
      <p>Start Production: {car.start_production}</p>
      <p>Class: {car.class}</p>
    </div>
  );
};

export default CarDetails;
