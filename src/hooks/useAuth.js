import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const userData = {
      id: 1,
      name: 'John Doe',
      role: 'employee', // 'employee', 'manager', 'admin'
      email: 'john@company.com'
    };
    
    // For demo, you can change the role to test different dashboards
    const demoRole = localStorage.getItem('demoRole') || 'employee';
    userData.role = demoRole;
    
    setUser(userData);
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role) => {
    localStorage.setItem('demoRole', role);
    window.location.reload();
  };

  return { user, loading, login, logout, switchRole };
};