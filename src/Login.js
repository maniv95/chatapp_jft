/*eslint-disable*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap';
// import swal from 'sweetalert';
import swal from 'sweetalert2';
import history from './history';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
            UserName: "",
            Password: "",
    }
    this.onUserName = this.onUserName.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  onUserName(a){
    this.setState({Username: a.target.value});
  }
  onPassword(b){
    this.setState({Password: b.target.value});
  }
    onLogin(e){
        e.preventDefault();
          try {
            let formBody = [];
            formBody.push("username=" + encodeURIComponent(this.state.Username));
            formBody.push("password=" + encodeURIComponent(this.state.Password));
            formBody = formBody.join("&");
            fetch("http://localhost:8081/api/login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data",data)
                if(data.code==200){
                  // let timerInterval
                  // swal.fire.fire({
                  //   title: 'Wait Until Launch Of Selected Instance Completes....',
                  //   html: 'Process Completes In <strong></strong> Seconds And Will Be Automatically Redirected !',
                  //   timer: 60000,
                  //   allowOutsideClick: false,
                  //   onBeforeOpen: () => {
                  //     Swal.showLoading()
                  //     timerInterval = setInterval(() => {
                  //       Swal.getContent().querySelector('strong')
                  //         .textContent = Swal.getTimerLeft()
                  //     }, 100)
                  //   },
                  //   onClose: () => {
                  //     clearInterval(timerInterval)
                  //   }
                  // }).then((result) => {
                  //   if (result.dismiss === Swal.DismissReason.timer){
                  //     swal("Logged In","","success")
                  //     this.props.history.push("/HomePage");
                  //   }
                  // })
                  swal.fire("Logged In","","success")
                  this.props.history.push("/Chat");
                }
                else if(data.code ==400){
                  this.props.history.push("/ErrorPage");
                }
                else{
                  swal.fire("Network Error","","error");
                }
            })
          }
          catch(error){
            console.log(error);
          }
        }
    onRegisterNow(e){
        e.preventDefault();
        this.props.history.push('/Register')
    }
  render() {
    return (
        <div align="center">
        <br/>
            <div>
                <span>
                  Sign In
                </span>
                <br/>
                <div>
                  <br/>
                  <span>
                    Username
                  </span>
                  <br/>
                </div>
                <br/>
                <div>
                  <input type="text" value={this.state.username} onChange={this.onUserName}/>
                  <span/>
                </div>
                <br/>
                <div>
                  <span>
                    Password
                  </span>
                  <br/>
                </div>
                <br/>
                <div>
                  <input type="password" value={this.state.password} onChange={this.onPassword} />
                  <span/>
                </div>
                <br/>
                <a href="#">
                    Forgot Password ?
                  </a>
                <br/>
                <br/>
                <div>
                  <button onClick={(e)=>this.onLogin(e)} style={{cursor:"pointer"}}>
                    Sign In
                  </button>
                </div>
                <br/>
                <div>
                  <span>
                    Not a member ? 
                       <span  onClick={(e)=>this.onRegisterNow(e)} style={{cursor:"pointer",color:"blue"}}>
                        SignUp Now
                    </span>
                  </span>
                </div>
            </div>
            <br/>
        <div id="dropDownSelect1" />
        <Button onClick={()=> this.props.history.push('/LandingPage')} style={{cursor:"pointer"}}>Back</Button>
      </div>
    );
  }
}
export default withRouter(Login);