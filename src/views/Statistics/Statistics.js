import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from "axios";
var si


const bar = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Issue creation  dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [10, 25, 12, 35, 45, 55, 0],
    },
  ],
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
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



const polar = {
  datasets: [
    {
      data: [
        11,
        16,
        7,
        3,
        14,
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
      ],
      label: 'My dataset' // for legend
    }],
  labels: [
    '5days',
    '6days',
    '3days',
    '2days',
    '1day',
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Statistics extends Component {
  constructor(){
    super()
    this.state={ solvedIssues:Number , pie:{},line:{}
  }
    
  }
  componentDidMount(){
    let today = new Date();
    let date1=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate())
 
    let date2=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate()-1)
    console.log("d2"+date1)
    let date3=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate()-2)
    let date4=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate()-3)
    let date5=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate()-4) 
    let date6=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate()-5) 
   Promise.all([
      axios
      .get("http://localhost:3000/issue?status=solved",{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue?status=in progress",{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue?status=not solved",{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date6,{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date5,{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date4,{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date3,{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date2,{method:"no-cors"}),
      axios
      .get("http://localhost:3000/issue/date?createdDate="+date1,{method:"no-cors"})
    
    
    ])
      .then(([response,response2,response3,response4,responsed2,responsed3,responsed4,responsed5,responsed6]) => {
        console.log("hiiii 1 "+response4.data)
        console.log("hiiii 2 "+responsed2.data)
        console.log("hiiii 3 "+responsed3.data)
        console.log("hiiii 4 "+responsed4.data)
        console.log("hiiii 5 "+responsed5.data)
        console.log("hiiii 6 "+responsed6.data)

        this.setState({solvedIssues:response.data})
        this.setState({pie : {
          labels: [
            'Solved Issue',
            'In progress',
            'Not solved',
          ],
          datasets: [
            {
              data: [response.data,response2.data,response3.data],
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
           
        }})
        this.setState({line : {
          labels: [date6, date5, date4,date3, date2, date1],
          datasets: [
            {
              label: 'Issues number',
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [response4.data,responsed2.data, responsed3.data, responsed4.data, responsed5.data,responsed6.data],
            }
          ],
        }})
       
      })
      .catch(function(error) {
        console.log(error);
      });
    
   
   
  }
  render() {
  
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Issues created this week
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={this.state.line} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Issue Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Issues chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">issues</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={this.state.pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Aveareg solving issue time
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">time</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options}/>
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Statistics;
