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
			cols: this.props.cols
		};

		this.handleColsChange = this.handleColsChange.bind(this);
	}

	render() {
		return (
			<Popup trigger={<i className="material-icons" title={"Nastavení"}>settings</i>} modal={true}>
				{close => (
					<div className={"popup"}>
						<i className="material-icons" title={"Zavřít"} onClick={close}>close</i><br/>
						<label>Počet sloupců</label>
						<input
							type={"number"}
							defaultValue={this.props.cols}
							onChange={this.handleColsChange}
							min={1}
						/><br/>
						<input
							type={"button"}
							value={"Uložit"}
							onClick={() => this.props.changeCols(this.state.cols)}
						/><br/>
						<button>Export nastavení</button>
						<button>Import nastavení</button>
					</div>
				)}
			</Popup>
		);
	}

	handleColsChange(event) {
		const value = Number.parseInt(event.target.value);
		if (Number.isNaN(value) || value < 0) {
			event.target.value = this.state.cols;
		}
		else {
			this.setState({cols: value});
		}
	}
}
