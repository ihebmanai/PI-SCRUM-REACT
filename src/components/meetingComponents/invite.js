import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody,CardHeader,Table, CardFooter,FormGroup,Label,Badge, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
  } from '@coreui/react';
  import PropTypes from 'prop-types';
  import axios from "axios";

  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import navigation from '../../_nav';
import routes from '../../routes';
import  { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import



const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class Invite extends Component {

    constructor(props){
        super(props)
        this.state ={
            users: [],
            meeting : '',
            visible:true
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    signOut(e) {
      e.preventDefault()
      this.props.history.push('/login')
    }

    componentDidMount() {
      console.log('Recuperation des données : users')
      axios.get('http://localhost:3000/user').then((response)=>{
       this.setState({
        users : response.data
       })
       console.log(this.state.users)
      });


      console.log('recuperation du details du meeting'+this.props.match.params.id)
    axios.get('http://localhost:3000/meetings/id/'+this.props.match.params.id).then((response)=>{
       this.setState({
         meeting : response.data
       })
       console.log(this.state.meeting)
      });


       }

    handleSubmit = (event) => {
        
      
      }


      handleClickDelete(id) {
        console.log('id'+id)
       // console.log(event.target.getAttribute('index'));
         confirmAlert({
           title: 'Confirm to Invite this member',
           message: 'Are you sure to do this.',
           buttons: [
             {
               label: 'Yes',
               onClick: () =>{
                 axios.get('http://localhost:3000/meetings/inviteUser/'+id+'/'+this.props.match.params.id).then((response)=>{
               // this.componentDiMount();
            console.log('invitation envoyé')

            this.setState({visible : false});
            console.log(this.state)
           });
               }
             },
             {
               label: 'No',
               onClick: () => alert('Click No')
             }
           ]
         });
         console.log(this)
       }

      

    handleInputChange = (event) => {
        event.preventDefault() 
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
          [event.target.name] : event.target.value,
         
        })


      }

      
      authorize = (event) => {
        this.setState({visible : true});


    }

    unauthorize = (event) => {
      this.setState({visible : false});


  }
    render() {

        const {user} = this.props;
  
      // eslint-disable-next-line
      const { children, ...attributes } = this.props;


      const buttonAuth = (
        <li><a onClick={this.authorize}  className="btn_1 medium">  Authorize</a></li>

    );

    const buttonUnAuth =(
        < li > < a onClick = {this.unauthorize} className = "btn_1 medium" > UnAuthorize </a></li >

    );


      
    
      
  
      return (
        
        <tr key={user._id.toString()}> 
  
        <td>{user.username}</td>
        <td>{user.email}</td> 
        <td>{user.role}</td>
        <td>{user.telephone}</td>
        <td>
          
          
          <Button color="primary" size="sm" className="btn-pill btn btn-primary btn-sm" onClick={() => this.handleClickDelete(user._id)}>Invite</Button>
          { this.state.visible ? buttonUnAuth : buttonAuth }
        </td>
      </tr>
        
        
      );
    }
  }
  
  
     
    
  
  export default Invite;
  