import React from 'react';
import './Activity.css';

const Activity = () => {
  // Dummy data for asset activity
  const assetActivity = [
    {
      user: 'Kartavya Patel',
      action: 'update Asset details',
      assetTag: 'CLW271',
      description:
        'Asset Description 271 CLW271 Lenovo S4SHW23F 1835LZX3FTM9 Devanshu Gohil Working Online 1835LZX3FTP9 Divyo Bhaskar - Ahmedabad',
      time: '1 min ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Virang Desai',
      action: 'changed status of Asset',
      assetTag: 'CLW282',
      time: '1 hour ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Assigned Asset',
      assetTag: 'CLW271',
      assignee: 'Aslam Shaikh',
      time: '2 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Unassigned Asset',
      assetTag: 'CLW271',
      assignee: 'Devanshu Gohil',
      time: '3 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    // Add more asset activity as needed
  ];

  return (
    <div className="activity-list">
      {assetActivity.map((activity, index) => (
        <div key={index} className="activity-item">
          <div>
            <img src={activity.profilePic} alt="profile" />
            <strong>{activity.user}</strong> {activity.action}{' '}
            {activity.assetTag}
            {activity.description && (
              <p>{activity.description}</p>
            )}
            {activity.assignee && (
              <p>to {activity.assignee}</p>
            )}
          </div>
          <div>{activity.time}</div>
        </div>
      ))}
    </div>
  );
};

export default Activity;
