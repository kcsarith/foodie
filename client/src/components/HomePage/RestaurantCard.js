
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './RestaurantCard.css'
import { useHistory } from 'react-router-dom';
import RestReviews from './RestReviews';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#da3743',
    },
    likeRed: {
        color: 'red'
    },
    likeNone: {
        color: 'none'
    }
}));

export default function RestaurantCard({ rest, favorited, homeBodyVisual, setHomeBodyVisual }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reviews, setReviews] = useState([])
    const [cardVisualState, setCardVisualState] = useState({
        favorited: favorited,
    })
    const history = useHistory()
    const userId = useSelector(state => state.authentication.id)
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const routeChange = () => {
        let path = `restaurant/profile/${rest.id}`
        history.push(path)
    }

    async function handleFavorite() {
        const id = userId
        const restId = rest.id
        if (cardVisualState.favorited) {
            await fetchWithCSRF(`/api/users/${id}/favorites/delete/${restId}`, {
                method: 'DELETE'
            })
            setCardVisualState({ ...cardVisualState, favorited: false });
            let indexOfDeleted = homeBodyVisual.favorites.findIndex(ele => ele.id === restId);
            setHomeBodyVisual({ ...homeBodyVisual, favorites: homeBodyVisual.favorites.splice(indexOfDeleted, 1) });
            alert(`${rest.name} removed from favorites ${indexOfDeleted}`)
        }
        else {
            await fetchWithCSRF(`/api/users/${userId}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    restaurant_id: restId
                })
            })
            setCardVisualState({ ...cardVisualState, favorited: true });
            setHomeBodyVisual({ ...homeBodyVisual, favorites: [...homeBodyVisual.favorites, rest] });
            alert(`${rest.name} added from favorites`)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/${rest.id}`)
            const data = await res.json()
            setReviews(data.reviews)
        }
        fetchData()
    }, [rest.id])

    const restReviews = reviews.map(item => <RestReviews key={item.id} review={item} />)
    const firstLetter = rest.name.slice(0, 1)
    return (
        <div className='rest-card'>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {firstLetter}
                        </Avatar>
                    }
                    title={rest.name}
                    subheader={rest.address}
                    onClick={routeChange}
                />
                <CardContent onClick={routeChange}>
                    <Typography variant="body2" color="textSecondary" className='rest-card__body-img'>
                        <img src={rest.img} alt='' />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                        <FavoriteIcon className={favorited ? classes.likeRed : classes.likeNone} />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{restReviews.length === 0 ? 'No reviews yet!' : 'Reviews:'}</Typography>
                        <Typography paragraph>
                            {restReviews}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
