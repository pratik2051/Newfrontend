const employees = [
  {
    code: 482,
    name: 'Aslam Shaikh',
    email: 'aslam.shaikh@crestdatasys.com',
    profilePicture: 'path/to/aslam.jpg',
    currentAssets: [
      { assetTag: 'CLW335', company: 'Dell', model: 'Vostro 1500', category: 'Laptop' },
      { assetTag: 'CMOU168', company: 'Logitech', model: 'qwer 100', category: 'Mouse' }
    ],
    activity: [
      { date: '2023-06-01', action: 'Assigned', assetTag: 'CLW335', company: 'Dell', model: 'Vostro 1500', category: 'Laptop' },
      { date: '2023-06-05', action: 'Returned', assetTag: 'CLW335', company: 'Dell', model: 'Vostro 1500', category: 'Laptop' }
    ]
  },
  {
    code: 345,
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'path/to/john.jpg',
    currentAssets: [
      { assetTag: 'ABC123', company: 'Apple', model: 'MacBook Pro', category: 'Laptop' },
      { assetTag: 'XYZ456', company: 'Microsoft', model: 'Surface Pro', category: 'Tablet' }
    ],
    activity: [
      { date: '2023-06-10', action: 'Assigned', assetTag: 'ABC123', company: 'Apple', model: 'MacBook Pro', category: 'Laptop' },
      { date: '2023-06-15', action: 'Returned', assetTag: 'ABC123', company: 'Apple', model: 'MacBook Pro', category: 'Laptop' }
    ]
  },
  {
    code: 789,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profilePicture: 'path/to/jane.jpg',
    currentAssets: [
      { assetTag: 'DEF789', company: 'HP', model: 'EliteBook', category: 'Laptop' },
      { assetTag: 'GHI012', company: 'Logitech', model: 'MX Master', category: 'Mouse' }
    ],
    activity: [
      { date: '2023-06-20', action: 'Assigned', assetTag: 'DEF789', company: 'HP', model: 'EliteBook', category: 'Laptop' },
      { date: '2023-06-25', action: 'Returned', assetTag: 'DEF789', company: 'HP', model: 'EliteBook', category: 'Laptop' }
    ]
  }
  // Add more employees as needed
];

export default employees;
