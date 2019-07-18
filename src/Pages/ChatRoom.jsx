import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
// import { makeStyles } from "@material-ui/styles";
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Box from 'react-styled-box';
// import SendIcon from '@material-ui/icons/Send'
// import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Refresh from "@material-ui/icons/Refresh";
// import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
// import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
// import ChatBubble from 'react-chat-bubble';
// import App from "./App.jsx";
// import sidebarStyle from "../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
// import CustomInput from "../components/CustomInput/CustomInput.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import GridContainer from "../components/Grid/GridContainer.jsx";
// import GridItem from "../components/Grid/GridItem.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import Danger from "../components/Typography/Danger.jsx";
// import Card from "../components/Card/Card.jsx";
// import CardHeader from "../components/Card/CardHeader.jsx";
// import CardIcon from "../components/Card/CardIcon.jsx";
// import CardBody from "../components/Card/CardBody.jsx";
// import CardFooter from "../components/Card/CardFooter.jsx";

// import { getAllUsers } from '../util/APIUtils'
import Message from './Message.js';
// import defaultImage from "../assets/img/default-avatar.png";
import './App.css';

import { sendMessage, getChatHistory } from "../util/APIUtils.js";
// import bgChats from "../assets/img/sidebar-2.jpg"

class ChatRooom extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            cardAnimation: 'cardHidden',
            message:'',
            chats: [{
                    username: "Kevin Hsu",
                    content: <p>Hello World!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }, {
                    username: "Alice Chen",
                    content: <p>Love it! :heart:</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",    
                }, {
                    username: "Kevin Hsu",
                    content: <p>Check out my Github at https://github.com/WigoHunter</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }, {
                    username: "KevHs",
                    content: <p>Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.</p>,
                    img: "http://i.imgur.com/ARbQZix.jpg",
                }, {
                    username: "Kevin Hsu",
                    content: <p>So</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }, {
                    username: "Kevin Hsu",
                    content: <p>Chilltime is going to be an app for you to view videos with friends</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }, {
                    username: "Kevin Hsu",
                    content: <p>You can sign-up now to try out our private beta!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }, {
                    username: "Alice Chen",
                    content: <p>Definitely! Sounds great!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",     
                }]
        };
        this.submitMessage = this.submitMessage.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();
        const msg = ReactDOM.findDOMNode(this.refs.msg).value;
        msg.trim();
        /*
        * eliminate strings that contain spaces only 
        */

        if (/\S/.test(msg)){
           const sentMessage = {
               senderId: this.props.currentUserId,
               recieverId: this.props.userId,
               content: ReactDOM.findDOMNode(this.refs.msg).value
           }
           console.log(sentMessage);
            sendMessage(sentMessage)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    alert(error.message || 'sorry! Something went wrong. Please try again!');
                });
            this.setState({
                chats: this.state.chats.concat([{
                    username: "Kevin Hsu",
                    content: <p style={{margin: 0, display: 'inline-block', textOverflow: 'clip' }}>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                    // img: "http://i.imgur.com/Tj5DGiO.jpg",
                }])
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = "";
            }); 
        }else{
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        }
        // console.log(this.props.userId);
    }
    componentDidMount() {
        this.scrollToBot();
        getChatHistory(this.props.currentUserId, this.props.userId)
            .then(response => {
                console.log(response)
                this.setState({
                    chats: response
                })
            }).catch(error => {
                alert(error.message || 'sorry! Something went wrong. Please try again!');
            });
            console.log(this.state.chats)
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }


    render() {
        const username = "Kevin Hsu";
        const { chats } = this.state;
        // let userId = this.props.userId;
        // console.log(this.props.userId);

        return (
            <div 
                style={{ 
                    boxSizing:'border-box',
                    width: '100%',
                    
                    }} 
                >
                    <div 
                         style={{ backgroundColor: '#db0056', width: '100%', height: '25%'}}
                    >
                            <h2 
                                style={{
                                    fontFamily: 'Pacifico, cursive',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    display: 'block',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    padding: '20px 0px', 
                                    margin: 0,
                         }}
                            >MIS MESSENGER</h2>
                        </div >
                    {/*
                        // Messages =========================================================================================
                    */}
                    <div >
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', minHeight: '100vh'}}>
                            <ul
                                ref="chats"
                                style={{
                                    padding: '0px 20px',
                                    height: '600px',
                                    margin: 0,
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    boxSizing: 'border-box'
                                }}
                            >
                                {
                                    chats.map((chat) =>
                                    <Message 
                                        chat={chat} 
                                        user={username} 
                                    />
                                    )
                                }
                            </ul>
                            <form 
                                onSubmit={(e) => this.submitMessage(e)}
                                style={{
                                    borderTopRightRadius: '5px',
                                    borderBottomRightRadius: '5px',
                                    display: 'inline-block',
                                    alignItems: 'center',
                                    width: '95%',
                                    height: '20%',
                                    padding: '1px 5px'
                                }}
                            >
                                <input type="text" placeholder="Type your message ..." ref="msg" 
                                    style={{
                                        backgroundColor: '#ccc',
                                        color: 'black',
                                        width: '93%', padding: '0px 5px', fontSize: '20px',
                                        outline: 0,
                                        borderTopLeftRadius: '5px',
                                        borderBottomLeftRadius: '5px',
                                        height: '40px',
                                    }}
                                />
                                <input type="submit" value="Send"
                                    style={{
                                        padding: 10,
                                        backgroundColor: '#db0056',

                                        color: 'white',
                                        borderTopRightRadius: '5px',
                                        borderBottomRightRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: 'large'
                                    }}
                                />
                            </form>
                        </div>
                    </div>
            </div>
            
        );
    }
}

ChatRooom.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ChatRooom;
