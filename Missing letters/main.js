// Intermediate Algorithm Scripting: Missing letters by freeCodeCamp
// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/missing-letters

// Find the missing letter in the passed letter range and return it. If all letters are present in the range, return undefined.

// sfearNotLetter("abce") should return "d".
//fearNotLetter("abcdefghjklmno") should return "i".
//fearNotLetter("stvwx") should return "u".
//fearNotLetter("bcdf") should return "e".
//fearNotLetter("abcdefghijklmnopqrstuvwxyz") should return undefined

// my solution

function fearNotLetter(str) {

    str= str.split('')
    
    for (let i = 0; i < str.length-1; i++) {
        if (str[i+1].charCodeAt() - str[i].charCodeAt() !==1) 
        return String.fromCharCode(((str[i+1].charCodeAt() + str[i].charCodeAt())/2))
        
    }
}
