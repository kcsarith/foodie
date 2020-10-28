import React from 'react'
import { Button, Container, Divider, Header, Image, Grid, List, Segment } from 'semantic-ui-react'

const ProfileLayout = ({ username }) => (
    <>
        <Segment style={{ padding: '2em 0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            <h1>{username}</h1>
                        </Header>
                        <p >
                            0 Points
            </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </>
)

export default ProfileLayout
