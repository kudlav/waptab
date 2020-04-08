/**
 * @file Container component for all widget types
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component, Suspense} from 'react';
import WidgetMissingErrorBoundary from './unsupportedWidget';

export default class WidgetContainer extends Component {

	constructor(props) {
		super(props);

		this.getHeight = this.getHeight.bind(this);
		this.openSettings = this.openSettings.bind(this);

		this.ref = React.createRef();
		this.height = 0;
	}

	render() {
		const Widget = React.lazy(() => import(`./${this.props.widget.type}/widget`));
		return (
			<div ref={this.ref} className={"widget"}>
				<div className={"header"}>
					<div className={"title"}>{this.props.widget.title}</div>
					<i className="material-icons" title={"Nastavení"} onClick={this.openSettings}>settings</i>
					<i className="material-icons" title={"Odebrat"} onClick={() => this.props.onRemove(this.props.id)}>close</i>
				</div>
				<div className={"body"}>
					<WidgetMissingErrorBoundary>
						<Suspense fallback={<div>Načítám widget...</div>}>
							<Widget done={this.getHeight} data={this.props.widget.data} />
						</Suspense>
					</WidgetMissingErrorBoundary>
				</div>
			</div>
		);
	}

	openSettings() {
		this.props.showWidgetSettings(this.props.id);
	}

	getHeight() {
		const height = Math.ceil(this.ref.current.clientHeight);
		const scroll = Math.ceil(this.ref.current.scrollHeight);
		if (this.height === 0 || scroll !== height) {
			this.height = scroll;
			this.props.updateHeight(this.props.id, scroll);
		}
	}

}
