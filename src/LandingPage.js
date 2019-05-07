/*eslint-disable*/
import React, { Component } from 'react';
import {Button,Card,CardBody} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import history from './history';
import swal from 'sweetalert2'
class LandingPage extends Component{
    render(){
        return(
            <div align="center">
            <Card>
            <CardBody>
             <div>
                <h3>Welcome To Simple Chat Application</h3>
             </div>
             <div><Button onClick={()=>this.props.history.push('/Register')}>Register</Button></div><br/>
             <div><Button onClick={()=>this.props.history.push('/Login')}>Login</Button></div><br/>
            </CardBody>
            </Card>
            </div>
        );
    }
}
export default withRouter(LandingPage);