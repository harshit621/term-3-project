import React, { useState } from 'react';
// this is for the message after submitting the form

const Review = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', email: '', rating: 5, comment: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="review-section">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Star' : 'Stars'}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </form>

      {showSuccess && (
        <div className="success-message">
          Thank you for your review! Your feedback has been submitted successfully.
        </div>
      )}
    </div>
  );
};

export default Review;
