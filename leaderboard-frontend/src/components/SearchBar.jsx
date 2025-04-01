import React, { useState, useContext, useEffect } from 'react';
import { LeaderboardContext } from '../contexts/LeaderBoardContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, selectUser } = useContext(LeaderboardContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, users]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(user => (
            <div
              key={user.id}
              className="search-result-item"
              onClick={() => {
                selectUser(user);
                setSearchTerm('');
                setSearchResults([]);
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;