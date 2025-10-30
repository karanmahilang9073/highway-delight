import mongoose from 'mongoose';
import 'dotenv/config'; 
import Experience from './models/Experience.js'; // Import our new model

// --- Our Seed Data (8 Experiences) ---
const experiencesToSeed = [
  // --- Experience 1 ---
  {
    id: 1,
    title: 'Kayaking',
    location: 'Udupi',
    image: 'https://images.unsplash.com/photo-1519010470956-6d877008eaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDR8fGtheWFraW5nJTIwbWFuZ3JvdmVzfGVufDB8fHx8MTY5ODU4NzIwMA&ixlib=rb-4.0.3&q=80&w=1080',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with expert will accompany in kayaking',
    price: 999,
    availableSlots: [
      { date: '2025-11-15', time: '10:00 am', totalCapacity: 10, bookingsCount: 0 },
      { date: '2025-11-15', time: '01:00 pm', totalCapacity: 10, bookingsCount: 0 },
      { date: '2025-11-16', time: '10:00 am', totalCapacity: 10, bookingsCount: 0 },
      { date: '2025-11-16', time: '01:00 pm', totalCapacity: 8, bookingsCount: 0 },
    ]
  },
  // --- Experience 2 ---
  {
    id: 2,
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1583383860542-03c1b0a9b219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fG5hbmRpJTIwaGlsbHMlMjBzdW5yaXNlfGVufDB8fHx8MTY5ODU4NzIwMA&ixlib=rb-4.0.3&q=80&w=1080',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 899,
    availableSlots: [
      { date: '2025-11-15', time: '05:00 am', totalCapacity: 15, bookingsCount: 0 },
      { date: '2025-11-16', time: '05:00 am', totalCapacity: 15, bookingsCount: 0 },
    ]
  },
  // --- Experience 3 ---
  {
    id: 3,
    title: 'Coffee Trail',
    location: 'Coorg',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGNvZmZlZSUyMHBsYW50YXRpb258ZW50fDB8fHx8MTY5ODU4NzIwMQ&ixlib=rb-4.0.3&q=80&w=1080',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 1299,
    availableSlots: [
      { date: '2025-11-16', time: '11:00 am', totalCapacity: 5, bookingsCount: 0 },
      { date: '2025-11-17', time: '11:00 am', totalCapacity: 5, bookingsCount: 0 },
    ]
  },
  
  // --- NEW EXPERIENCE 4 ---
  {
    id: 4,
    title: 'Scuba Diving',
    location: 'Goa',
    image: 'https://images.unsplash.com/photo-1590510123568-8f2343c39c4d?q=80&w=1470&auto=format&fit=crop',
    description: 'Explore the vibrant underwater world. Certified instructors. All gear provided.',
    price: 3499,
    availableSlots: [
      { date: '2025-11-17', time: '09:00 am', totalCapacity: 8, bookingsCount: 0 },
      { date: '2025-11-17', time: '12:00 pm', totalCapacity: 8, bookingsCount: 0 },
      { date: '2025-11-18', time: '09:00 am', totalCapacity: 8, bookingsCount: 0 },
    ]
  },
  // --- NEW EXPERIENCE 5 ---
  {
    id: 5,
    title: 'Rishikesh River Rafting',
    location: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1600713781313-06a5f760e6f6?q=80&w=1374&auto=format&fit=crop',
    description: 'Thrilling white water rafting experience. Safety kayakers included. Camp included.',
    price: 2499,
    availableSlots: [
      { date: '2025-11-18', time: '10:00 am', totalCapacity: 12, bookingsCount: 0 },
      { date: '2025-11-19', time: '10:00 am', totalCapacity: 12, bookingsCount: 0 },
    ]
  },
  // --- NEW EXPERIENCE 6 ---
  {
    id: 6,
    title: 'Manali Paragliding',
    location: 'Manali',
    image: 'https://images.unsplash.com/photo-1514828390987-7313a5f3b836?q=80&w=1470&auto=format&fit=crop',
    description: 'Soar over the Solang Valley. 15-minute tandem flight with certified pilot.',
    price: 2999,
    availableSlots: [
      { date: '2025-11-20', time: '11:00 am', totalCapacity: 6, bookingsCount: 0 },
      { date: '2025-11-20', time: '02:00 pm', totalCapacity: 6, bookingsCount: 0 },
    ]
  },
  // --- NEW EXPERIENCE 7 ---
  {
    id: 7,
    title: 'Mumbai Food Tour',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1588269719208-68f7637c352a?q=80&w=1374&auto=format&fit=crop',
    description: 'Discover the best street food Mumbai has to offer. 4-hour guided walking tour.',
    price: 1499,
    availableSlots: [
      { date: '2025-11-18', time: '04:00 pm', totalCapacity: 10, bookingsCount: 0 },
      { date: '2025-11-19', time: '04:00 pm', totalCapacity: 10, bookingsCount: 0 },
    ]
  },
  // --- NEW EXPERIENCE 8 ---
  {
    id: 8,
    title: 'Jaipur Heritage Walk',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1567225555776-a0b0f0c2c51f?q=80&w=1528&auto=format&fit=crop',
    description: 'Explore the Pink City\'s forts and palaces. Includes entry tickets and local guide.',
    price: 1199,
    availableSlots: [
      { date: '2025-11-20', time: '09:00 am', totalCapacity: 15, bookingsCount: 0 },
      { date: '2025-11-21', time: '09:00 am', totalCapacity: 15, bookingsCount: 0 },
    ]
  },
];

// --- The Seeding Function ---
const seedDatabase = async () => {
  console.log('Connecting to database...');
  const mongoUri = process.env.DB_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in .env file');
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB successfully!');

  try {
    // 1. Clear existing experiences
    console.log('Deleting old experiences...');
    await Experience.deleteMany({});
    console.log('Old experiences deleted.');

    // 2. Insert the new experiences
    console.log('Inserting new experiences...');
    await Experience.insertMany(experiencesToSeed);
    console.log('Database seeded successfully with 8 experiences!');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // 3. Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

// --- Run the script ---
seedDatabase();