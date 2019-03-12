import {Component} from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import SequenceAligner from './sequence-alignment';

class App extends React.Component {

    constructor () {
        super();
        this.state = {
            s1: '',
            s2: ''
        };
        this.handleChangeFor = this.handleChangeFor.bind(this);
    }

    printState (){
        console.log(this.state.s1);
        console.log(this.state.s2);
    }

    handleChangeFor (event, key){
        this.setState({ [key]: event.target.value });
    }

    render () {
        return (
            <div>
                <form>
                    <input type="text" name ="s1" value={this.state.s1.value}  onChange={event => this.handleChangeFor(event, 's1')} />
                    <input type="text" name ="s2" value={this.state.s2.value}  onChange={event => this.handleChangeFor(event, 's2')} />
                </form>
                <Matrix displayValue={this.state.s1} displayValue1={this.state.s2} />
            </div>
        );          
    }
}

class Matrix extends React.Component {

    constructor(props) {
        super(props);
    }

    buildGrid() {
        let x = this.props.displayValue.length;
        let y = this.props.displayValue1.length;

        var sa = new SequenceAligner(this.props.displayValue, this.props.displayValue1, 1, -1);
        let table = []
        
        let n = 0;
        // Outer loop to create parent
        for (let i = 0; i < y+2; i++) {
          let children = []
          //Inner loop to create children
            for (let j = 0; j < x+2; j++) {

                if(i==0 & j == 0){
                    children.push(<td key={i+j}>{`X`}</td>)
                }
                else if(i==1 & j == 0){
                    children.push(<td key={i+j}>{`X`}</td>)
                }
                else if(i==0 & j == 1){
                    children.push(<td key={i+j}>{`X`}</td>)
                }
                else if(i == 0 && j > 1){
                    children.push(<td key={i+j}>{`${this.props.displayValue[j-2]}`}</td>)
                }
                else if(j==0 && i > 1){
                    children.push(<td key={i+j}>{`${this.props.displayValue1[i-2]}`}</td>)
                }
                else{
                    //fill in score
                   
                    var scoreArr = sa.buildMatrix();
                    children.push(<td key={i+j}>{scoreArr[i-1][j-1]}</td>)
                }
            }

            //Create the parent and add the children
            table.push(<tr key={i}>{children}</tr>)
        }
        
        return table
    }

    scoreSequences() {

    }

    render() {

        return (
            <div>           
                <table>
                    <tbody>
                    {this.buildGrid()}
                    </tbody>
                </table>
                <p>SCORE: </p>
            </div>
        );
    }
}


export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  