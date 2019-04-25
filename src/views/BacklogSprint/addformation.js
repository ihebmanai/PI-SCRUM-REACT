import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

export default class addformation extends Component {
	state = {
		name: '',
		descrip: '',
		attachments: ''
	};
	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	};
	onFormSubmit = (e) => {
		console.log('ok');
		e.preventDefault();
		axios
			.post('http://localhost:3000/cv/addCompetance/5ca4c3ac3bfc1ab634ecab55', {
				title: this.state.name,
				description: this.state.descrip,
				attachments: this.state.attachments,
				state: 'en cours'
			})
			.then(() => {});
	};
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong> Add Fromation </strong>
					</CardHeader>
					<CardBody>
						<Form action="" method="post">
							<FormGroup>
								<Label htmlFor="nf-email">Formation Name :</Label>
								<Input
									type="text"
									id="nf-email"
									name="name"
									onChange={this.onInputChange}
									placeholder="Enter Formation name.."
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Formation Description : </Label>
								<Input
									type="textarea"
									name="descrip"
									id="textarea-input"
									rows="9"
									placeholder="Content..."
									onChange={this.onInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">attachments: </Label>
								<Input type="file" name="attachments" onChange={this.onInputChange} />
							</FormGroup>
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
			</div>
		);
	}
}
