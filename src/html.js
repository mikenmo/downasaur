const renderMenu = (mount, callback) => {
  const html = `
    <div class="menu-wrapper">
      <h1>Downasaur</h1>

      <button class="button" id="play">Play Game</button>
      <button class="button" id="highscores">High Scores</button>
      <button class="button" id="devs">Developers</button>
    </div>
  `;

  mount.innerHTML = html;

  const play = document.getElementById("play");
  const highscores = document.getElementById("highscores");
  const devs = document.getElementById("devs");

  play.addEventListener("click", e => {
    mount.innerHTML = "";
    callback(mount);
  });
  highscores.addEventListener("click", e => renderHighScores(mount));
};

const renderHighScores = mount => {
  const html = `
    <div class="menu-wrapper">
      <h1>High Scores</h1>
    </div>
  `;

  mount.innerHTML = html;
};

export const renderScore = score => {
  const highScore = localStorage.getItem('highscore');
  const html = `
    <div class="score-holder">
      ${score}
    </div>
    ${highScore ? `<div class="high-score">High Score: ${highScore}</div>`: ''}
  `;

  document.getElementById('score').innerHTML = html;
}

export const gameOverScreen = (score) => {
  const mountPoint = document.getElementById('root');
  const html = `
    <div class="overlay">
      <h1>GAMEOVER!</h1>
      <button class="button" id="again">Again</button>
      <div class="showscore">Score: ${score}</div>
    </div>
  `;

  // Save score to localStorage
  const highScore = localStorage.getItem('highscore');
  if (!highscore || highscore < score) localStorage.setItem('highscore', score);

  mountPoint.insertAdjacentHTML('afterbegin', html);
  const button = document.getElementById('again');
  button.addEventListener('click', ()=>{window.location.reload()});
}

function renderHTML(callback) {
  const mountPoint = document.getElementById("root");
  // renderMenu(mountPoint, callback);
  mountPoint.innerHTML = '';
  callback(mountPoint);
}

export default renderHTML;
