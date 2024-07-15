const express = require('express');
const Medicine = require('../models/medicineModel');
const { protect, admin, pharmacist } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, pharmacist, async (req, res) => {
  const { name, quantity, expiryDate } = req.body;

  const newMedicine = new Medicine({
    name,
    quantity,
    expiryDate,
  });

  try {
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes (update, delete) can be added here

module.exports = router;
