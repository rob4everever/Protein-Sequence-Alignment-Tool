export default class SequenceAligner {

    constructor(s1, s2, sp, gp){
        this.s1 = s1;
        this.s2 = s2;
        this.sp = sp;
        this.gp = gp;
        this.arr = [];
        this.arr[0] = [];
        this.score = 0;
        this.traceback = [];
    }

    buildMatrix() {

        //create an empty array of arrays
        for(var i=0;i<=this.s2.length;i++) {
            this.arr[i] = [];

            for(var j=0;j<=this.s1.length;j++) {
                this.arr[i][j] = null;
            }
        }   

        //set the top corner value to 0
        this.arr[0][0] = 0;

        //put in the gap penalties
        for(var i=1;i<=this.s2.length;i++) {
            this.arr[0][i] = this.arr[i][0] = -1 * i;
        }

        for(var i=1;i<=this.s2.length;i++) {
            for(var j=1;j<=this.s1.length;j++) {
                this.arr[i][j] = Math.max(
                    this.arr[i-1][j-1] + (this.s2[i-1] === this.s1[j-1] ? this.sp : this.gp),
                    this.arr[i-1][j] + this.gp,
                    this.arr[i][j-1] + this.gp
                );
            }
        }


        return this.arr;
    }

    scoreAlignment() {
        return this.score;
    }
};

/* 
var s1 = "GCATGCU";
var s2 = "GATTACA";

var sp = 1;
var gp = -1;
var gc = "-";

//generate grid array
var arr = [];

//create an empty array of arrays
for(var i=0;i<=s2.length;i++) {
    arr[i] = [];

    for(var j=0;j<=s1.length;j++) {
        arr[i][j] = null;
    }
}

//set the top corner value to 0
arr[0][0] = 0;

//put in the gap penalties
for(var i=1;i<=s2.length;i++) {
    arr[0][i] = arr[i][0] = -1 * i;
}

for(var i=1;i<=s2.length;i++) {
    for(var j=1;j<=s1.length;j++) {
        arr[i][j] = Math.max(
            arr[i-1][j-1] + (s2[i-1] === s1[j-1] ? sp : gp),
            arr[i-1][j] + gp,
            arr[i][j-1] + gp
        );
    }
}

var as1 = "";
var as2 = "";


var i = s2.length;
var j = s1.length;
var sq1 = [];
var sq2 = [];

do {

    var t = arr[i-1][j];
    var d = arr[i-1][j-1];
    var l = arr[i][j-1];
    var max = Math.max(t, d, l);

    switch(max) {
        case t:
            i--;
            sq1.push(gc);
            sq2.push(s2[i]);
            break;
        case d:
            j--;
            i--;
            sq1.push(s1[j]);
            sq2.push(s2[i]);
            break;
        case l:
            j--;
            sq1.push(s1[j]);
            sq2.push(gc);
            break;
    }

} while(i>0 && j>0);

console.log(sq1.reverse());
console.log(sq2.reverse()); */