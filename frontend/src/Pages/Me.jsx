import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Me = () =>{
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/frontPage');
    }
  }, [isAuthenticated, navigate]);

  return null; // This component does not render anything itself
};

