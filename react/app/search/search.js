/**
 * @file Global settings component
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component} from 'react'

export default class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onQueryChange = this.onQueryChange.bind(this);
	}

	render() {
		return (
			<div className={"search"}>
				<form onSubmit={this.onSubmit}>
					<input type={"search"} placeholder={this.props.engine} onChange={this.onQueryChange}/>
					<button type="submit"><i className="material-icons">search</i></button>
				</form>
			</div>
		);
	}

	onQueryChange(event) {
		this.setState({query: event.target.value})
	}

	onSubmit(event) {
		event.preventDefault();
		window.location = this.props.engines[this.props.engine] + encodeURI(this.state.query);
	}

}
