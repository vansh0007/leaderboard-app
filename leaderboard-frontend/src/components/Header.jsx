// src/components/Header.jsx
import React from 'react';
import { useContext } from 'react';
import { LeaderboardContext } from '../contexts/LeaderBoardContext';

const Header = () => {
  const { requestSort, sortConfig } = useContext(LeaderboardContext);

  return (
    <header className="app-header">
      <h1>Leaderboard</h1>
      <div className="sort-controls">
        <button 
          onClick={() => requestSort('name')}
          className={sortConfig?.key === 'name' ? 'active' : ''}
        >
          Sort by Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => requestSort('points')}
          className={sortConfig?.key === 'points' ? 'active' : ''}
        >
          Sort by Points {sortConfig?.key === 'points' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
      </div>
    </header>
  );
};

export default Header;