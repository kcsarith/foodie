import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import { Rating, Divider, Container, Icon, Menu, Dropdown, Comment, Pagination, Segment, Button, Form, Confirm } from 'semantic-ui-react'
import ReviewModal from './ReviewModal'
import { useParams } from "react-router-dom";

const Review = ({ profileVisualState, setProfileVisualState }) => {
  const authSelector = useSelector(state => state.authentication);
  const [reviews, setReviews] = useState([]);
  const restaurant_id = useParams().id;
  const [state, setState] = useState({
    restaurant_id: restaurant_id,
    user_id: authSelector.id,
    content: '',
    rating: 3,
    oldRating: 3,
    dropDownSort: 'Newest',
    currentPage: 1,
    currentReviewEdit: null,
    editCommentText: '',
    confirmMessage: 'Loading...'
  });
  const handleSubmit = () => {
    handleReviews('post');
  }

  const handleOnReviewSortChange = (e, props) => {
    let newSortedReviews = reviews
    switch (props.value) {
      case 'Newest':
        newSortedReviews = reviews.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
        setState({ ...state, dropDownSort: 'Newest', });
        break;
      case 'Oldest':
        newSortedReviews = reviews.sort((currentEle, nextEle) => currentEle.id - nextEle.id);
        setState({ ...state, dropDownSort: 'Oldest' });
        break;
      case 'Highest Rated':
        newSortedReviews = reviews.sort((currentEle, nextEle) => nextEle.rating - currentEle.rating);
        setState({ ...state, dropDownSort: 'Highest Rated' });
        break;
      case 'Lowest Rated':
        newSortedReviews = reviews.sort((currentEle, nextEle) => currentEle.rating - nextEle.rating);
        setState({ ...state, dropDownSort: 'Lowest Rated' });
        break;
      default:
    }
    setReviews(newSortedReviews)
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
          <Dropdown value={state.dropDownSort} onChange={handleOnReviewSortChange} selection placeholder='Newest' options={options} />
        </Menu>
      </>
    )
  }

  async function handleReviews(method, reviewId) {
    const restaurant_id = state.restaurant_id
    const user_id = state.user_id
    const content = state.content;
    const rating = state.rating;
    const id = reviewId;
    let data;
    if (method.toLowerCase() === 'post') {
      const res = await authSelector.csrf(`/api/home/restaurant/${profileVisualState.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurant_id, user_id, content, rating }),
      });
      if (res.ok) {
        data = await res.json()
        const newAllRatings = [...profileVisualState.allRatings, rating]
        const newTotalReviews = profileVisualState.totalReviews + 1
        const new_avg_rating = (newAllRatings.reduce((accum, currentValue) => (accum + currentValue)) / newAllRatings.length).toFixed(2)
        setProfileVisualState({
          ...profileVisualState, allRatings: newAllRatings, totalReviews: newTotalReviews, avg_rating: new_avg_rating
        });

        let newSortedReviews
        switch (state.dropDownSort) {
          case 'Newest':
            newSortedReviews = data.reviews.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
            break;
          case 'Oldest':
            newSortedReviews = data.reviews.sort((currentEle, nextEle) => currentEle.id - nextEle.id);
            break;
          case 'Highest Rated':
            newSortedReviews = data.reviews.sort((currentEle, nextEle) => nextEle.rating - currentEle.rating);
            break;
          case 'Lowest Rated':
            newSortedReviews = data.reviews.sort((currentEle, nextEle) => currentEle.rating - nextEle.rating);
            break;
          default:
        }
        setReviews(newSortedReviews)
      }
      else {
        alert('Please enter a comment')
      }
    }
    else if (method.toLowerCase() === 'patch') {
      const res = await authSelector.csrf(`/api/home/restaurant/${profileVisualState.id}/patch-review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, restaurant_id, user_id, content, rating }),
      });
      if (res.ok) {
        data = await res.json()
        let patchIndex = reviews.findIndex(ele => ele.id == id)
        let reviewsCopy = reviews
        reviewsCopy[patchIndex].content = content;
        reviewsCopy[patchIndex].rating = rating;
        await setReviews(reviewsCopy)
        let allRatingsCopy = profileVisualState.allRatings
        const indexToEdit = allRatingsCopy.indexOf(state.oldRating);
        console.log(state.oldRating)
        allRatingsCopy[indexToEdit] = rating

        const sum = allRatingsCopy.reduce((accum, currentValue) => (accum + currentValue));
        const avg_rating = (sum / allRatingsCopy.length).toFixed(2);
        await setProfileVisualState({ ...profileVisualState, allRatings: allRatingsCopy, avg_rating: avg_rating })
        // const newAllRatings = [...profileVisualState.allRatings, rating]
        // const newTotalReviews = profileVisualState.totalReviews + 1
        // const new_avg_rating = (newAllRatings.reduce((accum, currentValue) => (accum + currentValue)) / newAllRatings.length).toFixed(2)
        // setProfileVisualState({
        //   ...profileVisualState, allRatings: newAllRatings, totalReviews: newTotalReviews, avg_rating: new_avg_rating
        // });
      }
      else {
        alert('Please enter a comment')
      }
    }

    setState({ ...state, currentReviewEdit: null, confirmMessageOpen: false })
  }

  const onClickEditReview = async (e, props) => {
    const commentClicked = props.id.split('review-button-id_')[1]
    await setState({ ...state, currentReviewEdit: commentClicked, content: props.value, rating: props.rating, oldRating: props.rating })
    await setProfileVisualState({ ...profileVisualState, content: props.value, rating: props.rating })
    const textAreaEle = document.getElementById(`review-text-area-id_${commentClicked}`);
    if (textAreaEle) {
      textAreaEle.focus();
    }
  }
  const onEditCommentRating = (e, props) => {
    setState({ ...state, rating: props.rating })
    setProfileVisualState({ ...profileVisualState, rating: props.rating })
  }

  const onChangeEditReviewTextArea = (e, props) => {
    setState({ ...state, content: props.value })
    setProfileVisualState({ ...profileVisualState, content: props.value })
  }
  const onClickAddReply = (e, props) => {
    setState({ ...state, confirmMessageOpen: true, confirmMessage: 'Editing this comment' })
  }
  const onCancelReview = (e, props) => {
    setState({
      ...state, currentReviewEdit: null, confirmMessageOpen: false
    })
  }
  const onConfirmReview = () => {
    const reviewId = parseInt(state.currentReviewEdit)
    handleReviews('patch', reviewId);
  }
  const onBlurReviewTextArea = (e) => {
    const relatedTarget = e.relatedTarget
    if (!relatedTarget) {
      setState({ ...state, currentReviewEdit: null })
    }
  }
  useEffect(() => {
    async function fetchData() {
      if (profileVisualState.id) {
        const res = await fetch(`/api/home/restaurant/${profileVisualState.id}`)
        if (res.ok) {
          const data = await res.json()

          let newSortedReviews
          switch (state.dropDownSort) {
            case 'Newest':
              newSortedReviews = data.reviews.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
              setState({ ...state, dropDownSort: 'Newest' });
              break;
            case 'Oldest':
              setState({ ...state, dropDownSort: 'Oldest' });
              newSortedReviews = data.reviews.sort((currentEle, nextEle) => currentEle.id - nextEle.id);
              break;
            case 'Highest Rated':
              setState({ ...state, dropDownSort: 'Highest Rated' });
              newSortedReviews = data.reviews.sort((currentEle, nextEle) => nextEle.rating - currentEle.rating);
              break;
            case 'Lowest Rated':
              setState({ ...state, dropDownSort: 'Lowest Rated' });
              newSortedReviews = data.reviews.sort((currentEle, nextEle) => currentEle.rating - nextEle.rating);
              break;
            default:
          }

          setReviews(newSortedReviews)
        }
      }
    }
    fetchData()
  }, [profileVisualState.id]);

  const handlePaginationChange = (e, props) => {
    setState({ ...state, currentPage: props.activePage });
  }

  return (
    <>
      <ReviewsSortingDropdown />
      <ReviewModal profileVisualState={profileVisualState} setProfileVisualState={setProfileVisualState} handleSubmit={handleSubmit} state={state} setState={setState} />
      {(reviews.length > 0) &&
        <h2>{profileVisualState.totalReviews} Review(s)</h2>
      }
      <Comment.Group size='small' style={{ minHeight: 500 }}>
        {(reviews.length > 0) && reviews.map((review, index) => {
          if (index >= (state.currentPage - 1) * 10 && index < state.currentPage * 10) {
            return (
              <Comment key={index}>
                <Comment.Avatar src='https://central.wisd.us/uploaded/CENTRAL/Pics/Staff/No_photo.png' />
                <Comment.Content>
                  <Comment.Author>{review.user_name}</Comment.Author>
                  {parseInt(state.currentReviewEdit) !== review.id ?
                    <>
                      <Comment.Metadata>
                        <div><Rating rating={review.rating} maxRating={5} disabled />Today at 5:42PM</div>
                      </Comment.Metadata>
                      <Comment.Text>{review.content}</Comment.Text>
                      {review.user_id === authSelector.id &&
                        <Comment.Action as={Button} size='mini' color='red' id={`review-button-id_${review.id}`} value={review.content} rating={review.rating} onClick={onClickEditReview}>Edit</Comment.Action>
                      }
                    </>
                    :
                    <Segment>
                      <Comment.Metadata>
                        <div><Rating defaultRating={review.rating} maxRating={5} id={`review-rating-id_${review.id}`} onRate={onEditCommentRating} /> You may enter a new rating if you wish</div>
                      </Comment.Metadata>
                      <Form reply>
                        <Form.TextArea onBlur={onBlurReviewTextArea} id={`review-text-area-id_${review.id}`} defaultValue={review.content} onChange={onChangeEditReviewTextArea} />
                        <Button content='Edit Review' onClick={onClickAddReply} disabled={!state.content} labelPosition='left' icon='edit' primary />
                      </Form>
                    </Segment>
                  }
                </Comment.Content>
                <Divider />
              </Comment>
            )
          }
          else {
            return
          }
        }
        )}
        {(!reviews.length) && <Container style={{ minHeight: 500 }}><h1 >NO REVIEWS</h1></Container>}
      </Comment.Group>
      <Segment basic
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {(reviews.length > 0) &&
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
        }
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
