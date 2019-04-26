import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';

export default class mycv extends Component {
	state = {
		fromations: [],
		accordion: [ true, false, false, false, false, false, false, false, false ]
	};
	toggleAccordion(tab) {
		const prevState = this.state.accordion;
		const state = prevState.map((x, index) => (tab === index ? !x : false));

		this.setState({
			accordion: state
		});
	}

	componentDidMount() {
		axios.get('http://localhost:3000/cv/dispalyMydemand/5ca4c3ac3bfc1ab634ecab55').then((data) => {
			this.setState({ fromations: data.data });
		});
	}
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<i className="fa fa-align-justify" /> My formations
					</CardHeader>
					<CardBody>
						<div id="accordion">
							{this.state.fromations.map((a, i) => (
                             
								<Card className="mb-0">
									<CardHeader id="headingTwo">
										<Button
											block
											color="link"
											className="text-left m-0 p-0"
											onClick={() => this.toggleAccordion(i)}
											aria-expanded={this.state.accordion[i]}
											aria-controls="collapseTwo"
										>
											<h5 className="m-0 p-0">
												{a.title} ({a.state})
											</h5>
										</Button>
									</CardHeader>
									<Collapse
										isOpen={this.state.accordion[i]}
										data-parent="#accordion"
										id="collapseTwo"
									>
										<CardBody>{a.description}</CardBody>
									</Collapse>
								</Card>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
		);
	}
}
