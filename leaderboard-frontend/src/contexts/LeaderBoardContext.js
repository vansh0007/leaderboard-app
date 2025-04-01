import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const updatePoints = async (userId, operation) => {
    try {
      await api.patch(`/users/${userId}/points`, { operation });
      fetchUsers();
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  const addUser = async (userData) => {
    try {
      await api.post('/users', userData);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <LeaderboardContext.Provider
      value={{
        users: sortedUsers,
        selectedUser,
        loading,
        selectUser: setSelectedUser,
        updatePoints,
        addUser,
        deleteUser,
        requestSort,
        sortConfig,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};