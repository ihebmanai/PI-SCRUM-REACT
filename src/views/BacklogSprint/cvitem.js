import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';

class cvitem extends Component {
	state = {
		accordion: [ true, false, false ]
	};
	toggleAccordion(tab) {
		const prevState = this.state.accordion;
		const state = prevState.map((x, index) => (tab === index ? !x : false));

		this.setState({
			accordion: state
		});
	}
	render() {
		return (
			<Card className="mb-0">
				<CardHeader id="headingOne">
					<Button
						block
						color="link"
						className="text-left m-0 p-0"
						onClick={() => this.toggleAccordion(this.props.i)}
						aria-expanded={this.state.accordion[this.props.i]}
						aria-controls="collapseOne"
					>
						<h5 className="m-0 p-0">Collapsible Group Item #1</h5>
					</Button>
				</CardHeader>
				<Collapse
					isOpen={this.state.accordion[0]}
					data-parent="#accordion"
					id="collapseOne"
					aria-labelledby="headingOne"
				>
					<CardBody>
						1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
						squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa
						nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
						single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer
						labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
						Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
						haven't heard of them accusamus labore sustainable VHS.
					</CardBody>
				</Collapse>
			</Card>
		);
	}
}
export default cvitem;
