import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Form, Message } from 'semantic-ui-react';
import { usStatesDictionary } from '../../lists/states.js';
import { patchUser } from '../../store/authentication'

const options = usStatesDictionary.map(function (state) {
    return { key: state.name, text: state.name, value: state.abbreviation };
});


const MessageExampleDismissibleBlock = ({ header, content, status, errors }) => {
    const [messageState, setMessageState] = useState({
        visible: true,
        header: header,
        content: content,
        errors: errors
    });
    const handleDismiss = () => {
        setMessageState({ ...messageState, visible: false })
    }
    return (
        <>
            { status !== 'success' && <Message
                warning
                onDismiss={handleDismiss}
                content={messageState.content}
            >
                <Message.Header>{messageState.header}</Message.Header>
                <Message.List>
                    {messageState.errors !== undefined && messageState.errors.map(error => (
                        < Message.Item >{error}</Message.Item>)
                    )}
                </Message.List>
            </Message>
            }
            { status === 'success' && <Message
                success
                onDismiss={handleDismiss}
                header={messageState.header}
                content={messageState.content}
            />}
        </>
    )
}

const ProfileTabAccountDetail = () => {
    const authSelector = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        id: authSelector.id,
        name: authSelector.name,
        city: authSelector.city,
        state: authSelector.state,
        email: authSelector.email,
        oldPassword: 'password',
        newPassword: ''
    });
    const [messageState, setMessageState] = useState({
        visible: false,
        header: 'Settings Changed!',
        content: '',
        errors: [],
        status: 'success'
    });

    const handleChange = (e, { id, value },) => {
        return setFormState({ ...formState, [id]: value })
    }

    const handleUserUpdate = (e, { children }) => {
        e.preventDefault();
        async function fetchData() {
            const res = await dispatch(patchUser(formState));
            if (res.res.ok) {
                if (res.errors !== undefined) {
                    let errorsContent = '';
                    setMessageState({ ...messageState, errors: res.errors })
                    for (let i = 0; i < res.errors.length; i++) {
                        const ele = res.errors[i];
                        errorsContent += ele + '<br />'
                        if (i < res.errors.length - 2) {
                            errorsContent += '\r'
                        }
                    }
                    setMessageState({ ...messageState, errors: res.errors, status: 'warning', header: 'Error', content: errorsContent, visible: true })
                } else {
                    setMessageState({ ...messageState, errors: res.errors, status: 'success', header: 'Settings', content: 'No errors updating the profile', visible: true })
                }
            } else {
                setMessageState({ ...messageState, errors: res.errors, status: 'warning', header: 'Error', content: 'Internal Server Error', visible: true })
            }
            setTimeout(() => {
                setMessageState({ ...messageState, errors: res.errors, visible: false });
            }, 1000)
        }
        fetchData();
    }
    return (
        <>
            <h1>Account Details</h1>
            <Form action='POST' onSubmit={handleUserUpdate} >
                <Form.Input required fluid label='Username' id='name' placeholder='Username' defaultValue={authSelector.name} onChange={handleChange} />
                <Form.Input required fluid label='City' id='city' placeholder='City' defaultValue={authSelector.city} onChange={handleChange} />
                <Form.Select
                    fluid
                    label='State'
                    id='state'
                    onChange={handleChange}
                    defaultValue={authSelector.state}
                    required
                    options={options}
                    placeholder='State'
                />
                <Form.Input required label='Email' type='email' id='email' defaultValue={authSelector.email} placeholder='joe@schmoe.com' onChange={handleChange} />
                <Form.Group>
                    <Form.Input label='Old Password' type='password' id='oldPassword' defaultValue='password' onChange={handleChange} />
                    <Form.Input label='New Password' type='password' id='newPassword' placeholder='Enter new password' onChange={handleChange} />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
            {messageState.visible && <MessageExampleDismissibleBlock
                header={messageState.header} content={messageState.content} status={messageState.status} errors={messageState.errors} />}
        </>
    )
}
export default ProfileTabAccountDetail
