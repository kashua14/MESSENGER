import React from "react";
import PropTypes from "prop-types";

// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Box from 'react-styled-box';
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
import sidebarStyle from "../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
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

import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar'


function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}


class ChatHeads extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        cardAnimation: 'cardHidden',
        //isOpen: false,
        
    }; 
  }

componentDidMount(){
  this._isMounted = true;
  this.timeOutFunction = setTimeout(
    function() {
      if (this._isMounted) {
        this.setState({ cardAnimation: "" });
      }
     
    }.bind(this),
    700
  );
}

componentWillMount(){
  this._isMounted = false;
  clearTimeout(this.timeOutFunction);
  this.timeOutFunction = null;
}


  render() {
    
    const { classes } = this.props;
    const users = this.props;
  console.log(users);
    return (
      <div style={{ right: '5px'}} >
          <div
            style={{
              backgroundColor: '#ccc',
              minHeight:"100%",
              height: '100%',
              // position: 'fixed'
            }} >
            <div >
              <div style={{ position: 'sticky' ,backgroundColor: '#db0056'}}>
                <h2 
                  style={{ 
                    borderBottom: '2px solid #db0056', 
                    textAlign: 'center', 
                    padding: '20px 0px', 
                    color: '#fff',
                    margin: 0,
                  }} 
                >CHATS</h2>
              </div >
                  <div Style={{ overflowY: 'scroll'}}>
                    <ul style={{ margin: '0px auto', listStyleType: 'none', padding: 0 }}>
                      {classes.users.map((user) =>
                        <ListItem key={user.id}
                          value={user.username} />
                      )}
                    </ul>
                  </div>
            </div>
          </div>
      </div>
      
    );
  }
}

ChatHeads.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(ChatHeads);
