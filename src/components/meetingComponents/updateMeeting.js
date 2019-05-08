import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody, CardFooter,FormGroup,Label,Badge, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';
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
import DatePicker from 'react-date-picker';
const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class UpdateMeeting extends Component {

    constructor(props){
        super(props)
        this.state ={
            title : '', 
            type : '', 
            date : new Date(),
            startDate : '',
            duree : 0,
            feedback : '', 
            scrumMaster : '' ,
            devTeam  : [],
            meeting : '',
            position:'',
            disabledvalue:true,
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    signOut(e) {
      e.preventDefault()
      this.props.history.push('/login')
    }


    componentDidMount() {
      console.log('recuperation du details du meeting'+this.props.match.params.id)
      axios.get('http://localhost:3000/meetings/id/'+this.props.match.params.id).then((response)=>{
         this.setState({
           meeting : response.data,
           title:response.data.title,
            type : response.data.type, 
            
            startDate :response.data.startDate,
            duree : response.data.duree,
            feedback : response.data.feedback, 
            scrumMaster :response.data.scrumMaster ,
            devTeam  : response.data.scrumMaster,
            
         })
         console.log(this.state.meeting)
        });

   
  
  }

    handleSubmit = (event) => {
        event.preventDefault() 
        const isValid = this.validate();
        if(isValid) {
          console.log(this.state)
        const data = this.state
        console.log(data)
        axios.put('http://localhost:3000/meetings/update/'+this.props.match.params.id, {
             title : this.state.title, 
            type : this.state.type, 
            date : this.state.date,
            startDate : this.state.startDate,
            duree : this.state.duree, 
            scrumMaster : this.state.scrumMaster , 
            devTeam : this.state.devTeam,
            
        })
        .then( (response) => {
          console.log(response);
          if (response.status === 200) {
            
            console.log('Modif Meeting');

            [
          
              'top-right', 
              
            ].forEach(position => {
              toast.notify("Meeting Updated Successfully ", {
                position
              });
            });

            this.props.history.push('/meeting');

            
          }
          
        
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
      }


      onChange = date => this.setState({ date })

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

    handleInputChange = (event) => {
        event.preventDefault() 
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
          [event.target.name] : event.target.value,
         
        })

        if(this.state.title.length<4) {
          console.log('validation')
        }

       // console.log('name:'+event.target.value)
       if(event.target.value==="Daily Meeting") {
         this.setState({
           duree:15
         })
        }
         if(event.target.value==="Grooming"){
           this.setState({
             duree:50
           })
         }
         if(event.target.value==="Sprint Review Meeting"){
          this.setState({
            duree:150
          })
        }
          if(event.target.value==="Retrospective Meeting"){
            this.setState({
              duree:60
            })   
          } 
            if(event.target.value==="Others"){
              this.setState({
                disabledvalue:false
              }) 
      }
      }
    render() {
  
      // eslint-disable-next-line
      const { children, ...attributes } = this.props;
  
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
                  <BreadcrumbItem active>Update Meeting</BreadcrumbItem>
                </Breadcrumb>
            <Container fluid>
              
            <div className="app flex-row align-items-center">
            
        <Container>
        <Card>
         
            
                <CardBody className="p-4">
                  <Form  onSubmit={this.handleSubmit}>
                  <center>
                    <h1>Exam</h1>
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2"><i class="cui-code icons font-2xl d-block mt-4"></i> <p className="text-muted"> Update this Exam ?</p></div>  
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
                          autoComplete="username"
                    />
                    </InputGroup>

                  

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        
                      </InputGroupAddon>
                    
                    <DatePicker id="date-input"
                       type="date"
                          name = "date"
                          onChange={this.onChange}
                          value={this.state.date}
                          minDate={this.state.date}
                          placeholder="date"
                          autoComplete="date"
                          class="form-control"
                          
                    />

                        <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                     
                      <input type="number"
                          name = "startDate"
                          value = {this.state.startDate}
                          onChange={this.handleInputChange}
                          placeholder="start Hour(09-10-11)"
                          autoComplete="startDate"
                          min="8"
                          max="17"
                          class="form-control"
                    />
                     <select name="ccyear" 
                    id="ccyear" 
                    class="form-control"
                    name = "type"
                    value = {this.state.type}
                    onChange={this.handleInputChange}
                    placeholder="type"
                    autoComplete="type"
                    >
                      
                          <option value="Daily Meeting">Stand-Up Meeting(Daily Meeting 15 min)</option>
                          <option value="Grooming">Grooming(50min)</option>
                          <option value="Sprint Review Meeting">Sprint Review Meeting(2-3hour)</option>
                          <option value="Retrospective Meeting">Retrospective Meeting(1hour)</option>
                          <option>Others</option>
                    </select>
                    </InputGroup>


                    <InputGroup className="mb-3">
                     
                      <Input type="number"
                          name = "duree"
                          value = {this.state.duree}
                          onChange={this.handleInputChange}
                          placeholder="duree"
                          autoComplete="duree"
                          disabled={this.state.disabledvalue}
                    />
                    </InputGroup>
                       
                    <Button color="success" block>Update Meeting</Button>
                  </Form>
                </CardBody>
                </Card>
               
             
        </Container>
         </div>

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
  
  
     
    
  
  export default UpdateMeeting;
  