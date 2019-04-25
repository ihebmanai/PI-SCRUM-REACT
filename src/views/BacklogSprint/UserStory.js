import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label, Table, Col } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import UserStoryadd from './UserStoryadd';
import axios from 'axios';
export default class UserStory extends Component {
	goToBacklog = () => {
		this.props.history.push('/backlogdisplay');
	};
	state = {
		backlogs: [],
		task: {},
		estimation: '',
		storyname: '',
		description: '',
		complexite: '',
		type: '',
		backlogTask: '',
		visible: false
	};
	async componentDidMount() {
		await axios
			.get('http://localhost:3000/backlog_sprint/dispalystory/' + this.props.match.params.id)
			.then((data) => {
				this.setState({ backlogs: data.data });
				console.log(data.data);
			});
		console.log(this.props.match.params.id);
		await axios.get('http://localhost:3000/backlog_sprint/taskByid/' + this.props.match.params.id).then((data) => {
			this.setState({ task: data.data });
			console.log(data.data);
		});
	}

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (this.state.visible == false) {
			axios
				.post('http://localhost:3000/backlog_sprint/predict', { desc: this.state.description })
				.then((data) => {
					this.setState({
						complexite: Math.trunc(data.data.complexite * 10),
						estimation: Math.trunc(data.data.time * 10)
					});
					console.log(data.data);
				});
		}
	};
	onFormSubmit = (e) => {
		console.log('ok');
		e.preventDefault();
		axios
			.post('http://localhost:3000/backlog_sprint/addStory/' + this.props.match.params.id, {
				estimation: this.state.estimation,
				storyname: this.state.storyname,
				description: this.state.description,
				complexite: this.state.complexite,

				type: 'UX/UI'
			})
			.then((data) => {
				console.log(data.data[0]);
				var ok = this.state.backlogs;
				ok.push(data.data[0]);
				this.setState({ backlogs: ok });
				console.log(this.state.backlogs);
			});
	};
	ondelete = async (e, i) => {
		await axios.get('http://localhost:3000/backlog_sprint/delete/' + e);

		var ok = this.state.backlogs;
		console.log(e);
		ok.splice(i, 1);
		console.log(i);
		this.setState({ backlogs: ok });
	};
	toggle = () => {
		this.setState({
			visible: !this.state.visible
		});
		console.log('okS');
	};
	show() {
		if (this.state.visible == true) {
			return (
				<div>
					<Col xs="4">
						<FormGroup>
							<Label htmlFor="postal-code">Time Estimation</Label>
							<Input
								name="estimation"
								type="text"
								id="postal-code"
								placeholder="in hours "
								onChange={this.onInputChange}
							/>
						</FormGroup>
					</Col>
					<Col xs="4">
						<FormGroup>
							<Label htmlFor="postal-code">Complexite Estimation</Label>
							<Input
								name="complexite"
								type="text"
								id="postal-code"
								placeholder="complexite"
								onChange={this.onInputChange}
							/>
						</FormGroup>
					</Col>
				</div>
			);
		}
	}
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Add UserStorys for * {this.state.task.taskname} </strong>
						<Button
							onClick={this.goToBacklog}
							style={{ alignItems: 'left' }}
							type="button"
							size=""
							color="danger"
						>
							Finish
						</Button>
					</CardHeader>
					<CardBody>
						<Form action="" method="post">
							<FormGroup>
								<Label htmlFor="nf-email">UserStory Name :</Label>
								<Input
									type="text"
									id="nf-email"
									name="storyname"
									placeholder="Enter user Story name.."
									onChange={this.onInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">UserStory Description : </Label>
								<Input
									type="textarea"
									name="description"
									id="textarea-input"
									rows="9"
									placeholder="Content..."
									onChange={this.onInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<AppSwitch
									onClick={this.toggle}
									className={'mx-1'}
									variant={'3d'}
									color={'primary'}
									defaultChecked
									label
									dataOn={'\u2713'}
									dataOff={'\u2715'}
								/>
								<Label htmlFor="nf-password">Auto complexite and time estimaion</Label>
							</FormGroup>
							{this.show()}
						</Form>
					</CardBody>
					<CardFooter>
						<Button type="button" onClick={this.onFormSubmit} size="sm" color="primary">
							<i className="fa fa-dot-circle-o" /> Submit
						</Button>
						<Button type="reset" size="sm" color="danger">
							<i className="fa fa-ban" /> Reset
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<i className="fa fa-align-justify" /> Task name
					</CardHeader>
					<CardBody>
						<Table responsive>
							<thead>
								<tr>
									<th>User Name</th>
									<th>Description</th>
									<th>Time Estimation</th>
									<th>complexite Estimation</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.backlogs.map((back, index) => (
									<tr>
										<td>{back.storyname}</td>
										<td>{back.description}</td>
										<td>{back.estimation}</td>
										<td>{back.complexite}</td>
										<td>
											<button
												onClick={() => this.ondelete(back._id, index)}
												className="btn btn-danger"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</div>
		);
	}
}
