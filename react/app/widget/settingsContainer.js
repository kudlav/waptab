/**
 * @file Container component for all widget types
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component, Suspense} from 'react';
import SettingsMissingErrorBoundary from './unsupportedSettings';
import Popup from "reactjs-popup";

export default class SettingsContainer extends Component {

	constructor(props) {
		super(props);

		this.closeSettings = this.closeSettings.bind(this);
	}

	render() {
		const Settings = React.lazy(() => import(`./${this.props.widget}/settings`));
		return (
			<Popup open={true} modal={true} onClose={this.closeSettings}>
				{close => (
					<div className={"popup"}>
						<div className={"header"}>
							<div className={"title"}>Nastavení widgetu</div><i className="material-icons" title={"Zavřít"} onClick={close}>close</i>
						</div>
						<div className={"body"}>
							<SettingsMissingErrorBoundary>
								<Suspense fallback={<div>Načítám nastavení...</div>}>
									<Settings data={this.props.data} onSave={(data, title) => this.props.onSave(this.props.id, data, title)} />
								</Suspense>
							</SettingsMissingErrorBoundary>
						</div>
					</div>
				)}
			</Popup>
		);
	}

	closeSettings() {
		this.props.showWidgetSettings(null);
	}
}
