import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';

export default class burnchart extends Component {
	line = {
		labels: [],
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
				data: []
			}
		]
	};
	doughnut = {
		labels: [ 'to DO', 'Done', 'Doing' ],
		datasets: [
			{
				data: [],
				backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
				hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
			}
		]
	};
	options = {
		tooltips: {
			enabled: false,
			custom: CustomTooltips
		},
		maintainAspectRatio: false
	};
	state = {
		res: [],
		stat: {}
	};
	stat = {};
	res = [];
	len = 0;
	todo = 0;
	doing = 0;
	done = 0;
	async componentDidMount() {
		await axios.get('http://localhost:3000/backlog_sprint/getall').then((data) => {
			this.setState({ res: data.data });
			console.log(data.data);
		});

		this.res = this.state.res;
		this.len = this.state.res.length;
		this.res.map((a) => {
			if (a.state == 'done') this.done++;
			if (a.state == 'to do') this.todo++;
			if (a.state == 'doing') this.doing++;
		});
		this.doughnut.datasets[0].data.push(this.done);
		this.doughnut.datasets[0].data.push(this.todo);
		this.doughnut.datasets[0].data.push(this.doing);

		this.res.map((a) => {
			if (a.state == 'done') {
				if (a.findate in this.stat) {
					this.len = this.len - 1;

					this.stat[a.findate] = this.len;
					console.log(this.stat);
				} else {
					this.len = this.len - 1;
					this.stat[a.findate] = this.len;
					console.log(this.stat);
				}
			}
		});
		this.line.labels.push('date debut');
		this.line.datasets[0].data.push(this.state.res.length);

		for (var a in this.stat) {
			console.log(a);
			this.line.labels.push(a);
			this.line.datasets[0].data.push(this.stat[a]);
		}
		this.line.labels.push('date fin');
		this.line.datasets[0].data.push(0);
	}
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						BurnDown Chart
						<div className="card-header-actions">
							<a href="http://www.chartjs.org" className="card-header-action">
								<small className="text-muted">docs</small>
							</a>
						</div>
					</CardHeader>
					<CardBody>
						<div className="chart-wrapper">
							<Line data={this.line} options={this.options} />
						</div>
					</CardBody>
				</Card>
				<Card>
					<CardHeader>
						Tasks per State Chart
						<div className="card-header-actions">
							<a href="http://www.chartjs.org" className="card-header-action">
								<small className="text-muted">docs</small>
							</a>
						</div>
					</CardHeader>
					<CardBody>
						<div className="chart-wrapper">
							<Doughnut data={this.doughnut} />
						</div>
					</CardBody>
				</Card>
			</div>
		);
	}
}
