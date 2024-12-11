import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Reviews = () => {
  const { schoolName } = useParams(); 

  const categories = ['Academics', 'Student Life', 'Location'];

  return (
    <div>
      <Link to="/" style={styles.backLink}>Previous</Link>
      <h1 style={styles.h1}>{schoolName} Reviews</h1>

      <div style={styles.categoriesWrapper}>
        {categories.map((category, index) => (
          <div key={index} style={styles.categoryContainer}>
            <Link to={`/school/${schoolName}/${category}`} style={styles.categoryLink}>
              <h2>{category}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backLink: {
    fontSize: '16px',
    color: 'blue',
    margin: '20px',
    display: 'inline-block',
  },
  categoryContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    border: '1px solid lightgray',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '10px',
    flex: '1 1 30%',
    margin: '10px',
    textAlign: 'center',
  },
  categoryLink: {
    display: 'block',
    textDecoration: 'none',
    color: 'black',
    fontSize: '14px',
  },
  categoriesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  h1:{
    textAlign: 'center',
  },
};

export default Reviews;
