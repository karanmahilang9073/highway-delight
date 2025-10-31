import mongoose from 'mongoose';
import 'dotenv/config'; 
import Experience from './models/Experience.js'; // Import our new model

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
    image: 'https://media.istockphoto.com/id/1372121141/photo/hilltop-view-of-nandi-hills-hill-station-located-near-bangalore-karnataka-india.jpg?s=1024x1024&w=is&k=20&c=yY7FujSPWEnqKAxKMvLhUO7lsnxHuC3XLXPj99RPrQk=',
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
    image: 'https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1685550903259-96799741df9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2046',
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
    image: 'https://images.unsplash.com/photo-1719949122509-74d0a1d08b44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1936',
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
    image: 'https://media.istockphoto.com/id/537817390/photo/vada-pav-or-vada-pav.jpg?s=1024x1024&w=is&k=20&c=GJ5t5uf0HvbU_GA7Snx8s5Zo14790XDhYU4hlSm4eXQ=',
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
    image: 'https://plus.unsplash.com/premium_photo-1691031428843-fffcb81cf454?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
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