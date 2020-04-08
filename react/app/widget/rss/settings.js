/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';

export default class RssSettings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			source: this.props.data.source
		};

		this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
		this.handleSourceChange = this.handleSourceChange.bind(this);
	}

	render() {
			return (
				<form onSubmit={event => this.handleSubmitSettings(event)}>
					<label htmlFor={"source"}>Zdroj dat</label>
					<input
						type={"text"}
						id={"source"}
						defaultValue={this.state.source}
						onChange={this.handleSourceChange}
						size={50}
					/>
					<br/>
					<input type={"submit"} value={"Uložit"}/>
				</form>
			);
	}

	handleSourceChange(event) {
		this.setState({ source: event.target.value });
	}

	handleSubmitSettings(event) {
		event.preventDefault();
		this.props.onSave(this.state, `RSS – ${this.state.source}`);
	}
}
