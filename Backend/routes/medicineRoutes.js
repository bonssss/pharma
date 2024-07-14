const express = require('express');
const Medicine = require('../models/medicineModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
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
