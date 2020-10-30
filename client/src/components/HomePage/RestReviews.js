import React, { useEffect, useState } from 'react'
import './RestReviews.css'

function RestReviews({ review }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        async function fetchData() {

            const res = await fetch(`/api/home/reviews/${review.user_id}`)
            const data = await res.json()
            setUser(data.user)
        }
        fetchData()
    }, [review.user_id])

    return (
        <div className='reviews'>
            <div className='reviews__user'>
                {user.name}
            </div>
            <div className='reviews__content'>
                {review.content}
            </div>
            <div className='reviews__rating'>
                Rating: {review.rating}
            </div>
        </div>
    )
}

export default RestReviews
