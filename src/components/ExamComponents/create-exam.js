import React, { Component, Suspense } from 'react';


import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter,FormGroup,Label,Badge, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

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


class CreateExam extends Component {


  constructor(props){
    super(props)
    this.state ={
        title:'',
        niveau:'A',
        type:'java',
        duree:10,
        titleError:'',
        titleLengthError:''
    }
}
    
  
    componentWillMount() {
   /*     console.log('Recuperation des données : meetings')
        axios.get('http://localhost:3000/meetings').then((response)=>{
         this.setState({
           meetings : response.data
         })
         console.log(this.state.meetings)
        });
        */
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
      event.preventDefault() 
      const data = this.state
      const isValid = this.validate();
      if(isValid) {
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
              <AppBreadcrumb appRoutes={routes}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                <Card>
         
            
                <CardBody className="p-4">
                  <Form  onSubmit={this.handleSubmit}>
                   
                    <center>
                    <h1>Exam</h1>
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2"><i class="cui-code icons font-2xl d-block mt-4"></i> <p className="text-muted"> Create your Exams</p></div>  
                    </center>
                   
                    <div style={{color:"red"}}>{this.state.titleError} </div>
                    <div style={{color:"red"}}>{this.state.titleLengthError} </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                      <Input type="text"
                      className=""
                      name = "title"
                    
                      value = {this.state.title}
                          onChange={this.handleInputChange}
                      
                          placeholder="title"
                          autoComplete="title"
                    />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                      <Input type="select" 
                      name="niveau" 
                      id="niveau"
                      value = {this.state.niveau}
                      onChange={this.handleInputChange}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D (entretien d'embauche)</option>
                        
                      </Input>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                      <Input type="select" 
                      name="type" 
                      id="type"
                      value = {this.state.type}
                      onChange={this.handleInputChange}
                      >
                        <option value="Java">Java</option>
                        <option value="Nodejs">Nodejs</option>
                        <option value=".Net">.Net</option>
                        <option value="Angular">Angular</option>
                        <option value="React">React</option>
                        
                      </Input>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        
                      </InputGroupAddon>
                      

                        <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                      <input type="number"
                          name = "duree"
                          value = {this.state.duree}
                          onChange={this.handleInputChange}
                          placeholder="Duree"
                          autoComplete="Duree"
                          class="form-control"
                          min="10"
                          max="60"
                          required
                    />
                    </InputGroup>

                            <Button color="success" block>Create Exam</Button>
                  </Form>
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
  
  
     
    
  
  export default CreateExam;
  