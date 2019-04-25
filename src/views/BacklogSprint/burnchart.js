import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';

const line = {
	labels: [ 'January', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
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
			data: [ 65, 0 ]
		}
	]
};
const options = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	maintainAspectRatio: false
};

export default class burnchart extends Component {
	state = {
		res: [],
		stat: {}
	};
	async componentDidMount() {
		var stat = {};
		await axios.get('http://localhost:3000/backlog_sprint/getall').then((data) => {
			this.setState({ res: data.data });
			console.log(data.data);
		});

		this.state.res.map((a) => {
			if (a.state == 'done') {
				if (a.findate in this.state.stat) {
					this.state.stat[a.findate] = this.state.stat[a.findate] - 1;
					console.log(this.state.stat);
				} else {
					this.state.stat[a] = this.state.res.lenght;
				}
			}
		});
		console.log(this.state.stat);
	}
	render() {
		return <div />;
	}
}
