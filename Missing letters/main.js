function fearNotLetter(str) {


    str= str.split('')
    
    for (let i = 0; i < str.length-1; i++) {
        if (str[i+1].charCodeAt() - str[i].charCodeAt() !==1) 
        return String.fromCharCode(((str[i+1].charCodeAt() + str[i].charCodeAt())/2))
        
    }

    

}
  fearNotLetter("abcde");