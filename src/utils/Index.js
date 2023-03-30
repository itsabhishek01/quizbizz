//function to shuffle array of answers
export const shuffleOptionsArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    //assigning a random value to the randomIndex
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    //Swapping the index of the current index and random index
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

//Function to Return the Array of the Options
export const returnOptions = (correctAnswer, incorrectAnswers) => {
  let finalOptions = [correctAnswer];
  for (let values of incorrectAnswers) {
    finalOptions.push(values);
  }
  return finalOptions;
};

//Function to return Stars
export const returnStarsForDifficulty = (difficulty) => {
  if (difficulty === "easy") {
    return "★☆☆☆☆";
  }
  if (difficulty === "medium") {
    return "★★★☆☆";
  }
  return "★★★★★";
};

export const returnShuffledOptions = (correctAnswer, incorrectAnswers) => {
  return shuffleOptionsArray(returnOptions(correctAnswer, incorrectAnswers));
};

//Show Result
export const setLocalStorageItem = (localStorageKey, data) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

//Function to restart the quiz
export const removeLocalStorageItem = (localStorageKey) => {
  localStorage.removeItem(localStorageKey);
};
