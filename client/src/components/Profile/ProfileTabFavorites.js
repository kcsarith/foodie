import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Item, Header, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';


const ProfileTabFavorites = () => {
    const id = useSelector(state => state.authentication.id);
    const [myFavorites, setMyFavorites] = useState([])
    const history = useHistory()

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
                        <div key={`${index}-${myFavorite.restaurant_id}`}>
                            <Item>
                                <Item.Image src={myFavorite.img} />
                                <Item.Content>
                                    <Item.Header as='a'>{myFavorite.name}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>{myFavorite.address}</span>
                                    </Item.Meta>
                                    <Item.Description>Rating:  {myFavorite.avg_rating},     Max_Price: ${myFavorite.max_price}</Item.Description>
                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => {
                                            let path = `restaurant/profile/${myFavorite.restaurant_id}`
                                            history.push(path)
                                        }}
                                        >Make Revervation<Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </div>
                    )}
                </Item.Group>
            </Segment>
        </>
    )
}


export default ProfileTabFavorites
