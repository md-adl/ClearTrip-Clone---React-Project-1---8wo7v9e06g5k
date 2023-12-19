import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
      {/* You can customize the loading indicator here */}
    </div>
  );
};

export default Loading;