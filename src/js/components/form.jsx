import React from 'react';
import Switch from "react-switch";

export default class Form extends React.Component {

    //Render the form
    render() {
        return (
            <form>
                <div className="row">
                    <div className="twelve column">
                        <Switch onChange={this.props.toggleAlignment} checked={this.props.at} className="react-switch" />
                    </div>
                </div>
                <div className="row">
                    <div className="one-half column">
                        <input type="text" name="s1" placeholder="Sequence 1..." maxLength="20" className="sequeceInput" value={this.props.s1.value} onChange={event => this.props.updateState(event, 's1')} />
                    </div>
                    <div className="one-half column">
                        <input type="text" name="s2" placeholder="Sequence 2..." maxLength="20" className="sequeceInput" value={this.props.s2.value} onChange={event => this.props.updateState(event, 's2')} />
                    </div>
                </div>
                <div className="row">
                    <div className="one-third column">
                        <p>
                            <label>
                                <input name="blosum" type="radio" value="blosum" checked={(this.props.ss == 'blosum')} onChange={event => this.props.updateState(event, 'ss')} />
                                &nbsp;BLOSUM62
                            </label>
                        </p>
                    </div>
                    <div className="one-third column">
                        <p>
                            <label>
                                <input name="pam" type="radio" value="pam" checked={(this.props.ss == 'pam')} onChange={event => this.props.updateState(event, 'ss')} />
                                &nbsp;PAM250
                            </label>
                        </p>
                    </div>
                    <div className="one-third column">
                        <p>
                            <label>
                                <input name="custom" type="radio" value="custom" checked={(this.props.ss == 'custom')} onChange={event => this.props.updateState(event, 'ss')} />
                                &nbsp;CUSTOM
                            </label>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="twelve columns">
                        <label>Gap Score</label>
                        {
                            this.props.affine === true ? (
                                <input type="number" disabled="disabled" style={{ backgroundColor: 'grey' }} name="gapPenalty" defaultValue={this.props.gp} max="0" value={this.props.gp.value} onChange={event => this.props.updateState(event, 'gp')} />
                            ) : (
                                    <input type="number" name="gapPenalty" defaultValue={this.props.gp} max="0" value={this.props.gp.value} onChange={event => this.props.updateState(event, 'gp')} />
                                )
                        }
                        <input type="checkbox" name="affine" checked={this.props.affine.value} onChange={EVENT => this.props.toggleAffine(event)} />
                    </div>
                </div>
                {
                    this.props.ss == 'custom' &&
                    <div className="row">
                        <div className="one-half column">
                            <label>Match Score</label>
                            <input type="number" name="matchScore" defaultValue={this.props.ms} min="0" value={this.props.ms.value} onChange={event => this.props.updateState(event, 'ms')} />
                        </div>
                        <div className="one-half column">
                            <label>Mis-match Score</label>
                            <input type="number" name="misMatchScore" defaultValue={this.props.mss} max="0" value={this.props.mss.value} onChange={event => this.props.updateState(event, 'mss')} />
                        </div>
                    </div>
                }
            </form>
        )
    }
}