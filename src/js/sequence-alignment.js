import { scoreMatch_blosum } from './res/score-systems.js';

export default class SequenceAligner {

    /**
     * Configures the sequence alignmer
     * 
     * @param {*} s1 - sequence 1
     * @param {*} s2 - sequence 2
     * @param {*} match - match score
     * @param {*} miss - miss score
     * @param {*} gap - gap penalty
     * @param {*} affine - use affine gap penalty?
     * @param {*} needleman - use global alignment? (or local)
     * @param {*} scoresystem - type of scoring system to use
     */
    constructor(s1, s2, match, miss, gap, affine, needleman, scoresystem) {
        this.s1 = s1;
        this.s2 = s2;
        this.match = match;
        this.miss = miss;
        this.gap = gap;
        this.affine = affine;
        this.needleman = needleman;
        this.scoresystem = scoresystem;
        this.traceback = [];
        this.st1 = [];
        this.st2 = [];
        this.op = [];
        this.calc = [];
        
        //Initiaise an empty array big enough to score the provided sequences
        this.scoreArray = [];
        for (let i = 0; i < this.s1.length + 1; i++) {
            this.scoreArray[i] = [];
            this.traceback[i] = [];
            for (let j = 0; j < this.s2.length + 1; j++) {
                this.scoreArray[i][j] = 0;
                this.traceback[i][j] = null;
            }
        }

        //Set the first values of the arrays
        this.scoreArray[0][0] = 0;
        this.traceback[0][0] = "X";

        //Begin alignment
        this.alignSequences();
    }

    /**
     * Aligns and scores two sequences using the provided configuration
     */
    alignSequences() {

        //add in the gap penalties
        this.addGapPenalty();

        //Needleman-Wunsch
        if (this.needleman) {
            this.scoreGlobalAlignment();
        }
        //Smith-Waterman
        else if (!this.needleman) {
            this.scoreLocalAlignment();
        }
    }

    /**
     * Scores an alignment locally using the Smith-Waterman algorithm
     */
    scoreLocalAlignment() {
       console.log("LOCAL");
    }

    /**
     * Scores an alignment globally using the Needleman-Wunsch algorithm
     */
    scoreGlobalAlignment() {

        //Custom scoring
        if (this.scoresystem === 'custom') {
            for (let i = 1; i <= this.s1.length; i++) {
                for (let j = 1; j <= this.s2.length; j++) {
                    this.scoreArray[i][j] = Math.max(
                        this.scoreArray[i - 1][j - 1] + (this.s1[i - 1] === this.s2[j - 1] ? parseInt(this.match) : parseInt(this.miss)),
                        this.scoreArray[i - 1][j] + parseInt(this.gap),
                        this.scoreArray[i][j - 1] + parseInt(this.gap)
                    );
                }
            }
        }
        //Blosum62 scoring
        else if (this.scoresystem === 'blosum') {
            for (let i = 1; i <= this.s1.length; i++) {
                for (let j = 1; j <= this.s2.length; j++) {`    `
                    this.scoreArray[i][j] = Math.max(
                        this.scoreArray[i - 1][j - 1] + scoreMatch_blosum(this.s1[i - 1], this.s2[j - 1]),
                        this.scoreArray[i - 1][j] + parseInt(this.gap),
                        this.scoreArray[i][j - 1] + parseInt(this.gap)
                    );
                }
            }
        }

        this.fillInTracebackMatrix();
    }

    addGapPenalty() {

        if (this.affine) {

        } else {
            for (let i = 1; i < this.s1.length + 1; i++) {
                for (let j = 1; j < this.s2.length + 1; j++) {
                    this.scoreArray[0][j] = parseInt(this.gap) * j;
                    this.scoreArray[i][0] = parseInt(this.gap) * i;
                    this.traceback[0][j] = "L";
                    this.traceback[i][0] = "U";
                }
            }
        }
    }

    /**
     * Completes a traceback matrix 
     */
    fillInTracebackMatrix() {

        //Loop through each value in he score matrix and determine which direction a cell got its score
        for (var i = this.scoreArray.length - 1; i > 0; i--) {
            for (var j = this.scoreArray[0].length - 1; j > 0; j--) {
                var diag = this.scoreArray[i - 1][j - 1] + (this.s2[i - 1] === this.s1[j - 1] ? parseInt(this.match) : parseInt(this.miss));
                var left = this.scoreArray[i][j - 1] + parseInt(this.gap);
                var up = this.scoreArray[i - 1][j] + parseInt(this.gap);
                var max = Math.max(diag, left, up);

                if (max === diag) {
                    this.traceback[i][j] = "D";
                } else if (max === up) {
                    this.traceback[i][j] = "U";
                } else if (max === left) {
                    this.traceback[i][j] = "L";
                }
            }
        }

        var i = this.s1.length;
        var j = this.s2.length;
        this.followPath(i, j);
    }

    getcalc(){
        return this.calc;
    }
    
    /**
     * Recursive functions that follows an optimal path from the final cell to the first cell
     * 
     * @param {i} - sequence 1 length
     * @param {j} - sequence 2 length
     */
    followPath(i, j) {
        if (i > 0 || j > 0) {
            if (this.traceback[i][j] === "D") {
                this.st1.push(this.s1[i - 1]);
                this.st2.push(this.s2[j - 1]);
                this.op.push([i+1, j+1]);

                if(this.scoresystem === "custom"){
                    var calculation = "Score derived from the diagonal cell"+'<br />' 
                    + this.scoreArray[i-1][j-1] +  " + " + (this.s2[j - 1] === this.s1[i - 1] ? parseInt(this.match) : parseInt(this.miss)) + " = " + (this.scoreArray[i-1][j-1] + (this.s2[j - 1] === this.s1[i - 1] ? parseInt(this.match) : parseInt(this.miss)));
                }
                else{
                    var calculation = "Score derived from the diagonal cell"+'<br />' 
                    + this.scoreArray[i-1][j-1] +  " + " + scoreMatch_blosum(this.s1[i - 1], this.s2[j - 1]) + " = " + (this.scoreArray[i-1][j-1]+scoreMatch_blosum(this.s1[i - 1], this.s2[j - 1]));
                }
                this.calc.push(calculation);
                return this.followPath(i - 1, j - 1);
            } 
            else if (this.traceback[i][j] === "L") {
                this.st1.push("*");
                this.st2.push(this.s2[j - 1]);
                this.op.push([i+1, j+ 1]);
                var calculation =  "Score derived from left cell"+'<br />' 
                + this.scoreArray[i][j-1] +  " + " + this.gap + " = " + (this.scoreArray[i][j-1]+parseInt(this.gap));
                this.calc.push(calculation);
                return this.followPath(i, j - 1);
            } 
            else if (this.traceback[i][j] === "U") {
                this.st1.push(this.s1[i - 1]);
                this.st2.push("*");
                this.op.push([i+1, j+1  ]);
                var calculation =  "Score derived from the above cell"+'<br />' 
                + this.scoreArray[i-1][j] +  " + " + this.gap + " = " + (this.scoreArray[i-1][j]+parseInt(this.gap));
                this.calc.push(calculation);
                return this.followPath(i - 1, j);
            }
        } 
        else {
            return;
        }
    }

    /**
     * Get the results of an alignment
     * 
     * @return {results} - Optimal alignment and its score
     */
    getResults() {
        var temp1 = this.st1.reverse().join();
        var temp2 = this.st2.reverse().join();
        var string1 = temp1.replace(/,/g, '').split('').join(' ');
        var string2 = temp2.replace(/,/g, '').split('').join(' ');
        var results = { seq1: string1, seq2: string2, score: this.scoreArray[this.scoreArray.length - 1][this.scoreArray[0].length - 1] }
        return results;
    }

    /**
     * Get the score matrix
     * 
     * @return {results} - Score matrix
    */
    getScoreMatrix() {
        return this.scoreArray;
    }

    /**
     * Get the optimal path of an alignment
     * 
     * @return {op} - Optimal path
     */
    getBestPath() {
        return this.op;
    }
}