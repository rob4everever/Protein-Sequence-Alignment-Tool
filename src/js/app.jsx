import ReactDOM from 'react-dom';
import React from 'react';
import SequenceAligner from './sequence-alignment';

class App extends React.Component {
    constructor() {
        super();
        //default state
        this.state = {
            s1: '',
            s2: '',
            ms: 1,                  
            gp: -1,
            scoreSystem: 'blosum'   
        };
        this.handleChangeFor = this.handleChangeFor.bind(this);
    }

    setScoreSystem(event) {
        this.setState({ scoreSystem: event.target.value });
    }

    handleChangeFor(event, key) {
        this.setState({ [key]: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <form >
                        <div className="formHeader">
                            <div className="row">
                                <div className="one-half column">
                                    <input type="text" name="s1" placeholder="Sequence 1..." maxLength="20" className="sequeceInput" required id="sequence1" value={this.state.s1.value} onChange={event => this.handleChangeFor(event, 's1')} />
                                </div>
                                <div className="one-half column">
                                    <input type="text" name="s2" placeholder="Sequence 2..." maxLength="20" className="sequeceInput" required id="sequence2" value={this.state.s2.value} onChange={event => this.handleChangeFor(event, 's2')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="scoreConfig">
                                    <div className="one-third column">
                                        <p>
                                            <label>
                                                <input name="blosum" type="radio" value="blosum" checked={(this.state.scoreSystem == 'blosum')} onChange={event => this.setScoreSystem(event)} />
                                                &nbsp;BLOSUM62
                                            </label>
                                        </p>
                                    </div>
                                    <div className="one-third column">
                                        <p>
                                            <label>
                                                <input name="pam" type="radio" value="pam" checked={(this.state.scoreSystem == 'pam')} onChange={event => this.setScoreSystem(event)} />
                                                &nbsp;PAM250
                                            </label>
                                        </p>
                                    </div>

                                    <div className="one-third column">
                                        <p>
                                            <label>
                                                <input name="custom" type="radio" value="custom" checked={(this.state.scoreSystem == 'custom')} onChange={event => this.setScoreSystem(event)} />
                                                &nbsp;CUSTOM
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.scoreSystem == 'custom' &&
                                <div className="row">
                                    <div className="customScore">
                                        <div className="one-half column">
                                            <label>Match Score</label>
                                            <input type="number" name="matchScore" defaultValue="0" min="0" value={this.state.ms.value} onChange={event => this.handleChangeFor(event, 'ms')} />
                                        </div>
                                        <div className="one-half column">
                                            <label>Gap Score</label>
                                            <input type="number" name="gapPenalty" defaultValue="0" max="0" value={this.state.gp.value} onChange={event => this.handleChangeFor(event, 'gp')} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <Matrix displayValue={this.state.s1} displayValue1={this.state.s2} ms={this.state.ms} gp={this.state.gp} ss={this.state.scoreSystem} />
                    </form>
                </div>
            </div>
        );
    }
}

class Matrix extends React.Component {

    constructor(props) {
        super(props);
        this.sa = null;
        this.ss = this.props.ss;
    }

    buildGrid() {

        let x = this.props.displayValue.length;
        let y = this.props.displayValue1.length;

        var sa = new SequenceAligner(this.props.displayValue, this.props.displayValue1, Number(this.props.ms), Number(this.props.gp));
        var scoreMatrix = sa.buildMatrix();

        let table = []

        //loop each matrix column
        for (let i = 0; i < y + 2; i++) {

            let children = []

            //loop each cell within a column
            for (let j = 0; j < x + 2; j++) {

                //empty values
                if ((i == 0 & j == 0) || (i == 1 & j == 0) || (i == 0 & j == 1)) {
                    children.push(<td key={i + j}>{` `}</td>) //0,0
                }
                //top string
                else if (i == 0 && j > 1) {
                    children.push(<td key={i + j} className="tableHeader">{`${this.props.displayValue[j - 2]}`}</td>) //0,1,  0,2,  0,3
                }
                //bottom string
                else if (j == 0 && i > 1) {
                    children.push(<td key={i + j} className="tableHeader">{`${this.props.displayValue1[i - 2]}`}</td>) //1,0, 2,0, 3,0
                }
                else {
                    //copy score array into matrix
                    children.push(<td key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>) //1,0, 2,0, 3,0
                }

            }

            table.push(<tr key={i}>{children}</tr>);
            this.score = sa.scoreAlignment();
            
        }
        return table
    }

    render() {
        return (
            <div className="row">
                <div className="twelve columns">
                    {
                        this.props.displayValue != '' && this.props.displayValue1 != '' &&
                        <div className="matrix">
                            <table>
                                <tbody>
                                    {this.buildGrid()}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <Results score={this.score} />
            </div>
        );
    }
}

class Results extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="results">
                <p>Optimal Alignment: </p>
                <p>SCORE {this.props.score}</p>
            </div>
        )
    }
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
