import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import MenuForm from './MenuForm'
class MenuModal extends Component {
    constructor(props) {
        super(props)
        this.state = { showmodal: false }
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })


    render() {

        return (
            <Container>

                <Button className="greenButton" variant="light" onClick={this.openModal}>
                    Introduce su menú
                </Button>

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Introduce su menú</h3>
                        <hr></hr>
                        <MenuForm loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser} clientId={this.props.clientId} closeModal={this.closeModal} />
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default MenuModal