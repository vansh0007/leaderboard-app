import React, { useContext } from 'react';
import { LeaderboardContext } from '../contexts/LeaderBoardContext';

const UserList = () => {
  const {
    users,
    selectedUser,
    loading,
    selectUser,
    updatePoints,
    deleteUser,
    requestSort,
    sortConfig,
  } = useContext(LeaderboardContext);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>
              Name {getSortIndicator('name')}
            </th>
            <th onClick={() => requestSort('points')}>
              Points {getSortIndicator('points')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={selectedUser?.id === user.id ? 'selected' : ''}
              onClick={() => selectUser(user)}
            >
              <td>{user.name}</td>
              <td>{user.points}</td>
              <td className="actions">
                <button onClick={(e) => { e.stopPropagation(); updatePoints(user.id, 'increment'); }}>
                  +
                </button>
                <button onClick={(e) => { e.stopPropagation(); updatePoints(user.id, 'decrement'); }}>
                  -
                </button>
                <button
                  className="delete"
                  onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;