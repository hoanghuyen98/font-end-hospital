import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter () {
        // hung event
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }

    handleAddUser = () => {
        let isValid = this.checkValideInput();
        if(isValid === true) {
            // call api create user
            this.props.createNewUSer(this.state);
        }
        console.log("data model: ", this.state)
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={ () => { this.toggle() }}
                size="lg"
                
            >
                <ModalHeader toggle={ () => { this.toggle() } }>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='model-user-body' style={{"display": "flex", "gap": "15px", "flexWrap": "wrap"}}>
                        <div className='input-container' style={{"width": "50%"}}>
                            <label style={{"display": "block"}}>Email</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }} 
                                type='text' 
                                style={{"width": "200px"}} 
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label style={{"display": "block"}}>Password</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }} 
                                type='password' 
                                style={{"width": "200px"}} 
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container' style={{"width": "50%"}}>
                            <label style={{"display": "block"}}>First Name</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "firstName") }} 
                                type='text' 
                                style={{"width": "200px"}} 
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label style={{"display": "block"}}>Last Name</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "lastName") }} 
                                type='password' 
                                style={{"width": "200px"}} 
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label style={{"display": "block"}}>Address</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }} 
                                type='password' 
                                style={{"width": "200px"}} 
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddUser() }}
                    >
                        Add New User
                    </Button>
                {' '}
                    <Button 
                        color='secondary'
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
