import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import { Rating, Header, Divider, Comment } from 'semantic-ui-react'
import ReviewModal from './ReviewModal'

const Review = ({ id, restData }) => {
  const currentUserId = useSelector(state => state.authentication.id);
  const fetchWithCSRF = useSelector(state => state.authentication.csrf);
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState({
    restaurant_id: id,
    user_id: currentUserId,
    content: '',
    rating: 0,
  });

  const handleSubmit = () => {
    handleReviews();
  }


  async function handleReviews() {
    const { restaurant_id, user_id, content, rating } = state;
    const res = await fetchWithCSRF(`/api/home/restaurant/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurant_id, user_id, content, rating }),
    });
    if (res.ok) {
      const data = await res.json()
      setReviews(data.reviews)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/home/restaurant/${id}`)
      const data = await res.json()
      setReviews(data.reviews)
    }
    fetchData()
  }, [id]);


  return (
    <>
      <Header as='h3' dividing> Reviews</Header>
      <ReviewModal restData={restData} handleSubmit={handleSubmit} state={state} setState={setState} />
      {/* {reviews.map((review, index) =>
        <div key={`${index}-${review.restaurant_id}-${review.user_id}`}>
          <Rating rating={review.rating} maxRating={5} disabled />
          <div className='container__reviews___star'>
            <p className='container__reviews__text'>{review.content}</p>
          </div>
          <div className='container__reviews__text'>
            <h6 className='container__reviews__readmore' >try something else</h6>
          </div>
        </div>
      )} */}
      <Comment.Group size='small'>
        {reviews.length > 0 && reviews.map((review, index) => {
          return (
            <Comment key={index}>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author>{review.user_id}</Comment.Author>
                <Comment.Metadata>
                  <div><Rating rating={review.rating} maxRating={5} disabled />Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{review.content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Report</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Divider />
            </Comment>
          )
        }
        )}
        {reviews.length === 0 && <Header as='h3' dividing> NO REVIEWS</Header>}
      </Comment.Group>
    </>
  )
}

export default Review
