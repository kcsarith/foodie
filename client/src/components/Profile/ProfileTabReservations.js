import React, { useState } from 'react';
import { Button, Header, Label, Item, Icon, Progress, Segment, Transition } from 'semantic-ui-react';


const paragraph = 'This is a test'
const tempImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
const Points = ({ tabState, setTabState }) => {
    return (
        <>
            <Header as='h2' attached='top'>Points</Header>
            <Segment attached>
                <Progress percent={(tabState.pointsCurrent / tabState.pointsUntilReward) * 100} indicating />
            </Segment>
        </>
    )
}

const UpcomingReservations = () => {
    return (
        <>
            <Header as='h2' attached='top'>UpcomingReservations</Header>
            <Segment attached>
                <Transition animation='fade' duration={200}>
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={tempImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>Test Rest1</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>Union Square 14</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Image src={tempImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>Test Rest1</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>IFC Cinema</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right'>Cancel Reservation<Icon name='right chevron' /></Button>
                                    <Label>Limited</Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image src={tempImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>Test Rest1</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>IFC</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right'>Cancel Reservation<Icon name='right chevron' />
                                    </Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Transition>
            </Segment>
        </>
    )
}


const ProfileTabReservations = () => {
    const [tabState, setTabState] = useState({
        pointsCurrent: 845,
        pointsUntilReward: 2000
    });
    return (
        <>
            <Points tabState={tabState} setTabState={setTabState} />
            <UpcomingReservations />
        </>
    )
}

export default ProfileTabReservations
