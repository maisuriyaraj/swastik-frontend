import React, { Component } from 'react';
import './chatUi.scss';
import { Button } from '@mui/material';

export default class ChatUI extends Component {
    render() {
        return (
            <>
            <div className='container d-flex justify-content-center align-items-center'>
                <section className="msger" id='chatui'>
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt" /> User Name
                        </div>
                        <div className="msger-header-options">
                            <span>
                                <i className="fas fa-cog" />
                            </span>
                        </div>
                    </header>
                    <main className="msger-chat">
                        <div className="msg left-msg">
                            <div
                                className="msg-img"
                                style={{
                                    backgroundImage:
                                        "url(https://image.flaticon.com/icons/svg/327/327779.svg)"
                                }}
                            />
                            <div className="msg-bubble">
                                <div className="msg-info">
                                    <div className="msg-info-name">BOT</div>
                                    <div className="msg-info-time">12:45</div>
                                </div>
                                <div className="msg-text">
                                    Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                                </div>
                            </div>
                        </div>
                        <div className="msg right-msg">
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
                        </div>
                    </main>
                    <form className="msger-inputarea">
                        <input
                            type="text"
                            className="msger-input"
                            placeholder="Enter your message..."
                        />
                        <Button type="button" className="msger-send-btn">
                            Send
                        </Button>
                        <button type="button" className="msger-send-btn">
                            Pay
                        </button>
                    </form>
                </section>
            </div>

            </>
        )
    }
}
