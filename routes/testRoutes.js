import express from 'express';
import Test from '../models/Test.js';

const router = express.Router();

// Create a new test
router.post('/', async (req, res) => {
  try {
    const newTest = new Test(req.body);
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    console.error('Error saving test:', err);
    res.status(500).json({ message: 'Error saving test', error: err.message });
  }
});

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    console.error('Error fetching tests:', err);
    res.status(500).json({ message: 'Error fetching tests', error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findOne({ id: req.params.id });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add this inside your router file
router.post('/bulk', async (req, res) => {
  try {
    const tests = req.body; // should be an array of test objects
    if (!Array.isArray(tests)) {
      return res.status(400).json({ message: 'Expected an array of test objects' });
    }

    const savedTests = await Test.insertMany(tests);
    res.status(201).json(savedTests);
  } catch (err) {
    console.error('Error inserting bulk tests:', err);
    res.status(500).json({ message: 'Error inserting bulk tests', error: err.message });
  }
});



export default router;