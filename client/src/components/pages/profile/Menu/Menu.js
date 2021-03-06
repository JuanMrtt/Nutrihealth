import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import SendToBack from '../../../../services/sendtoback.services'
import TableMenu from './TableMenu'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.sendtoback = new SendToBack()
    }


    render() {

        return (
            <Container>
                {this.props.loggedInUser.userfile ?
                    (
                        <>
                            <h1>Este es tu menú de ésta semana</h1>
                            <h4>Aprobado por: {this.props.loggedInUser.userfile.nutricionist.username}</h4>
                            <TableMenu loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser} />
                        </>
                    )
                    :
                    <>
                        <h1>Este es tu menú de ésta semana</h1>
                        <h4>Tu nutricionista aún no ha establecido tu menú semanal</h4>
                    </>
                }
            </Container >
        )
    }
}

export default Menu