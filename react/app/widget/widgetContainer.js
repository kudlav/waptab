/**
 * @file Container component for all widget types
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component, Suspense} from 'react';
import WidgetMissingErrorBoundary from './unsupportedWidget';

export default class WidgetContainer extends Component {

	render() {
		const Widget = React.lazy(() => import(`./${this.props.widget.type}/widget`));
		return (
			<div className={"widget"}>
				<div className={"header"}>
					<div className={"title"}>{this.props.widget.title}</div>
					<i className="material-icons" title={"Nastavení"}>settings</i>
					<i className="material-icons" title={"Odebrat"} onClick={() => this.props.onRemove(this.props.id)}>close</i>
				</div>
				<div className={"body"}>
					<WidgetMissingErrorBoundary>
						<Suspense fallback={<div>Načítám widget...</div>}>
							<Widget data={this.props.widget.data} />
						</Suspense>
					</WidgetMissingErrorBoundary>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.widget.title !== nextProps.widget.title ||
			this.props.widget.data !== nextProps.widget.data ||
			this.props.widget.type !== nextProps.widget.type
		);
	}
}
