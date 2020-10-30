import React from 'react'
import { Divider, Header, Image, Grid, Segment } from 'semantic-ui-react'
const tempImageUrl = 'https://previews.123rf.com/images/avectors/avectors1810/avectors181000027/110914215-yummy-smile-vector-cartoon-emoticon-with-tongue-lick-mouth-delicious-tasty-food-eating-emoji-line-fa.jpg'
const ProfileLayout = ({ username, points }) => (
    <>
        <Segment size='small' padded='very' style={{ width: '80%', margin: 'auto', marginTop: '3em', marginBottom: '3em' }}>
            <Image src={tempImageUrl} size='mini' /> Foodie
            <Divider />
            <Grid>
                <Grid.Column floated='left' width={5}>
                    <Header as='h2'>{username}
                        <Header.Subheader>{points} Points</Header.Subheader>
                    </Header>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                    <Header>Hello {username}</Header>
                </Grid.Column>
            </Grid>
        </Segment >
    </>
)

export default ProfileLayout
