import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Form } from 'semantic-ui-react';
import { usStatesDictionary } from '../../lists/states.js';

const options = usStatesDictionary.map(function (state) {
    return { key: state.name, text: state.name, value: state.abbreviation };
});

console.log(options)

const ProfileTabAccountDetail = () => {
    const authSelector = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: authSelector.name,
        city: authSelector.city,
        state: authSelector.state,
        email: authSelector.email,
        oldPassword: 'password',
        newPassword: ''
    });


    const handleChange = (e, { id, value },) => {
        return setState({ ...state, [id]: value })
    }
    const handleUserUpdate = (e, { children }) => {
        e.preventDefault();
        console.log(children);
        const formData = children.map(child => {
            return { [child.props.id]: state[child.props.id] }
        });
        console.log(formData)
    }
    return (
        <Form action='POST' onSubmit={handleUserUpdate} >
            <Form.Input fluid label='Username' id='name' placeholder='Username' defaultValue={authSelector.name} onChange={handleChange} />
            <Form.Input fluid label='City' id='city' placeholder='City' defaultValue={authSelector.city} onChange={handleChange} />
            <Form.Select
                fluid
                label='State'
                id='state'
                defaultValue={authSelector.state}
                options={options}
                placeholder='State'
            />
            <Form.Input label='Email' type='email' id='email' defaultValue={authSelector.email} placeholder='joe@schmoe.com' onChange={handleChange} />
            <Form.Group>
                <Form.Input label='Old Password' type='password' id='oldPassword' defaultValue='password' onChange={handleChange} />
                <Form.Input label='New Password' type='password' id='newPassword' placeholder='Enter new password' onChange={handleChange} />
            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
        </Form>
    )
}

export default ProfileTabAccountDetail
