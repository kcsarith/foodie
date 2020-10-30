import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import star_img from "./star.png";

const Review = ({ id }) => {
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
        <div className="container__region">
            <div className='container__reviews-title'>
                <h3> Reviews </h3>
                <section>
                    <form onSubmit={handleSubmit} className='container__form'>
                        <input onChange={updateReview} className='container__reviews__input' type="text" name="content" value={state.content} placeholder="write a review" />
                        <input onChange={updateReview} className='container__ratings__input' type="text" name="rating" value={state.rating} placeholder="rate the restaurant" />
                        <input type="submit" value="" style={{ display: 'none' }} />
                    </form>
                </section>
                <section className='container__all-reviews'>
                    {reviews.map((review, index) =>
                        <div key={`${index}-${review.restaurant_id}-${review.user_id}`} className='container__reviews'>
                            <div className='container__reviews__star-container'>
                                <img className='container__reviews__star' src={star_img} alt="star" />
                                <img className='container__reviews__star' src={star_img} alt="star" />
                                <img className='container__reviews__star' src={star_img} alt="star" />
                                <img className='container__reviews__star' src={star_img} alt="star" />
                                <img className='container__reviews__star' src={star_img} alt="star" />
                            </div>
                            <div className='container__reviews___star'>
                                <p className='container__reviews__text'>{review.content}</p>
                            </div>
                            <div className='container__reviews__text'>
                                <h6 className='container__reviews__readmore' >try something else</h6>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Review
