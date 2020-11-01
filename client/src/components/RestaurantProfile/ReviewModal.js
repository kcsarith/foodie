import React from 'react'
import { Button, Icon, Input, Select, Rating, Form, Image, Modal, Container, TextArea, Checkbox } from 'semantic-ui-react'

const ReviewModal = ({ restData, handleSubmit, state, setState }) => {
    const [open, setOpen] = React.useState(false)
    const handleSubmitReview = (e) => {
        e.preventDefault();
        setOpen(false);
        handleSubmit();
    }
    const handleRate = (e, props) => {
        console.log(props)
        setState({ ...state, rating: props.rating })
    }
    const handleTextAreaChange = (e, props) => {
        console.log(e)
        console.log(props)
        setState({ ...state, content: props.value })
    }
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button fluid>WRITE A REVIEW</Button>}
        >
            <Modal.Header as='h1'>Write a review!</Modal.Header>
            <Modal.Content scrolling>
                <Container text>
                    <Modal.Description>
                        <p>How good is {restData.name}?</p>
                        <p><Rating icon='star' onRate={handleRate} defaultRating={3} maxRating={5} /></p>
                    </Modal.Description>
                    <Form style={{ marginTop: '2em' }}>
                        <TextArea onChange={handleTextAreaChange} placeholder='Write a review' style={{ minHeight: 100 }} />
                    </Form>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleSubmitReview} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ReviewModal
