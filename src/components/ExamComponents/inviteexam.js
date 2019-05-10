import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody,CardHeader,Table, CardFooter,FormGroup,Label,Badge, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Breadcrumb,BreadcrumbItem } from 'reactstrap';
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



class CreateMeetings extends Component {

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
      console.log('Recuperation des données : users')
      axios.get('http://localhost:3000/user').then((response)=>{
       this.setState({
        users : response.data
       })
       console.log(this.state.users)
      });


      console.log('recuperation du details du meeting'+this.props.match.params.id)
    axios.get('http://localhost:3000/exams/id/'+this.props.match.params.id).then((response)=>{
       this.setState({
         exam : response.data
       })
       console.log(this.state.meeting)
      });


       }

    handleSubmit = (event) => {
        
      
      }



      handleClickDelete(id,index) {
        console.log('id'+id)
       // console.log(event.target.getAttribute('index'));
         confirmAlert({
           title: 'Confirm to Invite this member',
           message: 'Are you sure to do this.',
           buttons: [
             {
               label: 'Yes',
               onClick: () =>{
                 axios.get('http://localhost:3000/exams/inviteexam/5ccebbc46db2a922743dcf65/'+this.props.match.params.id).then((response)=>{
               // this.componentDiMount();
              console.log('invitation envoyé')
              console.log('iduser'+id)
              console.log('index'+index)

            this.setState({visible : false});
         //   this.createNotification('info')

         [
          
          'top-right', 
          
        ].forEach(position => {
          toast.notify("Invitation Sent on Mail Successfully ", {
            position
          });
        });

       this.state.users.splice(index, 1);
       this.setState([
         this.state.users=this.state.users
       ])
            console.log(index)
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
  
      // eslint-disable-next-line
      const { children, ...attributes } = this.props;


      const buttonAuth = (
        <li><a onClick={this.authorize}  className="btn_1 medium">  Authorize</a></li>

    );

    const buttonUnAuth =(
        < li > < a onClick = {this.unauthorize} className = "btn_1 medium" > UnAuthorize </a></li >

    );


      
    let users = this.state.users.map((user,index) => {
        return (
          <tr key={user._id.toString()}> 
            <td class="text-center"><img src={'../../assets/img/avatars/'+user.image} className="img-avatar" alt="admin@bootstrapmaster.com" /></td>
            <td class="text-center">{user.username}</td>
            <td class="text-center">{user.email}</td> 
            <td class="text-center">{user.role}</td>
            <td class="text-center">{user.telephone}</td>
            <td class="text-center">
              
              
              <Button color="primary" size="sm" className="btn-pill btn btn-primary btn-sm" onClick={() => this.handleClickDelete(user._id,index)}>Invite</Button>
             
            </td>
          </tr>
        )
      })
  
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
                  <BreadcrumbItem active>Meetings</BreadcrumbItem>
                  <BreadcrumbItem active>Invite Users</BreadcrumbItem>
                </Breadcrumb>
           
            
          <NotificationContainer/>
           
            
    
          <Container fluid>
              <Suspense fallback={this.loading()}>
             

              <Link to="/createmeeting" className="navbar-brand"> Click Here,To Create a new Meeting... </Link>

            
              
              <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Here you can find All Developer in The society...
              </CardHeader>

        
              <CardBody>
                <Table table-responsive>
                <table class="table-outline mb-0 d-none d-sm-table table table-hover">
                  <thead>
                  <tr>
                    <th class="text-center"> <i class="icon-people"></i></th>
                    <th class="text-center">Username</th>
                    <th class="text-center">email</th>
                    <th class="text-center">Role</th>
                    <th class="text-center">telephone</th>
                    <th class="text-center"><i class="cui-envelope-letter icons font-2xl d-block mt-4"></i></th>
                  </tr>
                  </thead>
                  <tbody>
                  
                  {
                       users
                      }
                
                  
                
                  </tbody>
                  </table>
                </Table>
                
                
                
              </CardBody>
            </Card>
          </Col>
          </Row>

          <center><Link to="/exams" className="navbar-brand"> Click Here,To See all Exams... </Link></center>
             
        
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
  
  
     
    
  
  export default CreateMeetings;
  