import ReactDOM from 'react-dom';
import React from 'react';
import Form from './components/form.jsx';
import Matrix from './components/matrix.jsx';

/**
 * Renders each component that makes up the web app.
 * State is also stored here to be accessed from all child components.
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sequence1: 'WAHA',
            sequence2: 'HHASU',
            needleman: true,
            scoresystem: 'blosum',
            gappenalty: -8,
            matchscore: 1,
            mismatchscore: -1,
        }

        //Bind class methods
        this.updateState = this.updateState.bind(this);
        this.toggleAlignment = this.toggleAlignment.bind(this);
        this.toggleAffine = this.toggleAffine.bind(this);
    }

    /**
    * Toggles the alignment system between global and local
    * 
    * @param {event} - new state value
    */
    toggleAlignment(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Updates the app state based on the given parameters
     * 
     * @param {event} - new state value
     * @param {key} - state to change
     */
    updateState(event, key) {
        this.setState({ [key]: event.target.value });
    }

    /**
     * Toggles the affine gap penalty on or off
     * 
     * @param {event} - new state value
     */
    toggleAffine(event) {
        this.setState({ 'affine': event.target.checked });
    }

    /**
     * Renders the app to the page
     * Note: Matrix only gets rendered if both sequences are valid
     * 
     * @returns {<div className="app"></div>} - the web app
     */
    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="row">
                        <div className="col-12">
                            <Form {...this.state} updateState={this.updateState} toggleAlignment={this.toggleAlignment} toggleAffine={this.toggleAffine} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {
                                this.state.sequence1 !== '' && this.state.sequence2 !== '' &&
                                <Matrix {...this.state} updateResults={this.updateResults} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default App;

//Render the app
ReactDOM.render(
    <App />,
    document.getElementById('root')
);