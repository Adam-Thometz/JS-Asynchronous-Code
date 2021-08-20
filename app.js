////////////////////////////////
///// Part 1: Number Facts /////
////////////////////////////////

const url1 = 'http://numbersapi.com'

const submitBtn = document.getElementById('submitBtn')
const numsList = document.getElementById('numsList')
const errorList = document.getElementById('errorList')

submitBtn.addEventListener('click', getNumberInfoAsync)

async function getNumberInfoAsync() {
  numsList.innerHTML = ''
  let nums = document.getElementById('numbers').value.split(',')
  if (nums[0] === "") {
    errorList.innerText = 'Input cannot be empty!'
    return
  };
  nums.forEach(n => parseInt(n))
  for (let num of nums) {
    try {
      const res = await axios.get(`${url1}/${num}`)
      const numFact = document.createElement('li')
      numFact.innerText = res.data
      numsList.append(numFact)
    } catch (e) {
      errorList.innerText = 'There was an error. Try again'
      return
    }
  errorList.innerText = ''
  }
}

/////////////////////////////////
///// Part 2: Deck of Cards /////
/////////////////////////////////

const url2 = 'http://deckofcardsapi.com/api';
const apiNewDeck = 'deck/new/shuffle';

const deckStatus = document.getElementById('deckStatus');
const shuffleDeck = document.getElementById('shuffleDeck');
const drawCard = document.getElementById('drawCard');
const cardHolder = document.getElementById('cardHolder')

class Deck {
  constructor() {
    this.id,
    this.remaining,
    this.currCard
  }

  async shuffle() {
    try {
      const res = await axios.get(`${url2}/${apiNewDeck}`);
      this.id = res.data.deck_id;
      this.remaining = res.data.remaining;
      cardHolder.innerHTML = '';
      deckStatus.innerText = "You have a fresh deck! Start drawing";
    } catch (e) {
      deckStatus.innerText = 'Whoops, something went wrong! Try again later';
    }
  }

  async draw() {
    try {
      const res = await axios.get(`${url2}/deck/${this.id}/draw/?count=1`);
      this.currCard = res.data.cards[0];
      this.remaining = res.data.remaining;
      const cardImg = document.createElement('img');
      cardImg.src = this.currCard.image;
      cardImg.alt = `An image of the ${this.currCard.value} of ${this.currCard.suit} card`;

      cardHolder.prepend(cardImg)

      deckStatus.innerText = `You drew a ${this.currCard.value} of ${this.currCard.suit}! There are ${this.remaining} cards left in this deck.`;
      if (remaining === 0) {
        drawCard.style.display = 'none'
      }
    } catch (e) {
      deckStatus.innerText = 'Whoops, something went wrong! Try again or reshuffle the deck!';
    }
  }
}

let deck = new Deck()
shuffleDeck.addEventListener('click', function() {
  deck.shuffle()
})
drawCard.addEventListener('click', function() {
  deck.draw()
})