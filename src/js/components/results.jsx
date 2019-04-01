import React from 'react';

export default class Results extends React.Component {

    /**
    * Renders the results component
    * 
    * @returns {'<Results />'} - form component
    */
    render() {
        return (
            <div className="results">
                <div className="row">
                    <div className="col">
                        <div className="score">
                            <p className="title">Score: {this.props.results.score}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="alignment">
                            <p className="title">Best Alignment</p>
                            <p>{this.props.results.seq1}</p>
                            <p>{this.props.results.seq2}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}