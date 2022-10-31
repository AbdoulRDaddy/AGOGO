let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // arret de tout activité par une autre action
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // pour avoir les seconds en entier
    // la condition de stopper le countDown
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // permet de lancer directement le compte sans attendre une seconde
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // mettre le zero au secondes
  // document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) { // pour affiche l'heure du retour 
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour; // Pour avoir une heure en format anglais
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// Faire fonctionner le form
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault(); // faire marche l'entré
  const mins = this.minutes.value;// recuperer le contenu dans le form
  console.log(mins);
  if (mins>0) {
    timer(mins * 60);
  }
  this.reset();
});
