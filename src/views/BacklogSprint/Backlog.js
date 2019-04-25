import React, { Component } from 'react';
import { Badge, Progress, Table, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import BacklogItem from './BacklogItem';
import Badges from '../Notifications/Badges/Badges';
import axios from 'axios';
export default class Backlog extends Component {
	state = {
		backlogs: []
	};

	async componentDidMount() {
		var backlogs;
		await axios.get('http://localhost:3000/backlog_sprint//displaytasks/1').then(async (data) => {
			this.setState({ backlogs: data.data });

			await this.state.backlogs.map(async (back) => {
				await axios.get('http://localhost:3000/backlog_sprint/user/5ca4c3ac3bfc1ab634ecab55').then((data) => {
					back.username = data.data.name;
				});
			});
			console.log(this.state.backlogs);
		});
	}
	etat(state) {}

	render() {
		return (
			<div>
				<Row>
					<Col>
						<Card>
							<CardHeader>Sprint Backlog</CardHeader>
							<CardBody>
								<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
									<thead className="thead-light">
										<tr>
											<th className="text-center">
												<i className="icon-people" />
											</th>
											<th>Developer</th>
											<th className="text-center">Task</th>
											<th>Progress</th>
											<th className="text-center">State</th>
										</tr>
									</thead>
									<tbody>
										{this.state.backlogs.map((back, index) => (
											<BacklogItem props={this.props} backlog={back} />
										))}
										<tr>
											<td className="text-center">
												<div className="avatar">
													<img
														src={'assets/img/avatars/1.jpg'}
														className="img-avatar"
														alt="admin@bootstrapmaster.com"
													/>
													<span className="avatar-status badge-success" />
												</div>
											</td>
											<td>
												<div>Ahmed Manai</div>
												<div className="small text-muted" />
											</td>

											<td className="text-center">
												<div>Register</div>
											</td>
											<td>
												<div className="clearfix">
													<div className="float-left">
														<strong>100%</strong>
													</div>
													<div className="float-right">
														<small className="text-muted">
															Jun 11, 2015 - Jul 10, 2015
														</small>
													</div>
												</div>
												<Progress className="progress-xs" color="success" value="100" />
											</td>
											<td className="text-center">
												<Badge color="success">Done</Badge>
											</td>
										</tr>
										<tr>
											<td className="text-center">
												<div className="avatar">
													<img
														src={'assets/img/avatars/1.jpg'}
														className="img-avatar"
														alt="admin@bootstrapmaster.com"
													/>
													<span className="avatar-status badge-success" />
												</div>
											</td>
											<td>
												<div>XXXX XXXXX</div>
												<div className="small text-muted" />
											</td>
											<td className="text-center">
												<div>Backlog MAnagement</div>
											</td>
											<td>
												<div className="clearfix">
													<div className="float-left">
														<strong>0%</strong>
													</div>
													<div className="float-right">
														<small className="text-muted">
															Jun 11, 2015 - Jul 10, 2015
														</small>
													</div>
												</div>
												<Progress className="progress-xs" color="warning" value="0" />
											</td>
											<td className="text-center">
												<Badge color="danger">TO DO</Badge>
											</td>
										</tr>{' '}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
