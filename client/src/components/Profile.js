import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import ProfileTabs from './Profile/ProfileTabs';
import ProfileLayout from './Profile/ProfileLayout';
import { useSelector } from 'react-redux'


const Profile = () => {
  const authSelector = useSelector(state => state.authentication)
  return (
    <>
      <ProfileLayout username={authSelector.name} testPoints={845} />
      <Container>
        <ProfileTabs />
      </Container>
    </>
  )
}

export default Profile;
