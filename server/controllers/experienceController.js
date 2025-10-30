import Experience from '../models/Experience.js';

// --- The old hard-coded 'experiences' array is GONE ---

// This function now fetches from MongoDB and handles search
export const getAllExperiences = async (req, res) => {
  try {
    // Get the search query from the URL (e.g., /experiences?search=kayak)
    const { search } = req.query;

    // Create a filter object to pass to MongoDB
    const filter = {};

    if (search) {
      // If there is a search term, add a regex filter for the 'title'
      // This will find titles that *contain* the search term, case-insensitive
      filter.title = { $regex: search, $options: 'i' };
    }

    // Pass the filter object to the .find() method
    // If 'search' is empty, 'filter' will be {}, which finds all experiences.
    const experiences = await Experience.find(filter);
    
    res.json(experiences);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ message: 'Server error while fetching experiences' });
  }
};

// This function now fetches one experience by ID from MongoDB
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find one experience where the 'id' field matches
    const experience = await Experience.findOne({ id: id });

    if (experience) {
      // This response now includes the 'availableSlots' array!
      res.json(experience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (err) {
    console.error('Error fetching experience by ID:', err);
    res.status(500).json({ message: 'Server error while fetching experience' });
  }
};