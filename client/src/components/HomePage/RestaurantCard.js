
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
        color: 'lightgray'
    }
}));

export default function RestaurantCard({ rest }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [color, setColor] = useState(false)
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
        setColor(!color)
        await fetchWithCSRF(`/api/users/${userId}/favorites`, {
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
                    <FavoriteIcon onClick={handleFavorite} className={clsx(classes.likeNone, {
                        [classes.likeRed]: color,
                    })} />
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
