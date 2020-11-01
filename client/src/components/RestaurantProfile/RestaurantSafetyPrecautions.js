import React from 'react'
import { List, Divider } from 'semantic-ui-react'

const RestaurantSafetyPrecautions = () => {
    return (
        <>
            <h4>Safety precautions</h4>
            <Divider />
            <List>
                <List.Header>Cleaning & Sanitizing</List.Header>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Surfaces sanitized between seatings</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Common areas deep cleaned daily</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Digital, disposable or sanitized menu provided</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Sanitizer or wipes provided for customers</List.Content>
                </List.Item>
            </List>
            <List>
                <List.Header>Social Distancing</List.Header>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Limited number of seated diners</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='shield alternate' />
                    <List.Content>Distancing maintained in common areas</List.Content>
                </List.Item>
            </List>
        </>
    )
}

export default RestaurantSafetyPrecautions
