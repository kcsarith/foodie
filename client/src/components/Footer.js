import React from 'react';
import { Segment, Header, Divider, Grid, Container, List } from 'semantic-ui-react';
import FooterSignup from './FooterSignup'
const Footer = () => {
    const discoverFooterItems = ["Dining Rewards", "Private Dining", "Top 100 Restaurants", "Reserve for Others", "Cuisines Near Me", "Restaurants Near Me", "Delivery Near Me", "Cuisines", "Restaurants Open Now"]
    const foodieFooterItems = ["About Us", "Blog", "Careers", "Press"]
    const moreFooterItems = ["Foodie for iOS", "Foodie for Android", "Affiliate Program", "Contact Us"]
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
                    {/* <FooterSignup /> */}
                    <Divider />
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='DISCOVER' />
                                <List link inverted>
                                    {discoverFooterItems.map((footerItem, index) =>
                                        <List.Item key={index} href='/'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='FOODIE' />
                                <List link inverted>
                                    {foodieFooterItems.map((footerItem, index) =>
                                        <List.Item key={index}>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header inverted as='h4' content='MORE' />
                                <List link inverted>
                                    {moreFooterItems.map((footerItem, index) =>
                                        <List.Item key={index} >{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={15}>
                                Copyright © 2020 Foodie, Inc. 1 Washington St Ste 100, San Anton GA 34104 - All rights reserved.
                            <Divider />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}
export default Footer;
