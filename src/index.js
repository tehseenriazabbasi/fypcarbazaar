import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CometChat } from "@cometchat-pro/chat"

var appID = '2009669783f36e1';
var region = 'us';
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(() => {

        if(CometChat.setSource) {
            CometChat.setSource("ui-kit", "web", "reactjs");
        }
        console.log("Initialization completed successfully");

        ReactDOM.render(<App />, document.getElementById("root"));
    },
    error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
);


