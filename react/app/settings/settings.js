/**
 * @file Global settings component
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component} from 'react'
import Popup from "reactjs-popup";

export default class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cols: this.props.cols,
			engine: this.props.engine
		};

		this.handleColsChange = this.handleColsChange.bind(this);
		this.handleEngineChange = this.handleEngineChange.bind(this);
	}

	render() {
		return (
			<Popup trigger={<i className="material-icons" title={"Nastavení"}>settings</i>} modal={true}>
				{close => (
					<div className={"popup"}>
						<div className={"title"}>
							<i className="material-icons" title={"Zavřít"} onClick={close}>close</i> Nastavení
						</div>
						<form onSubmit={() => this.props.changeSettings(this.state)}>
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
							<select value={this.state.engine} onChange={this.handleEngineChange}>
								{Object.keys(this.props.engines).map(engine =>
									<option value={engine}>{engine}</option>
								)}
							</select>
							<br/>
							<input type={"submit"} value={"Uložit"}/>
						</form>
						<br/>
						<button>Export nastavení</button>
						<button>Import nastavení</button>
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
}
