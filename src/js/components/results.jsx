import React from 'react';

export default class Results extends React.Component {

    render() {
        return (
            <div className="results">
                <div className="row">
                    <div className="col">
                        <p>Score: {this.props.results.alignmentscore}</p>
                    </div>
                    <div className="col">
                        <p>Best Alignment</p>
                        <p>{this.props.results.string1}</p>
                        <p>{this.props.results.string2}</p>
                    </div>
                </div>
            </div>
        )
    }
}