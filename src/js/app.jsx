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
            sequence1: 'GAAG',
            sequence2: 'GCAACG',
            needleman: true,
            scoresystem: 'blosum',
            gappenalty: -8,
            affine: false,
            matchscore: 1,
            mismatchscore: -1,
            results: {writable: true}
        }

        //Bind class methods
        this.updateState = this.updateState.bind(this);
        this.toggleAlignment = this.toggleAlignment.bind(this);
        this.toggleAffine = this.toggleAffine.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

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
     * @param {event} 
     */
    toggleAffine(event) {
        this.setState({ 'affine': event.target.checked });
    }

    updateResults(x){
        this.setState({ 'results': x});

    }
    /**
     * Renders the app to the page
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
                                <Matrix {...this.state}  updateResults={this.updateResults}/> 
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;

//Render the app
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// {
//     this.state.s1 !== '' && this.state.s2 !== '' &&
//     <Matrix {...this.state} updateScoreMatrix={this.updateScoreMatrix} />
// }