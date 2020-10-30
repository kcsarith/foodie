import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import star_img from "./star.png";
import { Rating, Header, Icon, Button, Comment, Form } from 'semantic-ui-react'
import ReviewModal from './ReviewModal'

const CommentExampleComment = () => {
    return (
        <>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
    </Header>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='Image' circular>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        </>
    )
}
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


    const updateReview = (e) => {
        e.target.name === 'content' ? setState({ ...state, content: e.target.value }) : setState({ ...state, rating: e.target.value });
        //return setState({ ...state, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
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
            <h3> Reviews </h3>
            <section>
                <form onSubmit={handleSubmit} className='container__form'>
                    <input onChange={updateReview} className='container__reviews__input' type="text" name="content" value={state.content} placeholder="write a review" />
                    <input onChange={updateReview} className='container__ratings__input' type="text" name="rating" value={state.rating} placeholder="rate the restaurant" />
                    <input type="submit" value="" style={{ display: 'none' }} />
                </form>
            </section>
            <section className='container__all-reviews'>
                <CommentExampleComment />
                {reviews.map((review, index) =>
                    <div key={`${index}-${review.restaurant_id}-${review.user_id}`}>
                        <Rating rating={review.rating} maxRating={5} disabled />
                        <div className='container__reviews___star'>
                            <p className='container__reviews__text'>{review.content}</p>
                        </div>
                        <div className='container__reviews__text'>
                            <h6 className='container__reviews__readmore' >try something else</h6>
                        </div>
                    </div>
                )}
            </section>
            <ReviewModal restData={restData} />
        </>
    )
}

export default Review
