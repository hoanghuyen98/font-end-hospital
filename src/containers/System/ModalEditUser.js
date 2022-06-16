import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
import UserManage from './UserManage';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let { currentUser } = this.props
        this.setState({
            id: currentUser.id,
            email: currentUser.email,
            password: "hashcode ",
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            address: currentUser.address
        })
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

    handleEditUser = () => {
        let isValid = this.checkValideInput();
        if(isValid === true) {
            // call api create user
            this.props.editUser(this.state);
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
                    Edit a new user
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
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label style={{"display": "block"}}>Password</label>
                            <input 
                                
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }} 
                                type='password' 
                                style={{"width": "200px"}} 
                                value={this.state.password}
                                disabled
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
                                type='text' 
                                style={{"width": "200px"}} 
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label style={{"display": "block"}}>Address</label>
                            <input 
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }} 
                                type='text' 
                                style={{"width": "200px"}} 
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleEditUser() }}
                    >
                        Save User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
