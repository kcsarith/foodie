import React from 'react';
import { Segment, Header, Divider, Grid, Container, List } from 'semantic-ui-react';
import FooterSignup from './FooterSignup'
const Footer = () => {
    const discoverFooterItems = ["Dining Rewards", "Private Dining", "Top 100 Restaurants", "Reserve for Others", "Cuisines Near Me", "Restaurants Near Me", "Delivery Near Me", "Cuisines", "Restaurants Open Now"]
    const foodieFooterItems = ["About Us", "Blog", "Careers", "Press"]
    const moreFooterItems = ["Foodie for iOS", "Foodie for Android", "Affiliate Program", "Contact Us"]
    const imageFooterUrls = ['https://cdn.otstatic.com/cfe/5/images/booking_logo@2x-1b5fc1.png', 'https://cdn.otstatic.com/cfe/5/images/priceline_logo@2x-4241e6.png', 'https://cdn.otstatic.com/cfe/5/images/kayak_logo@2x-93a54d.png', 'https://cdn.otstatic.com/cfe/5/images/agoda_logo@2x-1b3b14.png', 'https://cdn.otstatic.com/cfe/5/images/rentalcars_logo@2x-6c0316.png', 'https://cdn.otstatic.com/cfe/5/images/opentable@2x-b4630f.png']
    return (
        <>
            <Segment inverted vertical style={{
                padding: '5em 0em',
                bottom: 0,
                width: '100%',
            }}>
                <Container>
                    <h1>Become an Insider</h1>
                    <p>Gain access to exclusive offers, best-of lists, local events & more (you can unsubscribe any time).</p>
                    <FooterSignup />
                    <Divider />
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='DISCOVER' />
                                <List link inverted>
                                    {discoverFooterItems.map(footerItem =>
                                        <List.Item as='a' href='/'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='FOODIE' />
                                <List link inverted>
                                    {foodieFooterItems.map(footerItem =>
                                        <List.Item as='a'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='MORE' />
                                <List link inverted>
                                    {moreFooterItems.map(footerItem =>
                                        <List.Item as='a'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={15}>
                                Copyright © 2020 Foodie, Inc. 1 Washington St Ste 100, San Anton GA 34104 - All rights reserved.
                            <Divider />
                            </Grid.Column>

                            <Grid.Column width={15}>
                                Foodie is part of Fantasizing Holdings, the world leader in online travel and related services.
                                <div className="ui small images">
                                    {imageFooterUrls.map(image => <img src={image} alt='' />)}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}
export default Footer;
