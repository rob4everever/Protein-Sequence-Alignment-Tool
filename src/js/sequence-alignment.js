import { scoreMatch_blosum } from './res/score-systems.js';
import { scoreMatch_pam } from './res/score-systems.js';
import Results from './components/results.jsx';

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

        //Initiaise an empty array big enough to score the provided sequences (s1.length +1 x s2.length +!)
        this.scoreArray = [];
        for (let i = 0; i < this.s1.length + 1; i++) {
            this.scoreArray[i] = [];
            for (let j = 0; j < this.s2.length + 1; j++) {
                this.scoreArray[i][j] = 0;     //set all initial values to 0
            }
        }

        this.alignSequences();
    }

    /**
     * Aligns and scores two sequences using the provided configuration
     */
    alignSequences() {

        //add in the gap penalties
        this.addGapPenalty();

        //Needleman-Wiunsch
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
        //determine the scoring system
        //score appropiately

        if (this.scoresystem === 'custom') {
            for (let i = 1; i <= this.s1.length; i++) {
                for (let j = 1; j <= this.s2.length; j++) {
                    //get the highest score
                    this.scoreArray[i][j] = Math.max(
                        this.scoreArray[i - 1][j - 1] + (this.s1[i - 1] === this.s2[j - 1] ? parseInt(this.match) : parseInt(this.miss)),
                        this.scoreArray[i - 1][j] + parseInt(this.gap),
                        this.scoreArray[i][j - 1] + parseInt(this.gap)
                    );
                }
            }
        }
        else if (this.scoresystem === 'blosum') {
            for (let i = 1; i <= this.s1.length; i++) {
                for (let j = 1; j <= this.s2.length; j++) {
                    //get the highest score
                    this.scoreArray[i][j] = Math.max(
                        this.scoreArray[i - 1][j - 1] + scoreMatch_blosum(this.s1[i-1], this.s2[j-1]),
                        this.scoreArray[i - 1][j] + parseInt(this.gap),
                        this.scoreArray[i][j - 1] + parseInt(this.gap)
                    );
                }
            }
        }
    }

    addGapPenalty() {

        //affine
        if (this.affine) {

        } else {
            for (let i = 1; i < this.s1.length + 1; i++) {
                for (let j = 1; j < this.s2.length + 1; j++) {
                    this.scoreArray[0][j] = parseInt(this.gap) * j;
                    this.scoreArray[i][0] = parseInt(this.gap) * i;
                }
            }
        }
    }

    /**
     * Retuns an object that contains the best alignment and the alignment score
     */
    getResults() {

  
        var result = {};
        return result;
    }

    /**
     * Returns the completed score matrix of two sequences1
     */
    getScoreMatrix() {
        return this.scoreArray;
    }
}





































// export default class SequenceAligner {

//     constructor(s1, s2, ss, ms, mms, gp, af, at) {
//         this.s1 = s1;
//         this.s2 = s2;
//         this.ss = ss;
//         this.ms = ms;
//         this.mms = mms;
//         this.gp = gp;
//         this.af = af;
//         this.at = at;

//         this.arr = [];
//         this.score = 0;
//     }

//     //Create a 2d array the size of the 2 strings
//     buildMatrix() {
//         for (let i = 0; i < this.s1.length + 1; i++) {
//             this.arr[i] = [];
//             for (let j = 0; j < this.s2.length + 1; j++) {
//                 this.arr[i][j] = 0;
//             }
//         }
//     }

//     //Fill in the scores based on the chosen scoring scheme
//     scoreMatrix() {

//         //if(at = nw) -- globalScore()
//         //else -- localScore()

//         //Construct an empty matrix
//         this.buildMatrix();

//         //global
//         if (this.at) {
//             this.scoreGlobal();
//         }
//         //local
//         else {
//             this.scoreLocal();
//         }
//     }

//     scoreGlobal() {
//         console.log("glo");
//         //fill in the gap penalty
//         for (let i = 1; i < this.s1.length + 1; i++) {
//             for (let j = 1; j < this.s2.length + 1; j++) {
//                 this.arr[0][j] = this.gp * j;
//                 this.arr[i][0] = this.gp * i;
//             }
//         }

//         //Custom scoring
//         if (this.ss == 'custom') {
//             for (let i = 1; i < this.s1.length + 1; i++) {
//                 for (let j = 1; j < this.s2.length + 1; j++) {
//                     this.arr[i][j] = Math.max(
//                         this.arr[i - 1][j - 1] + (this.s2[i - 1] === this.s1[j - 1] ? parseInt(this.ms) : parseInt(this.gp)),
//                         this.arr[i - 1][j] + parseInt(this.gp),
//                         this.arr[i][j - 1] + parseInt(this.gp)
//                     );
//                 }
//             }
//         }
//         //Blosum scoring
//         else if (this.ss == 'blosum') {
//             this.gp = -8;
//             for (let i = 1; i < this.s1.length + 1; i++) {
//                 for (let j = 1; j < this.s2.length + 1; j++) {
//                     this.arr[i][j] = Math.max(
//                         this.arr[i - 1][j - 1] + scoreMatch_blosum(this.s1[j - 1], this.s2[j - 1]),
//                         this.arr[i - 1][j] + parseInt(this.gp),
//                         this.arr[i][j - 1] + parseInt(this.gp)
//                     );
//                 }
//             }
//         }
//         //Pam scoring
//         else if (this.ss == 'pam') {
//             for (let i = 1; i < this.s1.length + 1; i++) {
//                 for (let j = 1; j < this.s2.length + 1; j++) {
//                     this.arr[i][j] = Math.max(
//                         this.arr[i - 1][j - 1] + scoreMatch_pam(this.s1[j - 1], this.s2[j - 1], this.gp),
//                         this.arr[i - 1][j] + parseInt(this.gp),
//                         this.arr[i][j - 1] + parseInt(this.gp)
//                     );
//                 }
//             }
//         }

//         console.log(this.arr);
//         return this.arr;
//     }

//     //Return the alignment score
//     getScore() {
//         return this.arr[this.arr.length - 1][this.arr[0].length - 1]
//     }
// };





























//     //get score
//     //align matrix
//     //get alignment

// // export default class SequenceAligner {

// //     constructor(s1, s2, sp, gp) {
// //         this.s1 = s1;
// //         this.s2 = s2;
// //         this.sp = sp;
// //         this.gp = gp;
// //         this.arr = [];
// //         this.score = 0;
// //         this.a = new Array(2);
// //     }

// //     buildMatrix() {

// //         //create an empty array of arrays
// //         for (var i = 0; i <= this.s2.length; i++) {
// //             this.arr[i] = [];

// //             for (var j = 0; j <= this.s1.length; j++) {
// //                 this.arr[i][j] = null;
// //             }
// //         }

// //         //set the top corner value to 0

// //         //i1 - s2.length
// //         for (var i = 0; i <= this.s2.length; i++) {
// //             this.arr[i][0] = this.gp * i;
// //         } for (var i =0; i <= this.s1.length; i++) {
// //             this.arr[0][i] = this.gp * i;
// //         }

// //         for (var i = 0; i <= this.s2.length; i++) {
// //             for (var j = 0; j <= this.s1.length; j++) {
// //                 this.arr[i][j] = Math.max(
// //                     this.arr[i - 1][j - 1] + (this.s2[i - 1] === this.s1[j - 1] ? this.sp : this.gp),
// //                     this.arr[i - 1][j] + this.gp,
// //                     this.arr[i][j - 1] + this.gp
// //                 );
// //             }
// //         }

// //         this.optimalAlignment();
// //         return this.arr;
// //     }

// //     optimalAlignment() {
// //         var i = this.s2.length;
// //         var j = this.s1.length;
// //         var sq1 = [];
// //         var sq2 = [];
//         do {
//             var t = this.arr[i - 1][j];
//             var d = this.arr[i - 1][j - 1];
//             var l = this.arr[i][j - 1];
//             var max = Math.max(t, d, l);
//             switch (max) {
//                 case t:
//                     i--;
//                     sq1.push('*');
//                     sq2.push(this.s2[i]);
//                     break;
//                 case d:
//                     j--;
//                     i--;
//                     sq1.push(this.s1[j]);
//                     sq2.push(this.s2[i]);
//                     break;
//                 case l:
//                     j--;
//                     sq1.push(this.s1[j]);
//                     sq2.push('*');
//                     break;
//             }
//         } while (i > 0 && j > 0);

// //         var str1 = sq1.reverse().join();
// //         var str2 = sq2.reverse().join();
// //         this.a.push(str1);
// //         this.a.push(str2);
// //     }

// //     getOp(){
// //         return this.a;

// //     }

// //     scoreAlignment() {
// //         this.score = this.arr[this.arr.length - 1][this.arr[0].length - 1];
// //         return this.score;
// //     }
// // };  