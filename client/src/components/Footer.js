import React from 'react';
import { Segment, Header, Divider, Grid, Container, List } from 'semantic-ui-react';

const Footer = () => {

    return (
        <>
            <Segment inverted vertical style={{
                padding: '5em 0em',
                bottom: 0,
                width: '100%',
            }}>

                {/* */}
                <Container>
                    <h1>Contributers</h1>
                    {/* <p>Gain access to exclusive offers, best-of lists, local events & more (you can unsubscribe any time).</p> */}
                    {/* <FooterSignup /> */}
                    <Divider />
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Tom Xu' />
                                <List link inverted>
                                    <a href="https://www.linkedin.com/in/tom-xu-dupont/" target="_blank" rel="noopener noreferrer">
                                        <List.Item>LinkedIn <i class="linkedin icon"></i></List.Item>
                                    </a>
                                    <a href="https://github.com/xxl4tomxu98" target="_blank" rel="noopener noreferrer">
                                        <List.Item>GitHub <i class="github icon"></i></List.Item> 
                                    </a>
                                     <a href="https://angel.co/u/xxl4tomxu98" target="_blank" rel="noopener noreferrer">
                                        <List.Item>AngelList <i class="angellist icon"></i></List.Item> 
                                    </a>   
                                </List>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Matt Zamora' />
                                <List link inverted>
                                    <a href="https://www.linkedin.com/in/matt-zamora-95b38316b/" target="_blank" rel="noopener noreferrer">
                                        <List.Item>LinkedIn <i class="linkedin icon"></i></List.Item>
                                    </a>
                                    <a href="https://github.com/MattZ-2051" target="_blank" rel="noopener noreferrer">
                                        <List.Item>GitHub <i class="github icon"></i></List.Item> 
                                    </a>
                                    <a href="https://angel.co/u/matt-zamora-1" target="_blank" rel="noopener noreferrer">
                                        <List.Item>AngelList <i class="angellist icon"></i></List.Item> 
                                    </a>      
                                </List>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Krisna Sarith' />
                                <List link inverted>
                                    <a href="https://www.linkedin.com/in/krisna-sarith-11788b1b9/" target="_blank" rel="noopener noreferrer">
                                        <List.Item>LinkedIn <i class="linkedin icon"></i></List.Item>
                                    </a>
                                    <a href="https://github.com/kcsarith" target="_blank" rel="noopener noreferrer">
                                        <List.Item>GitHub <i class="github icon"></i></List.Item> 
                                    </a>
                                    <a href="https://angel.co/u/krisna-charlie-sarith" target="_blank" rel="noopener noreferrer">
                                        <List.Item>AngelList <i class="angellist icon"></i></List.Item> 
                                    </a>     
                                </List>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Yongho Kim' />
                                <List link inverted>
                                    <a href="https://www.linkedin.com/in/yongho-kim-024451199/" target="_blank" rel="noopener noreferrer">
                                        <List.Item>LinkedIn <i class="linkedin icon"></i></List.Item>
                                    </a>
                                    <a href="https://github.com/yongho12" target="_blank" rel="noopener noreferrer">
                                        <List.Item>GitHub <i class="github icon"></i></List.Item> 
                                    </a>
                                    <a href="https://angel.co/u/yongho-kim-2" target="_blank" rel="noopener noreferrer">
                                        <List.Item>AngelList <i class="angellist icon"></i></List.Item> 
                                    </a>    
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
