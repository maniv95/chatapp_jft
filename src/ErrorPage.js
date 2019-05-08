import React,{Component} from 'react';
import {withRouter} from 'react-router';
class ErrorPage extends Component{
    render(){
        return(
            <h1> Error </h1>
        );
    }
}
export default withRouter(ErrorPage);