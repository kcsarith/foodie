import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';

const FooterSignup = () => {
    const [footerEmail, setFooterEmail] = useState('');
    const handleFooterEmailChange = (e) => {
        setFooterEmail(e.target.value);
    }
    const handleFooterSubmit = () => {

    }
    return (
        <Form onSubmit={handleFooterSubmit}>
            <Form.Group>
                <Form.Input
                    placeholder='Email'
                    name='email'
                    value={footerEmail}
                    onChange={handleFooterEmailChange}
                />
                <Form.Button content='Submit' />
            </Form.Group>
        </Form>
    )
}

export default FooterSignup;
