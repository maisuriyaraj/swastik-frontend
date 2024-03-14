import React, { Component } from 'react';
import './chatUi.scss';
import logo from '../../../assets/swastik_logo.png'
import male from '../../../assets/male.png'
import { Button } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

export default class ChatUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: JSON.parse(sessionStorage.getItem('user')),
            message: "",
            selectedUser: "",
            messageList: [],
            userList: [],
        };
    }

    componentDidMount() {
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
            this.setState({messageList:myMessages});
            this.getUserMessages(this.state.selectedUser._id);
            this.scrollToBottom();
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
                    x.username._id !== this.state.user
                ))
                this.setState({ userList: newData });
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
            this.setState({ messageList: resp.data.data || []})
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
        this.state.socket.emit('privateMessage', { sender: this.state.user, receiver: this.state.selectedUser, message: this.state.message });
        this.setState({message:""});
        this.scrollToBottom();
    }

    scrollToBottom() {
        var messageContainer = document.getElementById("messageContainer");
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    render() {
        const { userList, selectedUser,messageList ,user} = this.state;
        return (

            <>
                <div className='container-fluid px-0 overflow-hidden'>
                    <div className='row'>
                        <div className="col-md-3 px-0">
                            <div className='contact-list'>
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
                                    messageList.map((x) => (
                                            <div className={x.sender === user ? "msg right-msg" : "msg left-msg"}>
                                                <div
                                                    className="msg-img"
                                                    style={{
                                                        backgroundImage:
                                                            "url(https://image.flaticon.com/icons/svg/327/327779.svg)"
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
                                            </div>
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
                                    <Button type="button" onClick={(e) => this.sendMessage(e)} className="msger-send-btn">
                                        Send
                                    </Button>
                                    <button type="button" className="msger-send-btn">
                                        Pay
                                    </button>
                                </form>
                            </section>}
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
