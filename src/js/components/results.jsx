import React from 'react';

export default class Results extends React.Component {

    /**
    * Renders the results component
    * 
    * @returns {'<Results />'} - form component
    */
    render() {
        return (
            <div className="results">
                <div className="row">
                    <div className="col">
                        <div className="score">
                            <p className="title">Score: {this.props.results.score}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="alignment">
                            <p className="title">Best Alignment</p>
                            <p>{this.props.results.seq1}</p>
                            <p>{this.props.results.seq2}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="explanation">
                            <br /><hr></hr><br />
                            <h5> Needleman-Wunsch</h5>
                            <p>
                                Needleman Wunsch algorithm is used to perform global sequence alignment between
                                two nucleotide or amino acid sequences to determine any structural similarity.
                                The goal of the algorithm is to find the alignment with the greatest score.<br /><br />

                                Steps <br /><br />

                                1) Determine the scoring system you want to use. Popular choices include Blosum62 and PAM250, or even a custom scoring system. <br /><br />

                                2) Initialise a matrix that can contain both sequences as well as an extra column and row for the gap penalties. <br /><br />

                                3) Fill in the gap penalties in the first column and the firstrow of the matrix, using values based on the chosen scoring system. <br /><br />

                                4) Score every remaining cell starting from the top left cell to the bottom right cell. To determine the maxiumum score of each
                                cell, one must take the values from its 3 neighbours; the left cell, the above cell and the above-left cell. With the diagonal cell, you must
                                add the match score if the characters are the same or the mismatch score if they are not. Likewise, with the remaining two neighbours we
                                add a gap penalty to their values. The maximum of these three values is entered into the cell. This process is repeated until all of the cells
                                of the Matrix have been scored. <br /><br />

                                The formula is as followed:<br />

                                Matrix(i, j) = max (<br />
                                &emsp;&emsp;Matrix(i-1, j-1) + score(sequece(i), sequence(j)),<br />
                                &emsp;&emsp;Matrix(i-1, j) + gap penalty,<br />
                                &emsp;&emsp;Matrix(i, j-1) + gap penalty<br />
                                )<br /><br />

                                5) To obtain the optimal alignment, `traceback` from the end of the matrix to the start.
                                The traceback path is determined by assessing which direction the current cells value came from and moving to that cell. This process is repeated until
                                the start of the matrix is reached.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}