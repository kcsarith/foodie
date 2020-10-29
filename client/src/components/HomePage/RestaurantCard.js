
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
import { red } from '@material-ui/core/colors';
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
        backgroundColor: red[500],
    },
}));

const images = ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60']

const random = Math.floor(Math.random() * images.length);
const randomImg = images[random]

export default function RestaurantCard({ rest }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reviews, setReviews] = useState([])
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
        await fetchWithCSRF('/api/home/restaurant/favorite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: id,
                restaurant_id: restId
            })
        })
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/${rest.id}`)
            const data = await res.json()
            setReviews(data.reviews)
        }
        fetchData()
    }, [])

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
                        <img src={randomImg} />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon onClick={handleFavorite} />
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
