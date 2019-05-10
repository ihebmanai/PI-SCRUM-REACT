import React, { Component, Suspense } from 'react';


import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter,FormGroup,Label,Badge, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,CardHeader,Table,Jumbotron,ListGroup,ListGroupItem } from 'reactstrap';

import axios from "axios";

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


class FicheEvaluation extends Component {


  constructor(props){
    super(props)
    this.state ={
        evaluaions:[],
        user:'',
        Moyenne:0,
        Score:0,
        count:0,
        type:'',
        type1:'',
        AMoyenne:0,
        Acount:0,
        Aresultas:''
        
    }
}
    
  
    componentWillMount() {
        console.log('Recuperation des données : evaluation')
        axios.get('http://localhost:3000/evaluations/user?iduser='+this.props.match.params.id).then((response)=>{
         this.setState({
          evaluaions : response.data
         })
         console.log(this.state.evaluaions)
        });

        console.log('Recuperation des données : user')
        axios.get('http://localhost:3000/user/'+this.props.match.params.id).then((response)=>{
         this.setState({
          user : response.data
         })
         console.log(this.state.user)
         axios.get('http://localhost:3000/evaluations/avgType?type=java&&iduser='+this.state.user._id).then((response)=>{
            this.setState({
             Moyenne : response.data,
             count:this.state.evaluaions.length 
             

            })
            console.log(response.data)
           });
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

      if(event.target.value==="java"){
        axios.get('http://localhost:3000/evaluations/avgType?type=java&&iduser='+this.state.user._id).then((response)=>{
            this.setState({
             AMoyenne : 'General Moyenne :'+ response.data,
             Acount:'Count  Evaluation'+ this.state.evaluaions.length 
             

            })
            console.log(response.data)
           });
        }

           if(event.target.value==="Angular"){
            axios.get('http://localhost:3000/evaluations/avgType?type=Angular&&iduser='+this.state.user._id).then((response)=>{
                this.setState({
                 AMoyenne : 'General Moyenne :'+ response.data,
                 Acount:'Count  Evaluation'+ this.state.evaluaions.length 
                 
    
                })
                console.log(response.data)
               });
            }


            if(event.target.value==="nodejs"){
                axios.get('http://localhost:3000/evaluations/avgType?type=nodejs&&iduser='+this.state.user._id).then((response)=>{
                    this.setState({
                     AMoyenne : 'General Moyenne :'+ response.data,
                     Acount:'Count  Evaluation'+ this.state.evaluaions.length 
                     
        
                    })
                    console.log(response.data)
                   });
                }

                if(event.target.value===".Net"){
                    axios.get('http://localhost:3000/evaluations/avgType?type=.Net&&iduser='+this.state.user._id).then((response)=>{
                        this.setState({
                         AMoyenne : 'General Moyenne :'+ response.data,
                         Acount:'Count Evaluations'+ this.state.evaluaions.length 
                        })
                        console.log(response.data)
                       });
                    }

                    if(event.target.value==="java Project"){
                        axios.get('http://localhost:3000/evaluations/machine').then((response)=>{
                            this.setState({
                             Aresultas:'recommendation  pour un project java.'
                            })
                            console.log(response.data)
                           });
                        }

                        if(event.target.value==="nodejs Project"){
                            axios.get('http://localhost:3000/evaluations/machine').then((response)=>{
                                this.setState({
                                 Aresultas:'No recommendation  for Nodejs project.'
                                })
                                console.log(response.data)
                               });
                            }
                            if(event.target.value==="Angular Project"){
                                axios.get('http://localhost:3000/evaluations/machine').then((response)=>{
                                    this.setState({
                                     Aresultas:'No  recommendation for Angular Project.'
                                    })
                                    console.log(response.data)
                                   });
                                }

                                if(event.target.value===".Net Project"){
                                    axios.get('http://localhost:3000/evaluations/machine').then((response)=>{
                                        this.setState({
                                         Aresultas:'No recommendation  for .Net project.'
                                        })
                                        console.log(response.data)
                                       });
                                    }
      
    }

    

    handleSubmit = (event) => {
      event.preventDefault() 
      const data = this.state
      
     
      console.log(data)
      axios.post('http://localhost:3000/exams/add', {
           title : this.state.title, 
           niveau:this.state.niveau,
           type:this.state.type,
           duree:this.state.duree
         
          
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          
          console.log('Examen Ajouter');
          console.log();
         // alert('Votre meeting a été ajouté avec succées')
         [
          
          'top-right', 
          
        ].forEach(position => {
          toast.notify("Exam Created Successfully ", {
            position
          });
        });
         
         this.props.history.push('/exams');
        
        }
        
      
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    
  
  
   
    
    render() {

        let evaluations = this.state.evaluaions.map((evaluation,index) => {
            return (
              <tr key={evaluation._id.toString()}> 
                <td class="text-center"><img src={'../../assets/img/avatars/'+this.state.user.image} className="img-avatar" alt="admin@bootstrapmaster.com" /></td>
                <td class="text-center">{this.state.user.username}</td>
                <td class="text-center">{evaluation.date}</td> 
                <td class="text-center">{evaluation.type}</td>
                <td class="text-center">{evaluation.note}</td>
                <td class="text-center">{ evaluation.verfied ? <p style={{color:"green"}}> Verified By the system</p> : <p style={{color:"red"}}>Not verified</p> }</td>
                <td class="text-center">
                  
                  
                 
                 
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
                  <h1 className="display-3">{this.state.user.username}!</h1>
                  <hr className="my-2" />
                  <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Statistics</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/listgroup/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>Moyenne Genrale: {this.state.Moyenne}</ListGroupItem>
                  <ListGroupItem>Count : {this.state.count}</ListGroupItem>
                 
                 
                </ListGroup>
               <br></br>
                    <p>Choose a Language to Get Average Evaluation:</p>
                <select name="ccyear" 
                    id="ccyear" 
                    class="form-control"
                    name = "type"
                    value = {this.state.type}
                    onChange={this.handleInputChange}
                    placeholder="type"
                    autoComplete="type"
                    >
                        <option value="nodejs">Node js</option>
                          <option value="java">java</option>
                          <option value="Angular">Angular</option>
                          <option value=".Net">.Net</option>
                          
                    </select>
                    <br></br>
                    <ListGroup>
                  <ListGroupItem>{this.state.AMoyenne}</ListGroupItem>
                  <ListGroupItem> {this.state.Acount} </ListGroupItem>

                  <br></br>
                    <p>Please Choose the type of project that your recommend :</p>
                <select name="ccyear" 
                    id="ccyear" 
                    class="form-control"
                    name = "type1"
                    value = {this.state.type1}
                    onChange={this.handleInputChange}
                    placeholder="type project recommendation"
                    autoComplete="type"
                    >
                          <option value="nodejs Project">Node js Project</option>
                          <option value="java Project">java Project</option>
                          <option value="Angular Project">Angular Project</option>
                          <option value=".Net Project">.Net Project</option>
                          
                    </select>
                 
                 
                </ListGroup>
              </CardBody>
            </Card>
  
                 
                 <center style={{color:"blue"}}> <h3>{this.state.Aresultas}</h3> </center>
                  <p className="lead">
                  <center>  <Button color="primary" onClick={() => this.props.history.push('/evaluation')}> go to Evaluation</Button> </center>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>

            
                <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> There is All the evaluations Informations about The Employee : {this.state.user.username} :
              </CardHeader>

        
              <CardBody>
                <Table table-responsive>
                <table class="table-outline mb-0 d-none d-sm-table table table-hover">
                  <thead>
                  <tr>
                    <th class="text-center"> <i class="icon-people"></i></th>
                    <th class="text-center">Username</th>
                    <th class="text-center">Date</th>
                    <th class="text-center">Examen</th>
                    <th class="text-center">Note</th>
                    <th class="text-center"><i class="cui-envelope-letter icons font-2xl d-block mt-4"></i></th>
                  </tr>
                  </thead>
                  <tbody>
                  
                  {
                       evaluations
                      }
                
                  
                
                  </tbody>
                  </table>
                </Table>
                
                
                
              </CardBody>
            </Card>
          </Col>
          </Row>
            
                
               
                
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
  
  
     
    
  
  export default FicheEvaluation;
  