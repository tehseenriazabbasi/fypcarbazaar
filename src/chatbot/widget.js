import React, {Component} from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, setQuickButtons, handleQuickButtonClicked } from 'react-chat-widget'
import {sendMessage} from "./apiChatbot";
import logo from "../images/cblogo.png";

class chatWidget extends Component {

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        this.processMessage(newMessage);
    };

    handleQuickButtonClicked = (message) => {
        this.setState({city:message});

        console.log("quickbtn.input.text" + message.input.text);

        this.processMessage(message.input.text);
    };

    processMessage = (message) => {
        sendMessage(message).then(data=>{
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
        this.processMessage("hey");
    }

    render() {
        return (
            <div>
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    handleQuickButtonClicked={this.handleQuickButtonClicked}
                    title="Car Bazaar Assistant"
                    subtitle="i am here to help"
                    titleAvatar ={logo}
                    profileAvatar ={logo}
                />
            </div>
        );
    }
}

export default chatWidget;