import React, { Component, Suspense } from 'react';

import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter,FormGroup,Label,Badge, Col, Form, Input,Table, InputGroup, InputGroupAddon, InputGroupText, Row,CardGroup,CardHeader } from 'reactstrap';

import axios from "axios";

import Widget04 from '../../views/Widgets/Widget04';

import { BrowserRouter as  Link } from "react-router-dom";

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
import { Container,} from 'reactstrap';
import navigation from '../../_nav';
import routes from '../../routes';
import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';

const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class EvaluationTeck extends Component {


  constructor(props){
    super(props)
    this.state ={

        evaluations:[],
        array:[],
        passed:0,
        allevaluation:0,
        levelA :0,
        users:[],
        levelB:0,
        levelC:0,
        doughnut : {
            labels: [
              'Level A',
              'Level B',
              'Level C',
            ],
            datasets: [
              {
                data: [],
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
              }],
          }
      
    }
}


    
  
componentWillMount() {

    console.log('recuperation du details du examen'+this.props.match.params.id)
      axios.get('http://localhost:3000/exams/id/'+this.props.match.params.id).then(
          (response)=>{
         this.setState({
           exams : response.data
         })
         
      });
  
      axios.get('http://localhost:3000/evaluations').then(
          (response)=>{
         this.setState({
           evaluations : response.data
         })
  
  
         console.log('evauation'+this.state.evaluations)
         
       this.state.evaluations.forEach(element => {
         this.setState({
           allevaluation:this.state.allevaluation+1,
           
         })
  
        
        
         
          
             this.setState({
               passed:this.state.passed+1
             })
  
             if( element.note>11 ) {
              this.setState({
                levelA:this.state.levelA+1
              })
            
             console.log(this.state.doughnut.datasets[0].data)
           }
  
           if(element.note<11 && element.note>8) {
            this.setState({
              levelB:this.state.levelB+1
            })
         }
         if( element.note<8) {
          this.setState({
            levelC:this.state.levelC+1
          })
       
          }
         });
         this.state.doughnut.datasets[0].data.push(this.state.levelA)
         this.state.doughnut.datasets[0].data.push(this.state.levelB)
         this.state.doughnut.datasets[0].data.push(this.state.levelC)
         
         
      });

      console.log('Recuperation des données : users')
      axios.get('http://localhost:3000/user').then((response)=>{
       this.setState({
        users : response.data
       })
       console.log(this.state.users)
      });
    }
  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    signOut(e) {
      e.preventDefault()
      this.props.history.push('/login')
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

    validate = () =>{
      let titleError =" Title is required"
      let titleLengthError="Length of title must be > 5 letters" 
      
      if(this.state.title==="") {
        this.setState({
            titleError
        })
        return false
      }
      
      if(this.state.title.length<5) {
        this.setState({
            titleLengthError
        })
        return false
      }
      
      return true
        } 

    handleSubmit = (event) => {
      
         
         this.props.history.push('/exams')
    
    }


    handleClickDelete = (id) => {
      
         
        this.props.history.push('/fiche/evaluation/'+id)
   
   }
  
  
   
    
    render() {

        let users = this.state.users.map((user,index) => {
            return (
              <tr key={user._id.toString()}> 
                <td class="text-center"><img src={'../../assets/img/avatars/'+user.image} className="img-avatar" alt="admin@bootstrapmaster.com" /></td>
                <td class="text-center">{user.username}</td>
                <td class="text-center">{user.email}</td> 
                <td class="text-center">{user.role}</td>
                <td class="text-center">{user.telephone}</td>
                <td class="text-center">
                  
                
                  <Button color="primary" size="sm" className="btn-pill btn btn-primary btn-sm" onClick={() => this.handleClickDelete(user._id)}>Scorecard</Button>
                 
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
              <AppBreadcrumb appRoutes={routes}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
               
                <CardGroup className="mb-4">
          <Widget04 icon="icon-people" color="danger" header={this.state.passed} value={this.state.passed}>Passed  exams</Widget04>
          <Widget04 icon="icon-user-follow" color="success" header={this.state.allevaluation}value={this.state.allevaluation}>All evaluations</Widget04>
          <Widget04 icon="icon-pie-chart" color="success" header={this.state.levelA}value={this.state.levelA}>Have Level A:</Widget04>
          <Widget04 icon="icon-pie-chart" color="warning" header={this.state.levelB}value={this.state.levelB}>Have Level B:</Widget04>
          <Widget04 icon="icon-pie-chart" color="danger" header={this.state.levelC}value={this.state.levelC}>Have Level C:</Widget04>
          <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>
        </CardGroup>

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
                    <th class="text-center"><i class="cui-graph icons font-2xl d-block mt-4"></i></th>
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

        <Card >
            <CardHeader>
              Doughnut Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut style={{height:"350px",width:"100%"}} data={this.state.doughnut} />
              </div>
            </CardBody>
          </Card>
            
                
                
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
  
  
     
    
  
  export default EvaluationTeck;
  