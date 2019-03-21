import { scoreMatch_blosum } from './res/score-systems.js';
import { scoreMatch_pam } from './res/score-systems.js';


export default class SequenceAligner {

    constructor(s1, s2, ss, ms, mms, gp, af, at) {
        this.s1 = s1;
        this.s2 = s2;
        this.ss = ss;
        this.ms = ms;
        this.mms = mms;
        this.gp = gp;
        this.af = af;
        this.at = at;

        this.arr = [];
        this.score = 0;
    }

    //Create a 2d array the size of the 2 strings
    buildMatrix() {
        for (let i = 0; i < this.s1.length + 1; i++) {
            this.arr[i] = [];
            for (let j = 0; j < this.s2.length + 1; j++) {
                this.arr[i][j] = 0;
            }
        }
    }

    //Fill in the scores based on the chosen scoring scheme
    scoreMatrix() {

        //if(at = nw) -- globalScore()
        //else -- localScore()

        //Construct an empty matrix
        this.buildMatrix();

        //global
        if (this.at) {
            this.scoreGlobal();
        }
        //local
        else {
            this.scoreLocal();
        }
    }

    scoreGlobal() {
        console.log("glo");
        //fill in the gap penalty
        for (let i = 1; i < this.s1.length + 1; i++) {
            for (let j = 1; j < this.s2.length + 1; j++) {
                this.arr[0][j] = this.gp * j;
                this.arr[i][0] = this.gp * i;
            }
        }

        //Custom scoring
        if (this.ss == 'custom') {
            for (let i = 1; i < this.s1.length + 1; i++) {
                for (let j = 1; j < this.s2.length + 1; j++) {
                    this.arr[i][j] = Math.max(
                        this.arr[i - 1][j - 1] + (this.s2[i - 1] === this.s1[j - 1] ? parseInt(this.ms) : parseInt(this.gp)),
                        this.arr[i - 1][j] + parseInt(this.gp),
                        this.arr[i][j - 1] + parseInt(this.gp)
                    );
                }
            }
        }
        //Blosum scoring
        else if (this.ss == 'blosum') {
            this.gp = -8;
            for (let i = 1; i < this.s1.length + 1; i++) {
                for (let j = 1; j < this.s2.length + 1; j++) {
                    this.arr[i][j] = Math.max(
                        this.arr[i - 1][j - 1] + scoreMatch_blosum(this.s1[j - 1], this.s2[j - 1]),
                        this.arr[i - 1][j] + parseInt(this.gp),
                        this.arr[i][j - 1] + parseInt(this.gp)
                    );
                }
            }
        }
        //Pam scoring
        else if (this.ss == 'pam') {
            for (let i = 1; i < this.s1.length + 1; i++) {
                for (let j = 1; j < this.s2.length + 1; j++) {
                    this.arr[i][j] = Math.max(
                        this.arr[i - 1][j - 1] + scoreMatch_pam(this.s1[j - 1], this.s2[j - 1], this.gp),
                        this.arr[i - 1][j] + parseInt(this.gp),
                        this.arr[i][j - 1] + parseInt(this.gp)
                    );
                }
            }
        }

        console.log(this.arr);
        return this.arr;
    }

    //Return the alignment score
    getScore() {
        return this.arr[this.arr.length - 1][this.arr[0].length - 1]
    }
};





























    //get score
    //align matrix
    //get alignment

// export default class SequenceAligner {

//     constructor(s1, s2, sp, gp) {
//         this.s1 = s1;
//         this.s2 = s2;
//         this.sp = sp;
//         this.gp = gp;
//         this.arr = [];
//         this.score = 0;
//         this.a = new Array(2);
//     }

//     buildMatrix() {

//         //create an empty array of arrays
//         for (var i = 0; i <= this.s2.length; i++) {
//             this.arr[i] = [];

//             for (var j = 0; j <= this.s1.length; j++) {
//                 this.arr[i][j] = null;
//             }
//         }

//         //set the top corner value to 0

//         //i1 - s2.length
//         for (var i = 0; i <= this.s2.length; i++) {
//             this.arr[i][0] = this.gp * i;
//         } for (var i =0; i <= this.s1.length; i++) {
//             this.arr[0][i] = this.gp * i;
//         }

//         for (var i = 0; i <= this.s2.length; i++) {
//             for (var j = 0; j <= this.s1.length; j++) {
//                 this.arr[i][j] = Math.max(
//                     this.arr[i - 1][j - 1] + (this.s2[i - 1] === this.s1[j - 1] ? this.sp : this.gp),
//                     this.arr[i - 1][j] + this.gp,
//                     this.arr[i][j - 1] + this.gp
//                 );
//             }
//         }

//         this.optimalAlignment();
//         return this.arr;
//     }

//     optimalAlignment() {
//         var i = this.s2.length;
//         var j = this.s1.length;
//         var sq1 = [];
//         var sq2 = [];
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

//         var str1 = sq1.reverse().join();
//         var str2 = sq2.reverse().join();
//         this.a.push(str1);
//         this.a.push(str2);
//     }

//     getOp(){
//         return this.a;

//     }

//     scoreAlignment() {
//         this.score = this.arr[this.arr.length - 1][this.arr[0].length - 1];
//         return this.score;
//     }
// };  