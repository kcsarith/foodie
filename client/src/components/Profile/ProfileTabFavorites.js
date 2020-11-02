import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Icon, Item, Header, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import './ProfileTabFavorites.css';


const ProfileTabFavorites = () => {
    const id = useSelector(state => state.authentication.id);
    const [myFavorites, setMyFavorites] = useState([])
    const history = useHistory()
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    async function removeFavorite(rest_id) {
        await fetchWithCSRF(`/api/users/${id}/favorites/delete/${rest_id}`, {
            method: 'DELETE'
        })
    }

    useEffect(() => {
        async function fetchFavorites() {
            const res = await fetch(`/api/users/${id}/favorites`)
            const data = await res.json()
            setMyFavorites(data.favorites)
        }
        fetchFavorites()
    }, [id])

    return (
        <>
            <Header as='h2' attached='top'>Favorites</Header>
            <Segment attached>
                <Item.Group divided>
                    {myFavorites.map((myFavorite, index) =>
                        <div key={`${index}-${myFavorite.id}`}>
                            <div className='profile-favs'>
                                <div className='profile-favs__img'>
                                    <img src={myFavorite.img} />
                                </div>
                                <div className='profile-favs__stuff'>
                                    <div className='profile-favs__info'>
                                        <div className='profile-favs__name'>
                                            {myFavorite.name}
                                        </div>
                                        <div className='profile-favs__address'>
                                            {myFavorite.address}
                                        </div>
                                    </div>

                                    <div className='profile-favs__btn'>
                                        <button className='reserve-btn' primary floated='right' onClick={() => {
                                            let path = `restaurant/profile/${myFavorite.id}`
                                            history.push(path)
                                        }}>
                                            Make Revervation<Icon name='right chevron' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Item.Group>
            </Segment>
        </>
    )
}


export default ProfileTabFavorites
