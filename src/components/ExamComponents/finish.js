import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody,CardHeader,Table, CardFooter,FormGroup,Label,Badge, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Breadcrumb,BreadcrumbItem,Jumbotron } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
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

  import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';

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



class Finish extends Component {

    constructor(props){
        super(props)
        this.state ={
            users: [],
            exam : '',
            visible:true
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    signOut(e) {
      e.preventDefault()
      this.props.history.push('/login')
    }

    componentDidMount() {
     


       }

    handleSubmit = (event) => {
        
      
      }



      handleClickDelete() {
      //  console.log('id'+id)
       // console.log(event.target.getAttribute('index'));
         confirmAlert({
           title: 'Confirm to Begin this exam',
           message: 'Are you sure to begin.',
           buttons: [
             {
               label: 'Yes',
               onClick: () =>{
                
               

         [
          
          'top-right', 
          
        ].forEach(position => {
          toast.notify("Examen Beginned ... ", {
            position
          });
        });

        this.props.history.push('/passerExam')

      
          
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

       handleClickRetour() {
        //  console.log('id'+id)
         // console.log(event.target.getAttribute('index'));
           
            
            
        
  
          this.props.history.push('/meeting')
  
        
            
           console.log(this)
         }

      

   

      
     

    
    render() {
  
     


      
   
  
      return (
          
        <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
          <Breadcrumb>
                  {/*eslint-disable-next-line*/}
                  <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                  <BreadcrumbItem active>Exam</BreadcrumbItem>
                  <BreadcrumbItem active>Begin Exam</BreadcrumbItem>
                </Breadcrumb>
           
            
          <NotificationContainer/>
           
            
    
          <Container fluid>
              <Suspense fallback={this.loading()}>

              <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Jumbotron</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/jumbotron/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-3">Finished ... !</h1>
                  <p className="lead">This evaluation exam was finished successfully ...</p> <br></br>
                  
                  <hr className="my-2" />
                  <p>Check your mail to check The result of this evaluation exam ... Good Luck .</p>
                  <p className="lead">
                  
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
             
              
         </Suspense>
        
        
         </Container>

           
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        
        </div>
     
        
      );
    }
  }
  
  
     
    
  
  export default Finish;
  