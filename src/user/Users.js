import React, {Component} from 'react';
import {list, searchUser} from "./apiUser";
import User_Avatar from "../images/User_Avatar.png"
import {Link} from 'react-router-dom';
import {isAuthenticated} from "../auth";

class Users extends Component {

    constructor(){
        super();
        this.state= {
            users: [],
            search : "",
            found : []
        }
    }

    handleChange = (search) => event => {
        this.setState({ [search]: event.target.value });
    };

    clickSubmit = event =>{
        event.preventDefault();
        const token = isAuthenticated().token;
        console.log("searched: ", this.state.search);
        console.log("token: ", token);
        searchUser(this.state.search , token).then(data => {
           if(data.error){
               console.log(data.error);
           }
           else {
               this.setState({found: data});
           }
        });

        this.renderusers(this.state.found);

    };

    componentDidMount() {
        list().then(data =>{
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
    );

    render() {
        const {users} = this.state;
        return (
            <div className={"container"}>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Search User</label>
                        <input
                            className="form-control"
                            type="text"
                            onChange={this.handleChange("search")}
                        />
                    </div>
                    <button
                        onClick={this.clickSubmit}
                        className="btn btn-raised btn-primary"
                    >
                        Search{" "}
                    </button>

                </form>
                <h2 className="mt-5 mb-5">Found users</h2>
                {this.renderusers(this.state.found)}
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderusers(users)}
            </div>

        );
    }
}

export default Users;


