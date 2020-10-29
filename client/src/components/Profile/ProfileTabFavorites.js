import React from 'react'
import { Button, Icon, Image, Item, Header, Label, Segment } from 'semantic-ui-react'

const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

const ProfileTabFavorites = () => {
    return (
        <>
            <Header as='h2' attached='top'>Favorites</Header>
            <Segment attached>
                <Item.Group divided>
                    <Item>
                        <Item.Image src='/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header as='a'>Test Rest4</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>Union Square 14</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Image src='/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>Test Rest5</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>IFC Cinema</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Button primary floated='right'>Make Revervation<Icon name='right chevron' /></Button>
                                <Label>Limited</Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Image src='/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>Test Rest6</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>IFC</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Button primary floated='right'>Make Revervation<Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </>
    )
}


export default ProfileTabFavorites
