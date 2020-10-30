import React from 'react'
import { Button, Icon, Input, Select, Rating, Form, Image, Modal, Container, TextArea, Checkbox } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

const ReviewModal = ({ restData }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button>Scrolling Content Modal</Button>}
        >
            <Modal.Header as='h1'>Write a review!</Modal.Header>
            <Modal.Content scrolling>
                <Container text>
                    <Modal.Description>
                        <p>How good is {restData.name}?</p>
                        <p><Rating icon='star' defaultRating={3} maxRating={5} /></p>
                    </Modal.Description>
                    <Form style={{ marginTop: '2em' }}>
                        <TextArea placeholder='Write a review' style={{ minHeight: 100 }} />
                    </Form>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ReviewModal
