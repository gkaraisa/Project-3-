import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/colleges.txt')
      .then((response) => response.text())
      .then((data) => {
        const collegeList = data.split('\n').map((college) => college.trim());
        setColleges(collegeList);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>100 National Universities</h1>
      <input
        type="text"
        placeholder="Search for a school"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        style={styles.input}
      />

      <div style={styles.list}>
        {colleges
          .filter((college) => college.toLowerCase().includes(searchTerm))
          .map((college, index) => (
            <div key={index} style={styles.item}>
              <Link to={`/school/${college}`} style={styles.link}>
                {college}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
  },
  list: {
    height: '400px',
    overflowY: 'scroll',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
  },
  item: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '18px',
  },
};

export default Home;
