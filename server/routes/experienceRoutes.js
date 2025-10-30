import express from 'express';
// Note the path change: ../controllers/
import { getAllExperiences, getExperienceById } from '../controllers/experienceController.js';

const router = express.Router();

// GET /experiences
router.get('/', getAllExperiences);

router.get('/:id', getExperienceById);

export default router;