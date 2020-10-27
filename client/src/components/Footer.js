import React from 'react';
import { Segment, Header, Divider, Grid, Container, List, Image } from 'semantic-ui-react';
import FooterSignup from './FooterSignup'
const Footer = () => {
    const discoverFooterItems = ["Dining Rewards", "Private Dining", "Top 100 Restaurants", "Reserve for Others", "Cuisines Near Me", "Restaurants Near Me", "Delivery Near Me", "Cuisines", "Restaurants Open Now"]
    const opentableFooterItems = ["About Us", "Blog", "Careers", "Press"]
    const moreFooterItems = ["OpenTable for iOS", "OpenTable for Android", "Affiliate Program", "Contact Us"]
    const imageFooterUrls = ['https://cdn.otstatic.com/cfe/5/images/booking_logo@2x-1b5fc1.png', 'https://cdn.otstatic.com/cfe/5/images/priceline_logo@2x-4241e6.png', 'https://cdn.otstatic.com/cfe/5/images/kayak_logo@2x-93a54d.png', 'https://cdn.otstatic.com/cfe/5/images/agoda_logo@2x-1b3b14.png', 'https://cdn.otstatic.com/cfe/5/images/rentalcars_logo@2x-6c0316.png', 'https://cdn.otstatic.com/cfe/5/images/opentable@2x-b4630f.png']
    return (
        <>
            <Segment inverted vertical style={{
                padding: '5em 0em', position: 'fixed',
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
                                <Header inverted as='h4' content='OPENTABLE' />
                                <List link inverted>
                                    {opentableFooterItems.map(footerItem =>
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
                                Copyright © 2020 OpenTable, Inc. 1 Montgomery St Ste 700, San Francisco CA 94104 - All rights reserved.
                            <Divider />
                            </Grid.Column>

                            <Grid.Column width={15}>
                                OpenTable is part of Booking Holdings, the world leader in online travel and related services.
                                <div class="ui small images">
                                    {imageFooterUrls.map(image => <img src={image} />)}
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
