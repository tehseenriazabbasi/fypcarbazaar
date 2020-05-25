import React from "react";
import Posts from "../Post/Posts";
/*import {verifyLink} from "../auth/index";*/
import  {Component} from 'react';
import {authenticate, isAuthenticated} from "../auth/index";
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, setQuickButtons, handleQuickButtonClicked } from 'react-chat-widget'
import Carousel from 'react-bootstrap/Carousel'

import slider1 from "../images/s.jpg";
import slider2 from "../images/s2.jpg";
import slider3 from "../images/s3.jpg";
import logo from "../images/cblogo.png";
import 'react-chat-widget/lib/styles.css';
import './home.css';
import {sendMessage, getSession , storeSession ,createSession} from "../chatbot/apiChatbot";



class Home extends Component {

    constructor(){
        super();
        this.state = {
            city: ""
        }
    }


    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        const sessionId = getSession().result.session_id;
        this.processMessage(newMessage, sessionId);
    };

    handleQuickButtonClicked = (message) => {
        const sessionId = getSession().result.session_id;
        this.setState({city:message});
        this.processMessage(message.input.text, sessionId);
    };

    processMessage = (message, sessionid) => {
        sendMessage(message, sessionid).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{

                if(data.result.output.generic[0].response_type == "option")
                {
                    addResponseMessage(data.result.output.generic[0].title);
                    setQuickButtons(data.result.output.generic[0].options);
                }
                else if(data.result.output.generic[0].response_type == "image"){
                    addResponseMessage(data.result.output.generic[0].title);

                }
                else {
                    addResponseMessage(data.result.output.generic[0].text);
                }
            }
        })
    };

    componentDidMount() {

        /*this.processMessage("hey");*/

        if(window.sessionStorage.getItem("IMB") == null){
            createSession().then(data => {
                if(data.error)
                    console.log(data.error)
                else{
                    storeSession(data, ()=>{
                        console.log("session stored")
                    })

                    const sessionId = getSession().result.session_id;
                    console.log("id: " + sessionId);

                    this.processMessage("hey", sessionId);
                }
            })

        }
        else {
            const sessionId = getSession().result.session_id;
            this.processMessage("hey", sessionId);
        }




    }

    render() {
        return (
            <div>





                <div className="">
                    <Posts />
                </div>
                <div className="App">
                    <Widget
                        handleNewUserMessage={this.handleNewUserMessage}
                        handleQuickButtonClicked={this.handleQuickButtonClicked}
                        title="Car Bazaar Assistant"
                        subtitle="i am here to help"
                        titleAvatar ={logo}
                        profileAvatar ={logo}
                    />
                </div>
            </div>
        );
    }
}



export default Home;
