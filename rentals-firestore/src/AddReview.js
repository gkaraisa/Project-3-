import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const AddReview = () => {
  const { schoolName, category } = useParams();
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, 'reviews'),
        where('schoolName', '==', schoolName),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(),}));
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [schoolName, category]);

  const handleReviewSubmit = async () => {
    const newReview = {
      name,
      text: review,
      date: new Date().toLocaleString(),
      likeCount: 0,
      schoolName,
      category,
    };

    const docRef = await addDoc(collection(db, 'reviews'), newReview);
    setReviews([...reviews, { id: docRef.id, ...newReview }]);
    setReview('');
    setName('');
  };

  const handleLike = async (id, currentLikeCount) => {
    const reviewDoc = doc(db, 'reviews', id);
    await updateDoc(reviewDoc, { likeCount: currentLikeCount + 1 });

    setReviews((prevReviews) =>
      prevReviews.map((r) => (r.id === id ? { ...r, likeCount: r.likeCount + 1 } : r))
    );
  };

  return (
    <div>
      <Link to={`/school/${schoolName}`} style={styles.backLink}>
        Previous
      </Link>
      <h1 style={styles.h1}>{schoolName} - {category} Reviews</h1>
      <div style={styles.reviewList}>
        {reviews.map((r) => (
          <div key={r.id} style={styles.reviewContainer}>
            <p><strong>{r.name}</strong> ({r.date})</p>
            <p>{r.text}</p>
            <div>
              <button onClick={() => handleLike(r.id, r.likeCount)} style={styles.likeButton}>
                <img src="/like.png" alt="Like" style={styles.likeImage} />
                {r.likeCount}
              </button>
            </div>
          </div>
        ))}
      </div>

      <input style={styles.input}
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea style={styles.textarea}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here"
      />
      <button style={styles.button} onClick={handleReviewSubmit} >
        Add Review
      </button>
    </div>
  );
};

const styles = {
  backLink: {
    color: 'blue',
    margin: '20px',
    display: 'block',
  },
  reviewList: {
    margin: '20px',
  },
  reviewContainer: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '20px',
    marginBottom: '1px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: 'px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    margin: '20px',
    marginBottom:'5px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '20px',
  },
  likeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  likeImage: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  h1:{
    textAlign: 'center',
  },
};

export default AddReview;
