/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';

export default class ForecastSettings extends Component {

	constructor(props) {
		super(props);

		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
		this.handleSourceChange = this.handleSourceChange.bind(this);

		this.state = {
			city: this.props.data.city,
			source: this.props.data.source
		};
	}

	render() {
			return (
				<form onSubmit={event => this.handleSubmitSettings(event)}>
					<label htmlFor={"city"}>Město</label>
					<input
						type={"text"}
						id={"city"}
						defaultValue={this.state.city}
						onChange={this.handleCityChange}
					/>
					<br/>
					<label htmlFor={"source"}>Zdroj dat</label>
					<select id={"source"} defaultValue={this.state.source} onChange={this.handleSourceChange}>
							<option key={"accuweather"} value={"accuweather"}>AccuWeather</option>
							<option key={"openweathermap"} value={"openweathermap"}>OpenWeatherMap</option>
					</select>
					<br/>
					<input type={"submit"} value={"Uložit"}/>
				</form>
			);
	  }

	handleCityChange(event) {
		this.setState({ city: event.target.value });
	}

	handleSourceChange(event) {
		this.setState({ source: event.target.value });
	}

	handleSubmitSettings(event) {
		event.preventDefault();
		this.props.onSave(this.state, `Počasí – ${this.state.city}`);
	}
}
