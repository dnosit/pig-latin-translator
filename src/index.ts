// As Lambda entry point 
export const handler = async (event: string ): Promise<string> => {
    // Hello
    // let str: string = "Hello Lambda";
    //console.log(str); 
    console.log(event); 

    // Form pig latin response 
    const response = JSON.stringify( translatePhraseToPig(event), null, 2);
    return response; 
}


// pig latin phrase translator  
function translatePhraseToPig(phrase : string ){
    let pigPhrase : string = ""; 
    let currentWord : string = "";
    // sequentially determine each word and convert to pig latin 
    for (let i : number = 0; i < phrase.length; i++ ){
        if ( !(phrase[i] == " ") || (i == 0) ){
            // not a space, so add it to current word
            currentWord += phrase[i]; 
        }
        else{ // end of word - add translated word + space, then clear word
            pigPhrase += translateWordToPigLatin(currentWord) + " ";
            currentWord = "";
        }
    }
    return pigPhrase; 
}


// pig latin word translator  
function translateWordToPigLatin(word : string) {
    let pigWord : string = "";
    let vowels : string[] = ["a", "e", "i", "o", "u", 
                             "A", "E", "I", "O", "U" ]; 
    let firstConsonantIndex : number = -1; 
    for (let char: number = 0; char < word.length; char++) {
        let isVowel : Boolean = false; 
        if ( firstConsonantIndex >= 0 ){
            // is not the first consonant, so keep it in new word
            pigWord += word[char];
        }
        else{  
            // find first consonant 
            for (let v = 0; v < vowels.length; v++){
                if ( vowels[v] == word[char] ) {
                    isVowel = true;
                    // add this vowel 
                    pigWord += word[char];
                }
            }
            if ( !isVowel ) {
                // Consonant 
                firstConsonantIndex = char; 
                // Only add this char if the word doesn't start with a consonant 
                if (firstConsonantIndex > 0){
                    // add this consonant 
                    pigWord += word[char];
                }
            }
        }
    }
    // add ending and return
    if (firstConsonantIndex == 0){
        // in case of word starting with a consonant 
        pigWord += word[firstConsonantIndex] + "ay"; 
    }
    else{ // in case of word starting with vowel 
        pigWord += "way"; 
    }
    return pigWord; 
}
