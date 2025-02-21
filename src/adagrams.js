const letterPool = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
}; 

const scoreChart ={
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,

};

export const drawLetters = () => {
  // initial drawLetters, cloneLetterPool, letters
  const drawLetters = [];
  let cloneLetterPool = {...letterPool};
  let letters = Object.keys(cloneLetterPool);

  // for loop 10 times
  for (let i=0;i<10;++i){
    // get random letter in the pool
    let randomLetter = letters[Math.floor(Math.random()*letters.length)];
    // check the value of letter in the pool
    if (cloneLetterPool[randomLetter]>0){
      cloneLetterPool[randomLetter]--;
      drawLetters.push(randomLetter);
      };
  };
  return drawLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // set new object
  let lettersInHandFreq = {};
  // count letter frequency
  for (let letter of lettersInHand) {
    if (letter in lettersInHandFreq) {
      lettersInHandFreq[letter] += 1;
    }else{
      lettersInHandFreq[letter] = 1;
    }
  };

  // check input letter
  for (let cha of input) {
    if (cha in lettersInHandFreq) {
      if (lettersInHandFreq[cha] >= 1) {
        lettersInHandFreq[cha] -= 1;
      } else{
        return false;
      }
    } else {
      return false;
    };
  }
  return true;
}
export const scoreWord = (word) => {
  // initial wordLength and score
  let wordLength = word.length;
  let score = 0;
  // get the score for wordLength < 7
  if (wordLength < 7) {
    for(let cha of word.toUpperCase()) {
      let chaScore = scoreChart[cha];
      score += chaScore;
    }
    return score;
  } else{
    // get the score for wordLength >= 7
    score = 8;
    for(let cha of word.toUpperCase()) {
      let chaScore = scoreChart[cha];
      score += chaScore;
    }
    return score;
  }
  
};

export const highestScoreFrom = (words) => {
  // Initial hightestScore and winningWord
  let highestScore = 0;
  let winningWord = "";
  //iterate each word and get the score
  words.forEach((word) => {
    let score = scoreWord(word);
  // if the  score more than highestScore sign on the new data
    if (score > highestScore){
      highestScore = score;
      winningWord = word;
    } else if (score === highestScore) {
      //if the scores are same, choose the word, which is length is 10
      if (word.length === 10 && winningWord.length != 10) {
        winningWord = word;
        // //if the scores are same, choose the length is smaller.
      } else if (word.length < winningWord.length && winningWord.length != 10){
        winningWord = word;
      } 
    }
  });
  const winner = {word: winningWord, score:highestScore};
  return winner;
};
