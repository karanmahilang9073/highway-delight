import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import ExperienceCard from '../components/ExperienceCard';
import api from '../api';
import type { Experience } from '../types';

interface HomeProps {
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/experiences', {
          params: { search: searchTerm }
        });
        setExperiences(response.data);
      } catch (err: unknown) {
        console.error('Error fetching experiences:', err);
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to fetch experiences.');
        } else {
          setError('An unknown error occurred.');
        }
      }
      setLoading(false);
    };

    fetchExperiences();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Loading Experiences...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 text-red-600 text-center">
        <h1 className="text-3xl font-bold mb-8">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {searchTerm ? `Results for "${searchTerm}"` : "Top Experiences"}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))
        ) : (
          <p>No experiences found{searchTerm ? ` matching "${searchTerm}"` : ""}.</p>
        )}
      </div>
    </div>
  );
};

export default Home;