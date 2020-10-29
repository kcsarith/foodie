import React, { useEffect, useState } from 'react'


function RestReviews({ review }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        async function fetchData() {

            const res = await fetch(`/api/home/reviews/${review.user_id}`)
            const data = await res.json()
            console.log(data)
            setUser(data.user)
        }
        fetchData()
    }, [])

    return (
        <div className='reviews'>
            {user.name}
            <br />
            <br />
            {review.content}
            <br />
            <br />
            Rating: {review.rating}
            <br />
            <br />
        </div>
    )
}

export default RestReviews
