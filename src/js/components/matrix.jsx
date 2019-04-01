import React from 'react';
import SequenceAligner from '../sequence-alignment';
import Results from './results.jsx';
import ReactTooltip from 'react-tooltip'


export default class Matrix extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Creates a sequence alignment grid inside a HTML table
     * 
     * @returns {matrix} - array that contains a html table displaying the scored matrix 
     */
    buildGrid() {

        //Align sequences with the provided config optios
        let sequenceAligner = new SequenceAligner(this.props.sequence1, this.props.sequence2,
            this.props.matchscore, this.props.mismatchscore,
            this.props.gappenalty, this.props.needleman, this.props.scoresystem);

        let scoreMatrix = sequenceAligner.getScoreMatrix();
        this.optimalPath = sequenceAligner.getBestPath();

        //HTML table that contains the matrix
        let table = [];

        //Build the HTML table (loop +2 to account for gap penalties and the sequences)
        for (let i = 0; i < this.props.sequence1.length + 2; i++) {

            //HTML table row
            let children = [];

            for (let j = 0; j < this.props.sequence2.length + 2; j++) {

                //Unused cells
                if ((i === 0 & j === 0) || (i === 0 & j === 1) || (i === 1 & j === 0)) {
                    children.push(<td className="tableHeader" key={i + j}>{` `}</td>);
                }

                //Left sequences (sequence 1)
                else if (i > 1 && j === 0) {
                    children.push(<td className="tableHeader" key={i + j}>{`${this.props.sequence1[i - 2]}`}</td>);
                }

                //Top sequence (sequence 2)
                else if (j > 1 && i === 0) {
                    children.push(<td className="tableHeader" key={i + j}>{`${this.props.sequence2[j - 2]}`}</td>);
                }

                //Remaining cells
                else {

                    var cell = <td key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>;

                    if(i === 1 && j === 1){
                        cell = <td className="first" key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>;
                    }

                    //Determine if a cell is part of the optimal path
                    for (var k = 0; k < this.optimalPath.length; k++) {
                        var x = this.optimalPath[k][0];
                        var y = this.optimalPath[k][1];

                        //If it is then change the cell background colour
                        if (x === i && y === j) {
                            cell = <td
                                data-tip={sequenceAligner.getcalc()[k]}
                                className="path"
                                key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}
                                <ReactTooltip multiline={true} place="top" type="dark" effect="float" /></td>;
                        }
                    }
                    //Add cell to row
                    children.push(cell);
                }
            }
            //Add row to the table
            table.push(<tr key={i}>{children}</tr>);
        }

        //Get the best alignment and its score
        this.results = sequenceAligner.getResults();
        return table;
    }

    /**
     * Renders the Matrix component 
     * 
     * @returns {'<Matrix />'} - matrix component
     */
    render() {
        return (
            <div className="matrix">
                <table className="table">
                    {
                        this.props.sequence1 != '' && this.props.sequence2 != '' &&
                        <tbody>
                            {this.buildGrid()}
                        </tbody>
                    }
                </table>
                <Results results={this.results} />
            </div>
        );
    }
}