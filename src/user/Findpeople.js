import React, {Component} from 'react';
import {findpeople} from "./apiUser";
import User_Avatar from "../images/User_Avatar.png"
import {Link} from 'react-router-dom';
import {isAuthenticated} from "../auth";

class Findpeople extends Component {

    constructor(){
        super();
        this.state= {
            users: []
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findpeople(userId, token).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({users: data});
            }
        });
    }

    renderusers= (users) => (
        <div className={"row"}>
            {users.map((user,i)=>(
                <div className="card col-md-4"  key={i}>
                    <img className={"img-thumbnail"} src={"http://localhost:8080/user/photo/"+user._id} alt={user.name} style={{width: 'auto' , height : "200px"}}
                         onError={i => (i.target.src = `${User_Avatar}`)}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text"> {user.email}</p>
                        <Link to={`/user/${user._id}`} className="btn  btn-raised btn-primary btn-sm">View Profile</Link>
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        const {users} = this.state;
        return (
            <div className={"container"}>
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderusers(users)};
            </div>


        );
    }
}

export default Findpeople;


