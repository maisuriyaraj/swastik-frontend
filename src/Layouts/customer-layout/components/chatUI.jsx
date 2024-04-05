import React, { Component } from 'react';
import './chatUi.scss';
import logo from '../../../assets/swastik_logo.png'
import male from '../../../assets/male.png'
import { Button, Icon, TextField } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import { postRequest } from '../../../utils/axios-service';
import Loader from '../../../utils/react-loader';

export default class ChatUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: JSON.parse(sessionStorage.getItem('user')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            message: "",
            selectedUser: "",
            messageList: [],
            userList: [],
            pay_msg: "",
            loader: false,
            payOpen: false,
            amount: 0.00,
            mpin: ""
        };
    }

    continuouslyScrolling() {
        let msgContainer = document.getElementById("messageContainer");
        if(msgContainer){
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }

    }

    componentDidMount() {
        this.continuouslyScrolling()
        const socket = io.connect("http://localhost:3001/");

        socket.on("connection", (socket) => {
            console.log("Connected to server");

        });
        socket.emit('join', this.state.user);

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        socket.on("privateMessage", (message) => {
            console.log(message);
            let myMessages = this.state.messageList;
            myMessages.push(message)
            this.setState({ messageList: myMessages });
            this.getUserMessages(this.state.selectedUser._id);
        })

        socket.on("error", (error) => {
            console.error("Socket error:", error);
        });

        this.setState({ socket: socket });
        this.getUserList();
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        const { socket } = this.state;
        if (socket) {
            socket.disconnect();
        }
    }

    getUserList() {
        axios.get('http://localhost:3001/users').then(resp => {
            if (Array.isArray(resp.data.data)) {
                let data = resp.data.data
                let newData = data.filter((x) => (
                    x?.username?._id !== this.state.user
                ))
                this.setState({ userList: newData });
                console.log(this.state.userList)
            } else {
                console.error('API response is not an array:', resp.data);
            }
        }).catch(err => {
            console.log(err)
        })
    };

    getUserMessages(user) {
        axios.get(`http://localhost:3001/userMessages/${user}/${this.state.user}`).then(resp => {
            console.log(resp.data.data);
            this.setState({ messageList: resp.data.data || [] })
        }).catch(err => {
            console.log(err)
        })
    }

    handleOnChangeMessage(e) {
        this.setState({ message: e.target.value })
    }
    selecteUser(user) {
        this.setState({ selectedUser: user });
        this.getUserMessages(user._id)
    }


    sendMessage = (e) => {
        e.preventDefault();
        if (this.state.message !== "") {
            this.state.socket.emit('privateMessage', { sender: this.state.user, receiver: this.state.selectedUser, message: this.state.message });
            this.continuouslyScrolling();
            this.setState({ message: "" });
        } else {
            toast.error("Please Type an Message");
        }
    }

    handleOpenPayModal() {
        this.setState({ payOpen: true });
    }

    handlePayment(e) {
        e.preventDefault();
        const payload = {
            payer_id: this.state.user, payer_mpin: this.state.mpin, payee_id: this.state.selectedUser._id, message: this.state.pay_msg, amount: this.state.amount
        }
        postRequest("/api/onlineTransfer", payload, { 'Authorization': this.state.token }).then((resp) => {
            if (resp.data.status == true && resp.data.code == 201) {
                const message = {
                    amount: this.state.amount
                }
                this.setState({loader:true})
                setTimeout(() => {
                    this.state.socket.emit('privateMessage', { sender: this.state.user, receiver: this.state.selectedUser, message: this.state.pay_msg , is_payment: true, amount: this.state.amount });
                    this.setState({ payOpen: false, amount: 0, mpin: "",loader:false });
                    toast.success(resp.data.message);
                }, 3000);
            } else {
                toast.error(resp.data.message);
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const { userList, selectedUser, payOpen, loader, amount, mpin, pay_msg, messageList, user } = this.state;
        return (

            <>
                <div className='container-fluid px-0 overflow-hidden'>
                    <div className='row'>
                        <div className="col-md-3 px-0">
                            <div className='contact-list'>
                                <div className='w-100 mt-4 px-3 text-end '>
                                    <Icon className='refresh-ico' onClick={()=>{this.getUserList()}} style={{fontSize:"35px",cursor:'pointer'}}>cached</Icon>
                                </div>
                                <ul>
                                    {userList.map((x, i) => (
                                        <li key={i} className={x.username._id === selectedUser._id ? 'activeChat' : ''} onClick={() => this.selecteUser(x.username)}>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <img src={male} width={30} alt="" />
                                                </div>
                                                <div className='mx-3'>
                                                    <span>{x.username.first_name + " " + x.username.last_name}</span>
                                                </div>
                                                {x.is_active && <div className='mx-3'>
                                                    <span className='text-success'>Active</span>
                                                </div>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9 px-0">
                            {selectedUser === "" && <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                                <img src={logo} width={400} alt="" />
                            </div>}
                            {selectedUser !== "" && <section className="msger" id='chatui'>
                                <header className="msger-header">
                                    <div className="msger-header-title">
                                        <i className="fas fa-comment-alt" /> {selectedUser.first_name + "  " + selectedUser.last_name}
                                    </div>
                                    <div className="msger-header-options">
                                        <span>
                                            <i className="fas fa-cog" />
                                        </span>
                                    </div>
                                </header>
                                <main className="msger-chat" id='messageContainer'>
                                    {
                                        messageList.map((x) => (<>
                                            {!x.is_payment && <div className={x.sender === user ? "msg right-msg" : "msg left-msg"}>
                                                <div
                                                    className="msg-img"
                                                    style={{
                                                        backgroundImage:
                                                            `url(${male})`
                                                    }}
                                                />
                                                <div className="msg-bubble">
                                                    <div className="msg-info">
                                                        <div className="msg-info-name"></div>
                                                        <div className="msg-info-time">{x.msgTime || ''}</div>
                                                    </div>
                                                    <div className="msg-text">
                                                        {x.message}
                                                    </div>
                                                </div>
                                            </div>}
                                            {x.is_payment && <div className={x.sender === user ? "msg right-msg" : "msg left-msg"}>
                                                <div
                                                    className="msg-img"
                                                    style={{
                                                        backgroundImage:
                                                            `url(${male})`
                                                    }}
                                                />
                                                <div className="msg-bubble">
                                                    <div className="msg-info">
                                                        <div className="msg-info-name"></div>
                                                        <div className="msg-info-time">{x.msgTime || ''}</div>
                                                    </div>
                                                    <div class="msg-text">
                                                        <div><h1 style={{ fontSize: '30px' }}>₹{x.paid_amount}</h1></div>
                                                        <div><p style={{ fontSize: '14px' }}>{x.message}</p></div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </>
                                        ))
                                    }
                                    {/* {<div className="msg right-msg">
                                        <div
                                            className="msg-img"
                                            style={{
                                                backgroundImage:
                                                    "url(https://image.flaticon.com/icons/svg/145/145867.svg)"
                                            }}
                                        />
                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                                <div className="msg-info-name">Sajad</div>
                                                <div className="msg-info-time">12:46</div>
                                            </div>
                                            <div className="msg-text">You can change your name in JS section!</div>
                                        </div>
                                    </div>} */}
                                </main>
                                <form className="msger-inputarea">
                                    <input
                                        type="text"
                                        className="msger-input"
                                        value={this.state.message}
                                        onChange={(e) => this.handleOnChangeMessage(e)}
                                        placeholder="Enter your message..."
                                    />
                                    <Button type="submit" onClick={(e) => this.sendMessage(e)} className="msger-send-btn">
                                        Send
                                    </Button>
                                    <Button type="button" onClick={() => this.setState({ payOpen: true })} className="msger-send-btn">
                                        Pay
                                    </Button>
                                </form>
                            </section>}
                        </div>
                    </div>

                    <Modal isOpen={payOpen} size='md' centered>
                        <ModalHeader>Payment to : {selectedUser.first_name + "  " + selectedUser.last_name}</ModalHeader>
                        <ModalBody>
                            {!loader && <form onSubmit={(e) => this.handlePayment(e)}>
                                <div className="row">
                                    <div className="col-md-12 mt-2 mb-3">
                                        <TextField id="balance" value={amount} onChange={(e) => this.setState({ amount: e.target.value })} type='number' label="Amount" fullWidth variant="filled" required />
                                    </div>
                                    <div className="col-md-12 mt-2 mb-3">
                                        <TextField id="pay_msg" value={pay_msg} onChange={(e) => this.setState({ pay_msg: e.target.value })} type='text' label="Message" fullWidth variant="filled" required />
                                    </div>
                                    <div className="col-md-12 mt-2 mb-3">
                                        <TextField id="mpin" type='password' value={mpin} onChange={(e) => this.setState({ mpin: e.target.value })} label="MPIN" fullWidth variant="filled" required />
                                    </div>
                                </div>
                                <Button variant='contained' type='submit' className='mt-3 mx-1' color='primary' size='large'>Pay</Button>
                                <Button variant='contained' type='button' className='mt-3 mx-1' color='warning' size="large" onClick={() => this.setState({ payOpen: false })}>Cancle</Button>
                            </form>}

                            {loader && <Loader loading={loader} className="loader" />}

                        </ModalBody>
                    </Modal>
                </div>
            </>
        )
    }
}
