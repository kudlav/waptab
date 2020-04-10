/**
 * @file Global settings component
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component} from 'react'
import Popup from "reactjs-popup";
import validate from '../validator';

export default class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cols: this.props.cols,
			engine: this.props.engine,
			bgColor: this.props.bgColor
		};

		this.handleColsChange = this.handleColsChange.bind(this);
		this.handleEngineChange = this.handleEngineChange.bind(this);
		this.handleBgColorChange = this.handleBgColorChange.bind(this);
		this.handleImport = this.handleImport.bind(this);
		this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
	}

	render() {
		return (
			<Popup trigger={<i className="material-icons" title={"Nastavení"}>settings</i>} modal={true}>
				{close => (
					<div className={"popup"}>
						<div className={"header"}>
							<div className={"title"}>Nastavení</div><i className="material-icons" title={"Zavřít"} onClick={close}>close</i>
						</div>
						<div className={"body"}>
							<form onSubmit={event => this.handleSubmitSettings(event, close)}>
								<label htmlFor={"search"}>Počet sloupců</label>
								<input
									type={"number"}
									id={"search"}
									defaultValue={this.props.cols}
									onChange={this.handleColsChange}
									min={1}
									max={10}
								/>
								<br/>
								<label htmlFor={"search"}>Vyhledávač</label>
								<select defaultValue={this.props.engine} onChange={this.handleEngineChange}>
									{Object.keys(this.props.engines).map(engine =>
										<option key={engine} value={engine}>{engine}</option>
									)}
								</select>
								<br/>
								<label htmlFor={'bgColor'}>Pozadí stránky</label>
								<input
									type={'color'}
									id={'bgColor'}
									defaultValue={this.props.bgColor}
									onChange={this.handleBgColorChange}
								/>
								<br/>
								<input type={"submit"} value={"Uložit"}/>
							</form>
							<br/>
							<button onClick={this.props.exportState}>Export nastavení</button>
							<label htmlFor={"import"} className={"button"}>Import nastavení</label>
							<input type={"file"} onChange={this.handleImport} id={"import"} />
							<button onClick={this.resetSettings}>Obnovit výchozí</button>
						</div>
					</div>
				)}
			</Popup>
		);
	}

	handleColsChange(event) {
		if (event.target.value !== '') {
			const value = Number.parseInt(event.target.value);
			if (Number.isNaN(value) || value < 0) {
				event.target.value = this.state.cols;
			}
			else {
				this.setState({cols: value});
			}
		}
	}

	handleEngineChange(event) {
		if (typeof this.props.engines[event.target.value] === 'string') {
			this.setState({ engine: event.target.value });
		}
	}

	handleBgColorChange(event) {
		this.setState({ bgColor: event.target.value });
	}

	handleImport(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = e => {
			this.importSettings(e.target.result)
		};
		reader.readAsText(file);
	}

	handleSubmitSettings(event, close) {
		event.preventDefault();
		this.props.changeSettings(this.state);
		close();
	}

	importSettings(string) {
		let settings;
		try {
			settings = JSON.parse(string);
		} catch (_) {
			return alert('Nahraný soubor musí být formátu JSON!');
		}

		const error = validate(settings);
		if (typeof error === 'string') {
			return alert(`Neplatný formát souboru!\n\n${error}`);
		}

		delete settings.heights;
		delete settings.widgetSettings;

		alert('Import proběhl úspěsně.');
		this.props.changeSettings(settings);
	}

	resetSettings() {
		window.localStorage.clear();
		location.reload();
	}
}
