/**
 * @file Fallback widget component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';

export default class AddWidget extends Component {

	constructor(props) {
		super(props);

		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);

		this.state = {open: false};
	}

	render() {
		return (
			<div className={"add-widget"}>
				{!this.state.open ?
					<i className="material-icons" title={"Přidat widget"} onClick={this.onOpen}>add</i>
				: // else
					<div className={"widget"}>
						<div>
							<i className="material-icons" title={"Zavřít"} onClick={this.onClose}>close</i>
							<span className={"title"}>Přidat widget</span>
						</div>
						{Object.keys(this.props.widgets).map(id =>
							<div key={id} className={"button"} onClick={() => this.handleAdd(id,this.props.widgets[id])}>{this.props.widgets[id]}</div>
						)}
					</div>
				}
			</div>
		);
	}

	handleAdd(id,text)
	{
		this.props.addWidget(this.props.column,id,text);
		this.setState({open: false});
	}

	onOpen() {
		this.setState({open: true});
	}

	onClose(event) {
		event.stopPropagation();
		this.setState({open: false});
	}

}
