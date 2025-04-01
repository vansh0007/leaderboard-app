import React, { useContext } from 'react';
import { LeaderboardContext } from '../contexts/LeaderBoardContext';

const UserDetails = () => {
  const { selectedUser } = useContext(LeaderboardContext);

  if (!selectedUser) return <div className="user-details">Select a user to view details</div>;

  return (
    <div className="user-details">
      <h3>User Details</h3>
      <div className="detail-row">
        <span className="label">Name:</span>
        <span>{selectedUser.name}</span>
      </div>
      <div className="detail-row">
        <span className="label">Age:</span>
        <span>{selectedUser.age}</span>
      </div>
      <div className="detail-row">
        <span className="label">Points:</span>
        <span>{selectedUser.points}</span>
      </div>
      <div className="detail-row">
        <span className="label">Address:</span>
        <span>{selectedUser.address}</span>
      </div>
      {selectedUser?.qr_code && (
    <div className="qr-code">
        <img 
            src={`${process.env.REACT_APP_API_URL}/storage/${selectedUser.qr_code}`} 
            alt="Address QR Code"
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = 'QR Code not available';
            }}
        />
    </div>
)}
    </div>
  );
};

export default UserDetails;