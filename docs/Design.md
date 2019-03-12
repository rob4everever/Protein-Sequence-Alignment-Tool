## Sequence Alignment Design Document

A web app that allows the user to align protein sequences. The primary goal of this app is to be pedagogical.

### Features

* Globally align two protein sequences and display the optimal solution using the Needleman-Wunch algorithm.
* Find all optimal alignments.
* An intuitive and attractive user interface.
* Options to edit the scoring system of the algorithm, including an affine gap penalty.
* In addition to creating a custom scoring system, options for some popular one will also be provided (xxxxx and xxxxx).
* Perform local alignment and semi-local alignment.
* Display the route that was taken on the matrix.

### Form
* Input is two strings

### Alignment display
* Matrix display should update relative to the length of each string in real time.

### Results display
* Display the traceback route of the optimal sequence
* Display the score of the optimal alignment as well as the alignment itself.
* Display traceback route and optimal alignment and score several times if there are multiple optimal alignments.
* Different colour traceback routes if there are multiple.

### Algorithms
* Local - Smith-Waterman
* Semi-local- 
* Local - Needleman-Wunsch 








