import React from 'react'
import { Button, Icon, Message, Select, Rating, Form, Image, Modal, Container, TextArea, Checkbox } from 'semantic-ui-react'

const ReviewModal = ({ profileVisualState, handleSubmit, state, setState }) => {
    const [open, setOpen] = React.useState(false)
    const handleSubmitReview = (e) => {
        e.preventDefault();
        setState({ ...state, rating: 3, content: '' })
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
            onOpen={() => {
                setState({ ...state, currentReviewEdit: null, });
                setOpen(true)
            }}
            trigger={<Button color='red' fluid>WRITE A REVIEW</Button>}
        >
            <Modal.Header as='h1'>Write a review!</Modal.Header>
            <Modal.Content scrolling>
                <Container text>
                    <Modal.Description>
                        <p>Tell us about your experience at "{profileVisualState.name}"</p>
                        <p><Rating icon='star' onRate={handleRate} defaultRating={3} maxRating={5} /></p>
                    </Modal.Description>
                    <Form style={{ marginTop: '2em' }}>
                        <TextArea onChange={handleTextAreaChange} placeholder='Write a review' style={{ minHeight: 100 }} />
                    </Form>
                    {state.content == '' &&
                        <Message
                            header='Before submitting a review'
                            content='Please enter a comment before proceeding'
                        />
                    }
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' disabled={state.content == '' ? true : false} onClick={handleSubmitReview} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ReviewModal
