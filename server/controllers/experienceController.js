import Experience from '../models/Experience.js';


export const getAllExperiences = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const experiences = await Experience.find(filter);
    
    res.json(experiences);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ message: 'Server error while fetching experiences' });
  }
};

// get experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findOne({ id: id });

    if (experience) {
      res.json(experience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching experience' });
  }
};