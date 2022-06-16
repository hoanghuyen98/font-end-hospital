import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    // call api, get data => set state
    // state: luu tru gia tri
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('all')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUSer = async (data) => {
        try {
           let response = await createNewUserService(data)
           if(response && response.errCode !== 0){
               alert(response.errMessage)
           }else {
               await this.getAllUsersFromReact();
               this.setState({
                   isOpenModalUser: false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')
           }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            }else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
        console.log("click delete", user)
    }

    handleEditUser = async (user) => {
        try {
            this.setState({
                isOpenModalEditUser: true,
                userEdit: user
            })
        } catch (error) {
            console.log(error)
        }
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    render() {
        
        let arrUsers = this.state.arrUsers

        return (
            <div className="users-container">
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}  
                    toggleFromParent={this.toggleUserModal} 
                    className='model-user-container'
                    createNewUSer={this.createNewUSer}
                />
                {
                    this.state.isOpenModalEditUser && 
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEditUser}  
                        toggleFromParent={this.toggleUserEditModal} 
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center'>Manage users</div>
                
                <div className='mx-2'>
                    <button 
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddUser()}    
                    ><i className="fas fa-plus px-1"></i>Add User
                    </button>
                </div>
                
                <div className='users-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        { 
                            arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{ item.email }</td>
                                        <td>{ item.firstName }</td>
                                        <td>{ item.lastName }</td>
                                        <td>{ item.address }</td>
                                        <td>
                                            <button className='btn-edit'  onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
