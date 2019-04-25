import React, { Component } from 'react';
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Form,
	FormGroup,
	Input,
	Label,
	Table,
	Col
} from 'reactstrap';
import UserStoryadd from './UserStoryadd';
import axios from 'axios';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

export default class BackLogDetail extends Component {
	state = {
		userstorys: [],
		backlog: {},
		click: false
	};
	componentDidMount() {
		console.log(this.props.match.params.id);
		axios.get('http://localhost:3000/backlog_sprint/taskByid/' + this.props.match.params.id).then((data) => {
			this.setState({ backlog: data.data });
		});
		axios
			.get('http://localhost:3000/backlog_sprint/dispalystory/' + this.props.match.params.id)
			.then(async (data) => {
				await this.setState({ userstorys: data.data });
				console.log(this.state.userstorys);
			});
	}
	addtowish = () => {
		axios.post('http://localhost:3000/backlog_sprint/voteTask', {
			user_id: '5ca4c3ac3bfc1ab634ecab55',
			task_id: this.state.backlog._id
		});
		this.setState({ click: true });
	};
	chech = () => {
		this.props.history.push('/wishlist');
	};
	foot() {
		if (this.state.click == false)
			return (
				<Button onClick={this.addtowish} type="button" color="success">
					<i className="fa fa-dot-circle-o" /> Add to Wish List
				</Button>
			);
		else
			return (
				<Button onClick={this.chech} type="button" color="success">
					<i className="fa fa-dot-circle-o" /> Check wish list
				</Button>
			);
	}
	etat = (state) => {
		if (state == 'to do') {
			return (
				<td className="text-center">
					<Badge color="danger">TO DO</Badge>
				</td>
			);
		} else if (state == 'done') {
			return (
				<td className="text-center">
					<Badge color="success">DONE</Badge>
				</td>
			);
		} else {
			return (
				<td className="text-center">
					<Badge color="warning">DOING </Badge>
				</td>
			);
		}
	};

	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Add UserStorys for * {this.state.backlog.taskname} </strong>
					</CardHeader>
					<CardBody>
						<Form action="" method="post">
							<FormGroup>
								<Label htmlFor="nf-email">UserStory Name :</Label>
								<Input
									disabled={true}
									type="text"
									id="nf-email"
									value={this.state.backlog.taskname}
									name="nf-email"
									placeholder="Login"
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">UserStory Description : </Label>
								<Input
									disabled={true}
									type="textarea"
									name="textarea-input"
									id="textarea-input"
									rows="9"
									value={this.state.backlog.description}
									placeholder="As a developer i will create a secure login "
								/>
							</FormGroup>
						</Form>
					</CardBody>
					<CardFooter>{this.foot()}</CardFooter>
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
									<th>Complexite Estimation</th>
									<th>state</th>
								</tr>
							</thead>
							<tbody>{this.state.userstorys.map((story) => <UserStoryadd story={story} />)}</tbody>
						</Table>
					</CardBody>
				</Card>
			</div>
		);
	}
}
