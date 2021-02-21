/*
    Lab 3 - Climbing the Leaderboard

    It's job interview time and you're being interviewed in JavaScript. You've been asked to solve
    the following algorithmic problem. Fortunately for you, in your third week of Web Apps
    Development, your instructor gave you a detailed overview of the JavaScript language. Armed
    with a sharp wit and your instructor's high hopes, you're more than ready to tackle this
    challenge.
    
    This is a problem from HackerRank with a medium difficulty and only a 58% success rate. This is
    exactly like the type of problem you would see in a coding interview --- it's actually about as
    difficult as most problems that a Freshmen, a Sophomore, or a Junior would be given in their
    coding internship interview.

    Description:

        Alice is playing an arcade game and wants to climb to the top of the leaderboard and wants
    to track her ranking. The game uses Dense Ranking, so its leaderboard works like this:

            (*) The player with the highest score is ranked number 1 on the leaderboard.
            (*) Players who have equal scores receive the same ranking number, and the next
            player(s) receive the immediately following ranking number.

        For example, the four players on the leaderboard have high scores of 100, 90, 90, and 80.
    Those players will have ranks 1, 2, 2, and 3, respectively. If Alice's scores are 70, 80 and
    105, her rankings after each game are 4, 3 and 1.

    We're now going to learn JavaScript by walking through the solution to this problem together.
    Please follow the instructions provided in comments. Part 1 will invole solving the challenge
    stated above while Part 2 will involve applying the more advanced JavaScript concepts that
    we learned in class. Part 3 consists of a few questions. Please log your answers.

    To run this script, download and install NodeJS, then execute the script with:
        $> node leaderboard.js

    Please submit this script to Harvey upon completion.

    P.S. If comments are indented please include them in the body of the if, for, or function
    to which they belong.

*/

// Part 1 - Climbing the Leaderboard

// Initialize a variable n to 7, the number of scores on the leaderboard.
// Don't forget to use semicolons.

var n =7;

// Initialize a variable scores which is an Array with elements: 100, 100, 50, 40, 40, 20, 10 .
// Notice that the scores are in decreasing order.

var scores = [100, 100, 50, 40, 40, 20, 10];

// Initialize a variable m to 4, the number of games that Alice has played.

var m = 4;

// Initialize a variable games which is an Array with elements: 5, 25, 50, 120 .
// Notice that the scores are in increasing order.

var games = [5, 25, 50, 120];

// Since we are using Dense Ranking, duplicates don't matter and should be filtered out.
// We will now implement a filter using iteration.

// Initialize a variable uniq which is an empty Object (a.k.a map or dictionary).

var uniq = {};

// Initialize a variable ranks which is an empty Array.

var ranks = [];

// Using a for loop, but not a for-in loop, iterate over the values of scores.
for(i = 0; i<scores.length; i++){
    // For each value score[i] in scores, use an if statement to check if uniq contains score[i].
    // If score[i] is not in uniq,
    if(!(scores[i] == uniq)){
        // put score[i] in uniq with value true and append score[i] to ranks.
        uniq.push(scores[i]);
        ranks.push(scores[i]);
    }
    // Otherwise, ignore score[i] --- it's a duplicate.
}

// Log ranks so that we can see the filtered scores.

console.log(ranks);

// The output should be [100, 50, 40, 20, 10] .


// Define a function binarySearch which takes four parameters: rankings, aliceScore, i, j .
// This function will perform a binary search on rankings to determine where to insert aliceScore.
function binarySearch(rankings, aliceScore, i, j){ 
    // I won't have you validate the inputs, but when writing JavaScript: VALIDATE EVERYTHING!

    // We need a base case for binarySearch.
    // Use an if statement to check if i = j. Use proper equality.
    // If i = j, then compare rankings[i] to aliceScore.
    if(i == j){ 
        // If aliceScore >= rankings[i],
        if(aliceScore >= rankings[i]){ 
            // then return i --- aliceScore is the new i rank.
            aliceScore == i;
            return aliceScore;
        }
        // Else if aliceScore < rankings[i]
        else if(aliceScore < rankings[i]){ 
            // then return i+1 --- aliceScore is the new i+1 rank.
            aliceScore = i+1;
            return aliceScore;
        }
        // If you want style points, implement the return statement with a ternary operator.
        return binarySearch(rankings ,aliceScore, i+1, j);
    }
    // Initialize a variable pivot with value (number of rankings) / 2 . Don't forget to use var.
    // Remember that JavaScript doesn't have integer division.
    // How can we make (number of rankings) / 2 an integer?
    // HINT: There is a Math library with a ceil function or you could use modulus.
    // With modulus, N % 2 = 1 means that N is odd. 0 means even. Don't forget operator precedence.
    var pivot = Math.ceil((rankings.length)/2);

    // Use an if statement to check if rankings[pivot] = aliceScore.
    // If aliceScore = rankings[pivot]
    if(aliceScore = rankings[pivot]){ 
        // use a return statement to return pivot.
        return pivot;
    }
    // Else if aliceScore > rankings[pivot]
    else if(aliceScore > rankings[pivot]){ 
        // recursively call binarySearch.
        // rankings is descending so use arguments: rankings, aliceScore, i, pivot-1 .
        binarySearch(rankings, aliceScore, i, pivot-1);
    }
    // Else if aliceScore < rankings[pivot]
    else if(aliceScore < rankings[pivot]){ 
        // recursively call binarySearch.
        // rankings is descending so use arguments: rankings, aliceScore, pivot+1, j .
        binarySearch(rankings, aliceScore, pivot+1, j);
    }
    // That's the end of binarySearch.
}

// Using a for-in loop with variable gamej, iterate over the values of games.
for(var gamej in games){ 
    // For each value gamej, call binarySearch with arguments: ranks, gamej, 0, m-1 .
    // binarySearch will return an index, initialize a variable r equal to this index.
    var r = binarySearch(ranks, gamej, 0, m-1);

    // r is the rank assigned to gamej.
    // If r is not in uniq
    if(!(Object.values(uniq).indexOf(r) > -1)){ 
        // insert gamej in ranks at index r and put gamej in uniq with value true.
        ranks.push(r);
        uniq.push(gamej);
    }
    // Log the value of r (don't forget to add 1 to r since leaderboards are 1-indexed).
    console.log(r);
    // The output should be 6, 4, 2, 1 .
}

// Log ranks so that we can see the new leaderboard.
// The output should be [120, 100, 50, 40, 25, 20, 10, 5] .
console.log(ranks);


// Congratulations! You've just solved Climbing the Leaderboard.

// Part 2 - Callbacks and Async

// We will now look at another solution to Climbing the Leaderboard, one that uses callbacks.

// Set the value of n to 6 .

var n = 6;

// Set the value of scores to an Array with elements: 100, 90, 90, 80, 75, 60 .

var scores = [100, 90, 90, 80, 75, 60];

// Set the value of m to 5 .

var m = 5;

// Set the value of games to an Array with elements: 50, 65, 77, 90, 102 .

var games = [50, 65, 77, 90, 102];

// Set uniq to an empty Object and set ranks to an empty Array.

var uniq = {};

var ranks = [];

// Every Array provides a forEach method which can be called using: array.forEach([func]);.
// The forEach method calls the argument func once for each element in the array.
// Use the forEach method to iterate over scores.
// The argument that you pass should be an anonymous function which takes one parameter: scorei .
function anonymous(scorei){ 
    // Inside the body of the anonymous function, call setTimeout(cb, 0);.
    // cb should be another anonymous function with no parameters.
    // cb is a closure so it will retain the reference to scorei .
    setTimeout(cb, 0);
        // Inside cb, copy the code we used earlier to filter out duplicates.
    
    
    // The forEach will still be synchronous, but the cb calls will be asynchronous.

}
// Log ranks so that we can see the filtered scores.

// The output should be []? Why? You don't need to log this answer.


// call setTimeout(cb, 0); cb should be an anonymous function with no parameters

    // Log ranks so that we can see the filtered scores.

    // The output should be [100, 90, 80, 75, 60] . Why? You don't need to log this answer.


    // Use a forEach loop to iterate over games.
    // The argument that you pass should be an anonymous function with one parameter: gamej .

        // In the body of this function, call setTimeout(cb, 0) where cb is an anonymous function.
        // cb takes no parameters and it is a closure so it will retain the reference to gamej .

            // In the body of cb, call binarySearch with the arguments: ranks, gamej, 0, m-1
            // binarySearch will return an index; initialize a variable r to this index.


            // r is the rank assigned to gamej.
            
            // If r is not in uniq

                // insert gamej in ranks at index r and put gamej in uniq with value true.
            
            
            // Log the value of r (don't forget to add 1 to r since leaderboards are 1-indexed).

            // The output should be 6, 5, 4, 2, 1 .
        

        // Log ranks so that we can see the new leaderboard.

        // The output should be [100, 90, 80, 75, 60] . Why? You don't need to log the answer.


        // call setTimeout(cb, 0); cb should be an anonymous function with no parameters.

            // In the body of cb, log ranks so that we can see the new leaderboard.

            // The output should be [102, 100, 90, 80, 77, 75, 65, 60, 50] . Why? Don't log.




// Part 3 - Questions.
// Please log your answers. It's okay to keep your answers short.
// You can use + to create multiline strings.
// For example:
//     var answer = "my answer" +
//     " goes here";

// Question: Where do the cb calls go (the func in setTimeout(cb, 0))? When are they executed?

// Question: Can the use of forEach with setTimeout(cb, 0) cause stalling to occur?

// Question: Is the use of forEach with setTimeout(cb, 0) memory consumptious?

// Question: Why use forEach rather than a for-loop?

// Question: Is this non-deterministic? Are there any race conditions? Why or why not?

// Question: Can we make binarySearch async? Would our solution change if we did?

// Question: Is there a better way to perform asynchronous programming?

// The End. Great job!
