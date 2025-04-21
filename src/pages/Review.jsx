import React from 'react';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      date: "2024-01-15",
      comment: "StockGroww has revolutionized how I track my investments. The interface is intuitive and the real-time updates are fantastic!",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 4,
      date: "2024-01-14",
      comment: "Great platform for stock analysis. Would love to see more technical indicators in future updates.",
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Mike Chen",
      rating: 5,
      date: "2024-01-13",
      comment: "The news integration and stock alerts are incredibly helpful. Best stock tracking app I've used!",
      avatar: "👨‍💻"
    }
  ];

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="review-container">
      <h1>User Reviews</h1>
      <div className="reviews-grid">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="avatar">{review.avatar}</span>
              <div className="review-info">
                <h3>{review.name}</h3>
                <div className="rating">{renderStars(review.rating)}</div>
                <small>{review.date}</small>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
