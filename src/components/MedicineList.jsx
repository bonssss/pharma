import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/medicines')
      .then(response => setMedicines(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Medicine List</h1>
      <ul>
        {medicines.map(medicine => (
          <li key={medicine._id}>{medicine.name} - {medicine.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
