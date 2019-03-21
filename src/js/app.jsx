import ReactDOM from 'react-dom';
import React from 'react';
import Form from './components/form.jsx';
import Matrix from './components/matrix.jsx';

class App extends React.Component {

    //Set the default state
    constructor(props) {
        super(props);
        this.state = {
            s1: '',
            s2: '',
            ss: 'blosum',
            ms: 1,
            mss: -1,
            gp: -8,
            affine: false,
            tb: [],
            at: true    //true == global(nw), false == local(sm)
        };
        this.updateState = this.updateState.bind(this);
        this.toggleAffine = this.toggleAffine.bind(this);
        this.toggleAlignment = this.toggleAlignment.bind(this);
    }

    //Update the state
    updateState(event, key) {
        this.setState({ [key]: event.target.value });
    }

    //Toggle alignment type
    toggleAlignment(checked) {
        this.setState({ at: checked });
    }

    //toggle affine
    toggleAffine(e) {
        this.setState({
            affine: e.target.checked
        })
    }

    //Render the app
    render() {
        return (
            <div className="container">
                <div className="app">
                    <Form   {...this.state} updateState={this.updateState} toggleAffine={this.toggleAffine} toggleAlignment={this.toggleAlignment}/>
                    {
                        this.state.s1 !== '' && this.state.s2 !== '' &&
                        <Matrix {...this.state} updateScoreMatrix={this.updateScoreMatrix} />
                    }
                </div>
            </div>
        )
    }
}

export default App;

//Render the app
ReactDOM.render(
    <App />,
    document.getElementById('root')
);