import React from "react";
import PropTypes from "prop-types";

// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Box from 'react-styled-box';
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

import { getAllUsers } from '../util/APIUtils'
import defaultImage from "../assets/img/default-avatar.png";
// import bgChats from "../assets/img/sidebar-2.jpg"

class ChatRooom extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            cardAnimation: 'cardHidden',
            isOpen: false,
            users: [],
            imagePreviewUrl: defaultImage
        };
        this.displayUsers = this.displayUsers.bind(this);
        this.openChatRoom = this.openChatRoom.bind(this);
    }

    openChatRoom() {
        console.log('i work in chats');
        this.setState(
            oldState => ({ isOpen: !oldState.isOpen })
        )
    }

    displayUsers() {
        getAllUsers()
            .then(response => {
                this.setState({ users: response })
            }).catch(error => {
                alert(error.message || 'sorry! Something went wrong. Please try again!');
            });
        console.log(this.state.users);
    }

    componentDidMount() {
        this._isMounted = true;
        this.timeOutFunction = setTimeout(
            function () {
                if (this._isMounted) {
                    this.setState({ cardAnimation: "" });
                }
                this.displayUsers();
            }.bind(this),
            700
        );
    }

    componentWillMount() {
        this._isMounted = false;
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }


    render() {
        // const isOpen = this.state.isOpen;
        //const { classes } = this.props;
        // const items = this.state.users.map((user, key) =>
        //     <li
        //         key={user.id}
        //         style={{ borderBottom: '1px solid #aaa' }}
        //         onClick={this.openChatRoom}
        //     >
        //         <div style={{ boxSizing: 'border-box', padding: '2px 10px', display: 'inline-block', textAlign: 'center', }}>
        //             <img
        //                 style={{
        //                     margin: '5px 0px',
        //                     width: '50px',
        //                     height: 'auto',
        //                     align: 'middle',
        //                     borderRadius: '50%',
        //                     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        //                 }}
        //                 src={this.state.imagePreviewUrl}
        //                 alt="..."
        //             />
        //             <div style={{ textAlign: 'center', float: 'right' }}>
        //                 <h3 style={{ margin: '20px' }} >{user.username}</h3>
        //             </div>
        //         </div>
        //     </li>
        // );

        return (
            <div style={{  position: 'fixed', display: 'block', width: '100%' }} >
                <Box width="100%"  >
                    <Box
                        style={{
                            background: 'rgba(0,0,0,0.2)',
                            minHeight: "100vh",
                            height: '100%'
                        }}
                        width='75%'
                        display="block"
                    >
                        <div style={{ backgroundColor: '#db0056' }}>
                            <h2 color="rose"
                                style={{
                                    borderBottom: '2px solid #db0056',
                                    textAlign: 'center',
                                    padding: '20px 0px',
                                    color: '#fff',
                                    margin: 0,
                                    //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                                }}
                            >ChatRooom</h2>
                        </div >
                        
                    </Box>
                </Box >  
            </div>
            
        );
    }
}

ChatRooom.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ChatRooom;
