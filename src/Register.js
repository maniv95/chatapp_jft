/*eslint-disable*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import history from './History';
import {Button} from 'reactstrap';
class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
        form: {
            UserName: "",
            Name: "",
            Email: "",
            Password: "",
        }
    }
   this.onUserName = this.onUserName.bind(this);
   this.onName = this.onName.bind(this);
   this.onEmail = this.onEmail.bind(this);
   this.onPassword =  this.onPassword.bind(this);
   this.onRegister = this.onRegister.bind(this);
  }
  onUserName(a){
    this.setState({UserName: a.target.value});
  }
  onName(b){
    this.setState({Name: b.target.value});
  }
  onEmail(c){
    this.setState({Email: c.target.value});
  }
  onPassword(d){
    this.setState({Password: d.target.value});
  }
  checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
    }
  onRegister(e){
      e.preventDefault();
      if(this.checkProperties(this.state.form)){
          swal("Please fill all the fields.","","info")
      }
      else{
        let formBody = [];
        formBody.push("username=" + encodeURIComponent(this.state.form.UserName));
        formBody.push("name=" + encodeURIComponent(this.state.form.Name));
        formBody.push("email=" + encodeURIComponent(this.state.form.Email));
        formBody.push("password=" + encodeURIComponent(this.state.form.Password));
        formBody = formBody.join("&");
        fetch("http://localhost:8000/api/register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code == 200) {
                    swal("User Registered","","success");
                        this.props.history.push("/Login");
                } else if (data.code == 401) {
                    swal(data.error, " ", "error")
                } else if (data.code == 400) {
                    swal("error", "", "error")
                }
                else {
                    swal("network error", "", "error")
                }
                
            })
            .catch((err) => {
                console.log(err)
                swal("Error To Registration", "", "error")
            })
      }
  }
  onLoginNow(e){
      e.preventDefault();
      this.props.history.push('/Login')
  }
  render() {
    return (
        <div align="center">
          <div >
            <br/>
                <span>
                  Sign Up
                </span>
                <br/>
                <br/>
                <div>
                  <span>
                    User Name
                  </span>
                </div>
                <br/>
                <div>
                  <input type ="text" value={this.state.UserName} onChange={this.onUserName}/>
                  <span/>
                </div>
                <br/>
                <div>
                  <span>
                    Name
                  </span>
                </div>
                <br/>
                <div>
                  <input type ="text" value={this.state.Name} onChange={this.onName}/>
                  <span/>
                </div>
                <br/>
                <div>
                  <span>
                    Email
                  </span>
                </div>
                <br/>
                <div>
                  <input type ="text" value={this.state.Email} onChange={this.onEmail}/>
                  <span/>
                </div>
                <br/>
                <div>
                  <span>
                    Password
                  </span>
                </div>
                <br/>
                <div>
                  <input type ="password" value={this.state.Password} onChange={this.onPassword}/>
                  <span/>
                </div>
                <div>
                  <button onClick={(e)=>this.onRegister(e)} style={{cursor:"pointer"}}>
                    Sign Up
                  </button>
                </div>
                <br/>
                <div>
                  <span>
                    Already a member ?
                  </span>
                  <span onClick={(e)=>this.onLoginNow(e)} style={{cursor:"pointer",color:"blue"}}>
                    Login now
                  </span>
                </div>
                <br/>
            </div>
            <Button onClick={()=> this.props.history.push('/LandingPage')} style={{cursor:"pointer"}}>Back</Button>
        <div/>
      </div>
    );
  }
}
export default withRouter(Register);

