import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

// POST - create a package
router.post("/", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating package:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one package
router.get("/:id", async (req, res) => {
  try {
    const singlePackage = await Package.findOne({ id: req.params.id });
    if (!singlePackage)
      return res.status(404).json({ message: "Package not found" });

    res.json(singlePackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
