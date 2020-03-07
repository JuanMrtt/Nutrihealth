import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import ProfileModal from './Modal/ProfileModal'
import SendToBack from '../../../services/sendtoback.services'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: '',
            weight: '',
            age: '',
            activitylevel: '',
            goal: '',
            city: '',
            intolerances: '',
            preferences: '',
        }
        this.sendtobackservices = new SendToBack()

    }

    // preferencesUser = (preferences) => {
    //     console.log(preferences)
    //     console.log(this.sendtobackservices)
    //     this.sendtobackservices.preferencesUser(preferences)
    //         .then(allPreferences => {
    //             console.log(allPreferences)
    //             this.setState({ allPreferences })
    //         })
    //         .catch(err => console.log(err))
    // }

    // handleSubmit = e => {
    //     e.preventDefault()
    //     this.preferencesUser(this.state)
    // }

    // handleChange = e => {
    //     let { name, value } = e.target
    //     this.setState(
    //         { ...this.state, [name]: value }
    //     )
    // }

    render() {
        return (
            <>
                <Container>
                    <h1>Hola este es tu perfil {this.props.loggedInUser.username}</h1>
                    <ProfileModal />
                </Container>
            </>
        )


    }
}

export default Profile
