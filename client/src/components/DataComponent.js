import React, { useEffect, useState } from 'react';

function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .then(fetchedData => setData(fetchedData));
  }, []);

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataComponent;