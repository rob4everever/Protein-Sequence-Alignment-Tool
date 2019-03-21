import React from 'react';
import SequenceAligner from '../sequence-alignment';

export default class Matrix extends React.Component {

    constructor(props) {
        super(props);
    }

    //Build a html table that contains the score matrix
    buildGrid() {
        let sequenceAligner = new SequenceAligner(this.props.s1, this.props.s2, this.props.ss, this.props.ms, this.props.mms, this.props.gp, this.props.affine, this.props.at);
        let scoreMatrix = sequenceAligner.scoreMatrix();
        
        let table = [];

        for (let i = 0; i < this.props.s1.length + 2; i++) {

            let children = [];

            for (let j = 0; j < this.props.s2.length + 2; j++) {

                //Unused cells
                if ((i === 0 & j === 0) || (i === 0 & j === 1) || (i === 1 & j === 0)) {
                    children.push(<td key={i + j}>{` `}</td>);
                }
                //Left-side string
                else if (i > 1 && j === 0) {
                    children.push(<td key={i + j}>{`${this.props.s1[i - 2]}`}</td>);
                }
                //Top string
                else if (j > 1 && i === 0) {
                    children.push(<td key={i + j}>{`${this.props.s2[j - 2]}`}</td>);
                }
                //Score values
                else {
                    children.push(<td key={i + j}>{`${scoreMatrix[i - 1][j - 1]}`}</td>)
                }
            }

            //Add row to the table
            table.push(<tr key={i}>{children}</tr>);
        }

        return table;
    }

    //Render the table
    render() {
        return (
            <table>
                {
                    this.props.displayValue != '' && this.props.displayValue1 != '' &&
                    <tbody>
                        {this.buildGrid()}
                    </tbody>
                }
            </table>
        );
    }
}