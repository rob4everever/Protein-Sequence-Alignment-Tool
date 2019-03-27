import React from 'react';
import SequenceAligner from '../sequence-alignment';
import Results from './results.jsx';

export default class Matrix extends React.Component {

    constructor(props){
        super(props);
        this.results = {};
    }

    /**
     * Creates a sequence alignment grid inside a HTML table
     * 
     * @returns {matrix} - array that contains a html table displaying the scored matrix 
     */
    buildGrid() {
        //sequence aligner object with all currently stored configuration values
        let sequenceAligner = new SequenceAligner(this.props.sequence1, this.props.sequence2,
            this.props.matchscore, this.props.mismatchscore,
            this.props.gappenalty, this.props.affine,
            this.props.needleman, this.props.scoresystem);

        //Get the score matrix
        let scoreMatrix = sequenceAligner.getScoreMatrix();

        //Empty html table
        let table = [];

        //Build the HTML table (loop +2 to account for gap penalties and the sequences)
        for (let i = 0; i < this.props.sequence1.length + 2; i++) {
            //Empty html table row
            let children = [];
            for (let j = 0; j < this.props.sequence2.length + 2; j++) {
                //Unused cells
                if ((i === 0 & j === 0) || (i === 0 & j === 1) || (i === 1 & j === 0)) {
                    children.push(<td className="tableHeader" key={i + j}>{` `}</td>);
                }
                //Left-side string
                else if (i > 1 && j === 0) {
                    children.push(<td className="tableHeader" key={i + j}>{`${this.props.sequence1[i - 2]}`}</td>);
                }
                //Top string
                else if (j > 1 && i === 0) {
                    children.push(<td className="tableHeader" key={i + j}>{`${this.props.sequence2[j - 2]}`}</td>);
                }
                //Score values
                else {
                    children.push(<td key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>)
                }
            }
            table.push(<tr key={i}>{children}</tr>);
        }
        
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
                <Results results={this.results}/>
            </div>

        );
    }
}






































// export default class Matrix extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     //Build a html table that contains the score matrix
//     buildGrid() {
//         let sequenceAligner = new SequenceAligner(this.props.s1, this.props.s2, this.props.ss, this.props.ms, this.props.mms, this.props.gp, this.props.affine, this.props.at);
//         let scoreMatrix = sequenceAligner.scoreMatrix();

//         let table = [];

//         for (let i = 0; i < this.props.s1.length + 2; i++) {

//             let children = [];

//             for (let j = 0; j < this.props.s2.length + 2; j++) {

//                 //Unused cells
//                 if ((i === 0 & j === 0) || (i === 0 & j === 1) || (i === 1 & j === 0)) {
//                     children.push(<td key={i + j}>{` `}</td>);
//                 }
//                 //Left-side string
//                 else if (i > 1 && j === 0) {
//                     children.push(<td key={i + j}>{`${this.props.s1[i - 2]}`}</td>);
//                 }
//                 //Top string
//                 else if (j > 1 && i === 0) {
//                     children.push(<td key={i + j}>{`${this.props.s2[j - 2]}`}</td>);
//                 }
//                 //Score values
//                 else {
//                     children.push(<td key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>)
//                 }
//             }

//             //Add row to the table
//             table.push(<tr key={i}>{children}</tr>);
//         }

//         return table;
//     }

//     //Render the table
//     render() {
//         return (
//             <table>
//                 {
//                     this.props.displayValue != '' && this.props.displayValue1 != '' &&
//                     <tbody>
//                         {this.buildGrid()}
//                     </tbody>
//                 }
//             </table>
//         );
//     }
// }