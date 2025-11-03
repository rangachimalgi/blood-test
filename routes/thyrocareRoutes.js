import express from 'express';
import { comparePackages, searchThyrocarePackage, syncPackageFromThyrocare } from '../controllers/thyrocareController.js';

const router = express.Router();

// Search for a Thyrocare package by name
router.get('/search', searchThyrocarePackage);

// Sync package from Thyrocare - Update includedTests
router.post('/sync/:id', syncPackageFromThyrocare);

// Compare Thyrocare packages with database
router.post('/compare', comparePackages);

export default router;

