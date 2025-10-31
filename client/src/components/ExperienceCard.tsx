import { Link } from 'react-router-dom';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      <img src={experience.image}  alt={`Photo of ${experience.title}`} className="w-full h-48 object-cover" />
      
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-lg text-gray-900">{experience.title}</h3>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
            {experience.location}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 grow">{experience.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-lg text-gray-800">
            From ₹{experience.price}
          </span>
          <Link to={`/details/${experience.id}`}className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}