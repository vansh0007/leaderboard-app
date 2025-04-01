import React from 'react';
import { LeaderboardProvider } from './contexts/LeaderBoardContext';
import { WinnersProvider } from './contexts/WinnersContext';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AddUserForm from './components/AddUserForm';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import WinnersList from './components/WinnersList';
import WinnerStats from './components/WinnerStats';
import './App.css';

function App() {
  return (
    <LeaderboardProvider>
      <WinnersProvider>
        <div className="app">
          <Header />
          <div className="main-content">
            <div className="left-panel">
              <SearchBar />
              <UserList />
              <AddUserForm />
            </div>
            <div className="right-panel">
              <UserDetails />
              {/* Add winners section below user details */}
              <div className="winners-section">
                <WinnerStats />
                <WinnersList />
              </div>
            </div>
          </div>
        </div>
      </WinnersProvider>
    </LeaderboardProvider>
  );
}

export default App;