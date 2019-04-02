import React from 'react';
import Switch from 'react-bootstrap-switch';

/**
 * Builds the form component
 * All data needed to build the matrix and align the sequences
 * is gathered here
 */
export default class Form extends React.Component {

    /**
     * Renders the form component
     * 
     * @returns {'<Form />'} - form component
     */
    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            {
                                this.props.needleman === true ? (
                                    <div className="header bg-success">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="needleman" name="needleman" checked={(this.props.needleman == true)} onChange={this.props.toggleAlignment} />
                                            <label className="custom-control-label" htmlFor="needleman"> Needleman-Wunsch (Global)  </label>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="header bg-primary">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input" id="needleman" name="needleman" checked={(this.props.needleman == true)} onChange={this.props.toggleAlignment} />
                                                <label className="custom-control-label" htmlFor="needleman"> Smith-Waterman (Local) </label>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className="formbody">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input type="text" name="s1" id="s1" maxLength="20" className="form-control" placeholder="AND" value={this.props.sequence1.value} onChange={event => this.props.updateState(event, 'sequence1')} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input type="text" name="s2" id="s2" maxLength="20" className="form-control" placeholder="SEND" value={this.props.sequence2.value} onChange={event => this.props.updateState(event, 'sequence2')} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group custom-control custom-radio custom-control-inline">
                                <input name="blosum" className="custom-control-input" id="blosum" type="radio" value="blosum" checked={(this.props.scoresystem == 'blosum')} onChange={event => this.props.updateState(event, 'scoresystem')} />
                                <label className="custom-control-label" htmlFor="blosum">BLOSUM62</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group custom-control custom-radio custom-control-inline">
                                <input name="custom" type="radio" className="custom-control-input" id="custom" value="custom" checked={(this.props.scoresystem == 'custom')} onChange={event => this.props.updateState(event, 'scoresystem')} />
                                <label className="custom-control-label" htmlFor="custom">CUSTOM</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                {
                                    this.props.scoresystem === 'custom' && this.props.needleman === true &&
                                    <label htmlFor="match">
                                        <input type="number" className="form-control" id="match" name="matchScore" defaultValue={this.props.matchscore} min="0" value={this.props.matchscore.value} onChange={event => this.props.updateState(event, 'matchscore')} />
                                        Match Score
                                    </label>
                                }
                            </div>
                        </div>
                        <div className="col">
                            {
                                this.props.needleman === true &&
                                <div className="form-group">
                                    <label htmlFor="id">
                                        <input type="number" className="form-control" id="id" name="gapPenalty" defaultValue={this.props.gappenalty} max="0" value={this.props.gappenalty.value} onChange={event => this.props.updateState(event, 'gappenalty')} />
                                        Gap Score
                                </label>

                                </div>
                            }

                        </div>
                        <div className="col">
                            <div className="form-group">
                                {
                                    this.props.scoresystem === 'custom' && this.props.needleman === true &&
                                    <label htmlFor="miss">
                                        <input type="number" className="form-control" id="miss" name="misMatchScore" defaultValue={this.props.mismatchscore} max="0" value={this.props.mismatchscore.value} onChange={event => this.props.updateState(event, 'mismatchscore')} />
                                        Miss Score
                                    </label>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        )
    }
}