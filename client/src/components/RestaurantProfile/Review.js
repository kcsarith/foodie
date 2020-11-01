import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import { Rating, Header, Divider, Container, Icon, Menu, Dropdown, Comment, Pagination, Segment, Button, Form, Confirm } from 'semantic-ui-react'
import ReviewModal from './ReviewModal'
import { set } from 'js-cookie';

const Review = ({ profileVisualState, setProfileVisualState, hashLocationState, setHashLocationState }) => {
  const authSelector = useSelector(state => state.authentication);
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState({
    restaurant_id: profileVisualState.id,
    user_id: authSelector.id,
    content: '',
    rating: 3,
    dropDownSort: 'Newest',
    currentPage: 1,
    currentReviewEdit: null,
    editCommentText: '',
    confirmMessage: 'Loading...'
  });
  const handleSubmit = () => {
    handleReviews();
  }

  const handleOnReviewSortChange = (e, props) => {
    let newSortedReviews = reviews
    switch (props.value) {
      case 'Newest':
        newSortedReviews = reviews.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
        break;
      case 'Oldest':
        newSortedReviews = reviews.sort((currentEle, nextEle) => currentEle.id - nextEle.id);
        break;
      case 'Highest Rated':
        newSortedReviews = reviews.sort((currentEle, nextEle) => nextEle.rating - currentEle.rating);
        break;
      case 'Lowest Rated':
        newSortedReviews = reviews.sort((currentEle, nextEle) => currentEle.rating - nextEle.rating);
        break;
      default:
        console.log('This animal will not.');
    }
    setReviews(newSortedReviews)
    setState({ ...state });
    console.log(reviews);
  }
  const ReviewsSortingDropdown = () => {
    const options = [
      { key: 1, text: 'Newest', value: 'Newest' },
      { key: 2, text: 'Oldest', value: 'Oldest' },
      { key: 3, text: 'Highest Rated', value: 'Highest Rated' },
      { key: 4, text: 'Lowest Rated', value: 'Lowest Rated' },
    ]
    return (
      <>
        <h4>Sort by</h4>
        <Menu compact style={{ marginBottom: '3em' }}>
          <Dropdown search onChange={handleOnReviewSortChange} selection placeholder='Newest' options={options} />
        </Menu>
      </>
    )
  }

  async function handleReviews() {
    const restaurant_id = profileVisualState.id
    const user_id = authSelector.id
    const content = profileVisualState.content;
    const rating = profileVisualState.rating;

    const res = await authSelector.csrf(`/api/home/restaurant/${profileVisualState.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurant_id, user_id, content, rating }),
    });
    console.log(restaurant_id, user_id, content, rating)
    if (res.ok) {
      const data = await res.json()
      const newAllRatings = [...profileVisualState.allRatings, rating]
      const newTotalReviews = profileVisualState.totalReviews + 1
      const new_avg_rating = (newAllRatings.reduce((accum, currentValue) => (accum + currentValue)) / newAllRatings.length).toFixed(2)
      setProfileVisualState({
        ...profileVisualState, allRatings: newAllRatings, totalReviews: newTotalReviews, avg_rating: new_avg_rating
      });
      setReviews(data.reviews)
    } else {
      alert('Please enter a comment')
    }
  }

  const onClickEditReview = async (e, props) => {
    const commentClicked = props.id.split('review-button-id_')[1]
    await setState({ ...state, currentReviewEdit: commentClicked, editCommentText: props.value })
    const textAreaEle = document.getElementById(`review-text-area-id_${commentClicked}`);
    await setProfileVisualState({ ...profileVisualState, content: textAreaEle.value, rating: 3 })
    textAreaEle.focus();
  }
  const onEditCommentRating = (e, props) => {
    const commentClicked = props.id.split('review-rating-id_')[1]
    console.log(props);
    setProfileVisualState({ ...profileVisualState, rating: props.rating })
  }

  const onChangeEditReviewTextArea = (e, props) => {
    setState({ ...state, editCommentText: props.value })
  }
  const onClickAddReply = (e, props) => {
    setState({ ...state, confirmMessageOpen: true, confirmMessage: 'Editing this comment' })
  }
  const onCancelReview = (e, props) => {
    setState({
      ...state, currentReviewEdit: null, confirmMessageOpen: false
    })
  }
  const onConfirmReview = (e, props) => {
    setState({
      ...state, currentReviewEdit: null, confirmMessageOpen: false
    })
    handleReviews();
  }
  const onBlurReviewTextArea = (e, props) => {
    console.log(e)
    console.log(props)
    if (state.confirmMessageOpen) {
      setState({ ...state, currentReviewEdit: null })
    }
  }
  let reviewsClientRect;
  useEffect(() => {
    async function fetchData() {
      if (profileVisualState.id) {
        const res = await fetch(`/api/home/restaurant/${profileVisualState.id}`)
        if (res.ok) {
          const data = await res.json()
          const newestSortedReviews = data.reviews.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
          setReviews(newestSortedReviews)
        }
        const reviewsEle = document.getElementById('reviews')
        if (reviewsEle) {
          reviewsClientRect = reviewsEle.getBoundingClientRect()
          console.log(reviewsClientRect)
          setHashLocationState({ ...hashLocationState, reviewsY: reviewsClientRect.top });
        }
      }
    }
    fetchData()
  }, [profileVisualState]);

  const handlePaginationChange = (e, props) => {
    setState({ ...state, currentPage: props.activePage });
  }

  return (
    <>
      <Header as='h3' id='reviews' dividing> Reviews</Header>
      <ReviewsSortingDropdown />
      <ReviewModal profileVisualState={profileVisualState} handleSubmit={handleSubmit} state={state} setState={setState} />
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
      <h2>{profileVisualState.totalReviews} Reviews</h2>
      <Comment.Group size='small' style={{ minHeight: 500 }}>
        {reviews.length && reviews.map((review, index) => {
          if (index >= (state.currentPage - 1) * 10 && index < state.currentPage * 10)
            return (
              <Comment key={index}>
                <Comment.Avatar src='https://central.wisd.us/uploaded/CENTRAL/Pics/Staff/No_photo.png' />
                <Comment.Content>
                  <Comment.Author>{review.user_name}</Comment.Author>
                  {state.currentReviewEdit != review.id ?
                    <>
                      <Comment.Metadata>
                        <div><Rating rating={review.rating} maxRating={5} disabled />Today at 5:42PM</div>
                      </Comment.Metadata>
                      <Comment.Text>{review.content}</Comment.Text>
                      {review.user_id === authSelector.id &&
                        <Comment.Action as={Button} size='mini' color='red' id={`review-button-id_${review.id}`} value={review.content} onClick={onClickEditReview}>Edit</Comment.Action>
                      }
                    </>
                    :
                    <Segment>
                      <Comment.Metadata>
                        <div><Rating defaultRating={review.rating} maxRating={5} id={`review-rating-id_${review.id}`} onRate={onEditCommentRating} /> You may enter a new rating if you wish</div>
                      </Comment.Metadata>
                      <Form reply>
                        <Form.TextArea onBlur={onBlurReviewTextArea} id={`review-text-area-id_${review.id}`} defaultValue={review.content} onChange={onChangeEditReviewTextArea} />
                        <Button content='Add Reply' onClick={onClickAddReply} disabled={!state.editCommentText} labelPosition='left' icon='edit' primary />
                      </Form>
                    </Segment>
                  }
                </Comment.Content>
                <Divider />
              </Comment>
            )
        }
        )}
        {reviews.length == 0 && <Container style={{ minHeight: 500 }}><h1 > NO REVIEWS</h1></Container>}
      </Comment.Group>
      <Segment basic
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Pagination
          defaultActivePage={1}
          onPageChange={handlePaginationChange}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          totalPages={Math.ceil(profileVisualState.totalReviews / 10)}
        />
      </Segment>
      <Confirm
        size='mini'
        open={state.confirmMessageOpen}
        header={state.confirmMessage}
        onCancel={onCancelReview}
        onConfirm={onConfirmReview}
      />
    </>
  )
}

export default Review
