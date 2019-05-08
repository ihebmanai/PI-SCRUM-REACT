import React, { Component, Suspense } from 'react';

import { Button, Card, CardBody,  Container, CardColumns,CardHeader ,Badge,Collapse,Progress} from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { Redirect } from 'react-router-dom';
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

import navigation from '../../_nav';
import routes from '../../routes';
import Countdown from 'react-countdown-now';

const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));


const propTypes = {
  children: PropTypes.node,
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const defaultProps = {};

class PasseExams extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false,false,false,false,false,false,false,false],
      custom: [true, true,true,true,true],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      questions : [],
      value: '',
      answsers : [],
      start:false,

      reponse11 :false,
      reponse12 :false,
      reponse13 :false,
      reponse14 :false,

      reponse21 :false,
      reponse22 :false,
      reponse23 :false,
      reponse24 :false,

      reponse31 :false,
      reponse32 :false,
      reponse33 :false,
      reponse34 :false,

      reponse41 :false,
      reponse42 :false,
      reponse43 :false,
      reponse44 :false,

      reponse51 :false,
      reponse52 :false,
      reponse53 :false,
      reponse54 :false,

      reponse61 :false,
      reponse62 :false,
      reponse63 :false,
      reponse64 :false,

      reponse71 :false,
      reponse72 :false,
      reponse73 :false,
      reponse74 :false,

      reponse81 :false,
      reponse82 :false,
      reponse83 :false,
      reponse84 :false,

      reponse91 :false,
      reponse92 :false,
      reponse93 :false,
      reponse94 :false,

      reponse101 :false,
      reponse102 :false,
      reponse103 :false,
      reponse104 :false,

      progress : 0 , 

      note : 0,
      title : 'evaluation tecknique', 
      type : 'java', 
      redirect: false
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  

  
  
  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  getData() {
    console.log('recuperation du details du meeting'+this.props.match.params.id)
    axios.get('http://localhost:3000/exams/question?id='+this.props.match.params.id).then(
        (response)=>{
       this.setState({
         questions : response.data
       })
       console.log(this.state.questions)
       this.state.questions.forEach(element => {
        this.getResponsesByIdQuestion(element._id)
        console.log('ok')
    });
      });
  }
componentWillMount() {
    
this.getData()




}

handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name,value,target)

    if((name=="reponse11")||(name=="reponse12")||(name=="reponse13")||(name=="reponse14")){
       if(this.state.progress<10){
         this.setState({
           progress:10
         })
         
        }
        console.log('progress:'+this.state.progress)
       
    }

    if((name=="reponse21")||(name=="reponse22")||(name=="reponse23")||(name=="reponse24")){
      if(this.state.progress<20){
        this.setState({
          progress:20
        })
        
       }
       console.log('progress:'+this.state.progress)
      
   }

   if((name=="reponse31")||(name=="reponse32")||(name=="reponse33")||(name=="reponse34")){
    if(this.state.progress<30){
      this.setState({
        progress:30
      })
      
     }
     console.log('progress:'+this.state.progress)
    
 }

 if((name=="reponse41")||(name=="reponse42")||(name=="reponse43")||(name=="reponse44")){
  if(this.state.progress<40){
    this.setState({
      progress:40
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}

if((name=="reponse51")||(name=="reponse52")||(name=="reponse53")||(name=="reponse54")){
  if(this.state.progress<50){
    this.setState({
      progress:50
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}

if((name=="reponse61")||(name=="reponse62")||(name=="reponse63")||(name=="reponse64")){
  if(this.state.progress<60){
    this.setState({
      progress:60
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}
if((name=="reponse71")||(name=="reponse72")||(name=="reponse73")||(name=="reponse74")){
  if(this.state.progress<70){
    this.setState({
      progress:70
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}

if((name=="reponse81")||(name=="reponse82")||(name=="reponse83")||(name=="reponse84")){
  if(this.state.progress<80){
    this.setState({
      progress:80
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}

if((name=="reponse91")||(name=="reponse92")||(name=="reponse93")||(name=="reponse94")){
  if(this.state.progress<90){
    this.setState({
      progress:90
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}

if((name=="reponse101")||(name=="reponse102")||(name=="reponse103")||(name=="reponse94")){
  if(this.state.progress<90){
    this.setState({
      progress:100
    })
    
   }
   console.log('progress:'+this.state.progress)
  
}


    this.setState({
      [name]: value
    });
}

getResponses() {
    let questions = this.state.questions.map((question) => {

          let reponses = this.getResponsesByIdQuestion("5c9b8aca9c6fd91b989a60b1")
          console.log(reponses)
            
              return (
                <div key={question._id.toString()}>  {question.contenu}  <p> dhia</p></div>
                
              )
            })
}

handleClickStart() {

  confirmAlert({
    title: 'Confirm to Finish Exam',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>{
          if(this.state.reponse14==true) {
            this.state.note=this.state.note+2
          }
        
          if(this.state.reponse24==true) {
            this.state.note=this.state.note+2
          }
        
          if(this.state.reponse34==true) {
            this.state.note=this.state.note+2
          }
        
          if(this.state.reponse42==true) {
            this.state.note=this.state.note+2
          }
        
          if(this.state.reponse52==true) {
            this.state.note=this.state.note+2
          }
          if(this.state.reponse64==true) {
            this.state.note=this.state.note+2
          }
          if(this.state.reponse74==true) {
            this.state.note=this.state.note+2
          }
          if(this.state.reponse83==true) {
            this.state.note=this.state.note+2
          }
          if(this.state.reponse91==true) {
            this.state.note=this.state.note+2
          }
          if(this.state.reponse102==true) {
            this.state.note=this.state.note+2
          }
        
          
          console.log(this.state.start)
        //  alert('Examen terminée'+this.state.note)


        axios.post('http://localhost:3000/evaluations/add', {
             title : this.state.title, 
             type : this.state.type, 
            note : this.state.note,
            examen : '5cc1f9941b0e952f6c71ef9f', 
            user : '5c9237c4b6a67519a009c48f'
            
        }).then( (response)=> {
          console.log(response);
          if (response.status === 200) {
            
            console.log('Ajout evaluation');
           // alert('Votre meeting a été ajouté avec succées')
           //browserHistory.push("/meeting");
          }}
          );

          [
          
            'top-right', 
            
          ].forEach(position => {
            toast.notify("Examen Finished ", {
              position
            });
          });


          axios.get('http://localhost:3000/evaluations/sendevaluation/note/'+this.state.note).then((response)=>{
            
            console.log("note sent")
           });



          this.props.history.push("/finish");

         
        
        }
      },
      {
        label: 'No',
        onClick: () => alert('Click No')
      }
    ]
  });
 
/*
  this.setState({
    start:true
  })

  if(this.state.reponse13==true) {
    this.state.note=this.state.note+2
  }

  if(this.state.reponse23==true) {
    this.state.note=this.state.note+2
  }

  if(this.state.reponse33==true) {
    this.state.note=this.state.note+2
  }

  if(this.state.reponse43==true) {
    this.state.note=this.state.note+2
  }

  if(this.state.reponse53==true) {
    this.state.note=this.state.note+2
  }
  if(this.state.reponse63==true) {
    this.state.note=this.state.note+2
  }
  if(this.state.reponse73==true) {
    this.state.note=this.state.note+2
  }
  if(this.state.reponse83==true) {
    this.state.note=this.state.note+2
  }
  if(this.state.reponse93==true) {
    this.state.note=this.state.note+2
  }
  if(this.state.reponse103==true) {
    this.state.note=this.state.note+2
  }

  
  console.log(this.state.start)
  alert('Examen terminée'+this.state.note)

  //ajouter fel evaluation
  */
   
 }


getResponsesByIdQuestion(id) {

    axios.get('http://localhost:3000/reponses/question?id='+id).then((response)=>{
       this.setState({
         answsers : response.data,
         
       })
       console.log(this.state.answsers)
      });
    
}

loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        let reponses = []
        let questions = this.state.questions.map((question) => {
            
      //  let reponses = this.getResponsesByIdQuestion("5c9b8aca9c6fd91b989a60b1")
      //  console.log(reponses)
      for (let i = 0; i < this.state.answsers.length; i++) {
          //console.log(question._id)
       console.log( this.state.answsers[i].question)
       if(this.state.answsers[i].question===question._id) {
           console.log('there is one')
           reponses.push(<li>{this.state.answsers[i].contenu}</li>)
           console.log('hear')
           console.log(reponses)
        }
        
      }
      reponses=[] 
            return (
              <div key={question._id.toString()}>  {question.contenu}
              {reponses}
               </div>
              
            )
          })

          
      
          return (
            <div >
        
          
             
             
              <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress of exams</strong>
            <div className="card-header-actions">
              <a href="https://reactstrap.github.io/components/progress/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            
            <div className="text-center">{this.state.progress}%</div>
            <Progress value={this.state.progress} />
            
            
          </CardBody>
        </Card>

        

      <center> <h1> <Countdown name="compteur" date={Date.now() + 600000} controlled={false}  start={this.state.start} /> </h1> </center>
  



        <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Quizz <small>Java:</small>
                
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">#1 :  Un design pattern permet de gérer des </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody >
                        1. <label>
                               
                                <input
                                    name="reponse11"
                                    type="checkbox"
                                    checked={this.state.reponse11}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  entités graphiques
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse12"
                                    type="checkbox"
                                    checked={this.state.reponse12}
                                    onChange={this.handleInputChange} />
                                      reponse 2:fenêtres
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse13"
                                    type="checkbox"
                                    checked={this.state.reponse13}
                                    onChange={this.handleInputChange} />

                                     reponse 3: caractères étendus
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse14"
                                    type="checkbox"
                                    checked={this.state.reponse14}
                                    onChange={this.handleInputChange} />

                                    reponse 4: problèmes récurrents d'architecture logicielle
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">#2 : Quel opérateur sert pour la concaténation des chaines de caractères ? : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse21"
                                    type="checkbox"
                                    checked={this.state.reponse21}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  &
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse22"
                                    type="checkbox"
                                    checked={this.state.reponse22}
                                    onChange={this.handleInputChange} />
                                  reponse 2:  &&
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse23"
                                    type="checkbox"
                                    checked={this.state.reponse23}
                                    onChange={this.handleInputChange} />
                                     reponse 3: And 
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse24"
                                    type="checkbox"
                                    checked={this.state.reponse24}
                                    onChange={this.handleInputChange} />

                                    reponse 4: +
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#3 :  Le terme "polymorphisme" s'emploie pour : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse31"
                                    type="checkbox"
                                    checked={this.state.reponse31}
                                    onChange={this.handleInputChange} />

                             reponse 1:  une méthode
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse32"
                                    type="checkbox"
                                    checked={this.state.reponse32}
                                    onChange={this.handleInputChange} />
                      reponse 2:une classe.
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse33"
                                    type="checkbox"
                                    checked={this.state.reponse33}
                                    onChange={this.handleInputChange} />

                                     reponse 3: une super classe
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse34"
                                    type="checkbox"
                                    checked={this.state.reponse34}
                                    onChange={this.handleInputChange} />

                                    reponse 4: une classe fille
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#4 :  Dans Java, une classe peut hériter de plusieurs classes mères en même temps (héritage multiple) : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse41"
                                    type="checkbox"
                                    checked={this.state.reponse41}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  Oui depuis la version 5.0
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse42"
                                    type="checkbox"
                                    checked={this.state.reponse42}
                                    onChange={this.handleInputChange} />
                                  reponse 2:Non, contrairement au C++.
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse43"
                                    type="checkbox"
                                    checked={this.state.reponse43}
                                    onChange={this.handleInputChange} />

                                     reponse 3: Oui
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse44"
                                    type="checkbox"
                                    checked={this.state.reponse44}
                                    onChange={this.handleInputChange} />

                                    reponse 4: Oui, depuis la version 1.4
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#5 :  Le type "float" est codé sur combien d'octets ?: </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse51"
                                    type="checkbox"
                                    checked={this.state.reponse51}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  6
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse52"
                                    type="checkbox"
                                    checked={this.state.reponse52}
                                    onChange={this.handleInputChange} />
reponse2: 8
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse53"
                                    type="checkbox"
                                    checked={this.state.reponse53}
                                    onChange={this.handleInputChange} />

                                     reponse 3: 4
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse54"
                                    type="checkbox"
                                    checked={this.state.reponse54}
                                    onChange={this.handleInputChange} />

                                    reponse 4: 2
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
               
                  
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0"> #6 :  Que renvoie (int)Math.PI ?: </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse61"
                                    type="checkbox"
                                    checked={this.state.reponse61}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  0.141592653589793
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse62"
                                    type="checkbox"
                                    checked={this.state.reponse62}
                                    onChange={this.handleInputChange} />
                                    reponse2: 3
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse63"
                                    type="checkbox"
                                    checked={this.state.reponse63}
                                    onChange={this.handleInputChange} />

                                     reponse 3: Une erreur
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse64"
                                    type="checkbox"
                                    checked={this.state.reponse64}
                                    onChange={this.handleInputChange} />

                                    reponse 4: 3.141592653589793
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#7 :  Le mot clé "super" permet ? : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse71"
                                    type="checkbox"
                                    checked={this.state.reponse71}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  de définir une méthode prioritaire
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse72"
                                    type="checkbox"
                                    checked={this.state.reponse72}
                                    onChange={this.handleInputChange} />
                                    reponse2:de donner les droits d'accès super-user à un fichier
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse63"
                                    type="checkbox"
                                    checked={this.state.reponse73}
                                    onChange={this.handleInputChange} />

                                     reponse 3: de définir une classe prioritaire
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse74"
                                    type="checkbox"
                                    checked={this.state.reponse74}
                                    onChange={this.handleInputChange} />

                                    reponse 4: d'accéder aux membres d'une classe mère
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(7)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#8 :  On trouve les packages pour gérer les flux dans : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[7]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse81"
                                    type="checkbox"
                                    checked={this.state.reponse81}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  java.ioStream
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse82"
                                    type="checkbox"
                                    checked={this.state.reponse82}
                                    onChange={this.handleInputChange} />
                                    reponse2:java.io
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse83"
                                    type="checkbox"
                                    checked={this.state.reponse83}
                                    onChange={this.handleInputChange} />

                                     reponse 3: java.stream
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse84"
                                    type="checkbox"
                                    checked={this.state.reponse84}
                                    onChange={this.handleInputChange} />

                                    reponse 4: java.File
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>

                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(8)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#9 :  Que signifie JRE ? : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[8]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse91"
                                    type="checkbox"
                                    checked={this.state.reponse91}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  Java Runtime Environment
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse92"
                                    type="checkbox"
                                    checked={this.state.reponse92}
                                    onChange={this.handleInputChange} />
                                    reponse2:Java Routine Emulator
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse93"
                                    type="checkbox"
                                    checked={this.state.reponse93}
                                    onChange={this.handleInputChange} />

                                     reponse 3 Java Runtime Engine 
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse94"
                                    type="checkbox"
                                    checked={this.state.reponse94}
                                    onChange={this.handleInputChange} />

                                    reponse 4: Java Realtime Execution
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(9)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">#10 :  Quel environnement de développement très utilisé permet notamment de compiler et déboguer en Java ?? : </h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[9]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                        1. <label>
                               
                                <input
                                    name="reponse101"
                                    type="checkbox"
                                    checked={this.state.reponse101}
                                    onChange={this.handleInputChange} />

                                     reponse 1:  JSD
                            </label>
                            <br></br>
                          2.  <label>
                               
                                <input
                                    name="reponse102"
                                    type="checkbox"
                                    checked={this.state.reponse102}
                                    onChange={this.handleInputChange} />
                                    reponse2:Eclipse
                            </label>
                            <br></br>
                        3.     <label>
                               
                                <input
                                    name="reponse103"
                                    type="checkbox"
                                    checked={this.state.reponse103}
                                    onChange={this.handleInputChange} />

                                     reponse 3: Visual Studio
                            </label>
                            <br></br>
                        4.    <label>
                                
                                <input
                                    name="reponse104"
                                    type="checkbox"
                                    checked={this.state.reponse104}
                                    onChange={this.handleInputChange} />

                                    reponse 4: JRE
                            </label>

                        
                      </CardBody>
                    </Collapse>
                  </Card>

                </div>
              </CardBody>
            </Card>

            <Button color="success" block onClick={() => this.handleClickStart()}>Examen Terminée</Button>

            
             
             
        
      </div>
          );
        }
    }

    export default PasseExams;