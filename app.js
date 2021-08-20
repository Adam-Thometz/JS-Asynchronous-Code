////////////////////////////////
///// Part 1: Number Facts /////
////////////////////////////////

const url1 = 'http://numbersapi.com'

const submitBtn = document.getElementById('submitBtn')
const numsList = document.getElementById('numsList')
const errorList = document.getElementById('errorList')

submitBtn.addEventListener('click', getNumberInfo)

function getNumberInfo() {
  numsList.innerHTML = ''
  let nums = document.getElementById('numbers').value.split(',')
  nums.forEach(n => parseInt(n))
  const numRes = []
  for (let i = 0; i < nums.length; i++) {
    numRes.push(
      axios.get(`${url1}/${parseInt(nums[i])}`)
    )
  }

  Promise.all(numRes)
    .then(numRes => {
      for (let res of numRes) {
        const numFact = document.createElement('li')
        numFact.innerText = res.data
        numsList.append(numFact)
      }
    })
    .catch((err) => console.log(err));
}

/////////////////////////////////
///// Part 2: Deck of Cards /////
/////////////////////////////////

const url2 = 'http://deckofcardsapi.com/api';
const apiNewDeck = 'deck/new/shuffle';
const apiDrawCard = (deckId) => `deck/${deckId}/draw`;

const deckStatus = document.getElementById('deckStatus');
const shuffleDeck = document.getElementById('shuffleDeck');
const drawCard = document.getElementById('drawCard');
const cardHolder = document.getElementById('cardHolder')

shuffleDeck.addEventListener('click', shuffle);
drawCard.addEventListener('click', draw);

let deckId = null

function shuffle() {
  res = axios.get(`${url2}/${apiNewDeck}`)
    .then(res => {
      deckId = res.data.deck_id;
      cardHolder.innerHTML = ''
      deckStatus.innerText = "You have a fresh deck! Start drawing";
    })
    .catch(err => console.log(err));
}

function draw() {
  res = axios.get(`${url2}/${apiDrawCard(deckId)}`)
    .then(res => {
      card = res.data.cards[0];
      remaining = res.data.remaining
      const cardImg = document.createElement('img');
      cardImg.src = card.image;
      cardImg.alt = `An image of the ${card.value} of ${card.suit} card`;

      cardHolder.prepend(cardImg)

      deckStatus.innerText = `You drew a ${card.value} of ${card.suit}! There are ${remaining} cards left in this deck.`;
      if (remaining === 0) {
        drawCard.style.display = 'none'
      }
    })
    .catch(() => {
      deckStatus.innerText = 'Whoops, something went wrong! Try again or reshuffle the deck!'
    })
  }