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

  const play = document.getElementById('play');
  const highscores = document.getElementById('highscores');
  const devs = document.getElementById('devs');

  play.addEventListener('click', e => {
    mount.innerHTML = '';
    callback(mount);
  });
  highscores.addEventListener('click', e => renderHighScores(mount));
}

const renderHighScores = mount => {
  const html = `
    <div class="menu-wrapper">
      <h1>High Scores</h1>
    </div>
  `;

  mount.innerHTML = html;
}

function renderHTML(callback) {
  const mountPoint = document.getElementById('root');
  // renderMenu(mountPoint, callback);
  callback(mountPoint);
}

export default renderHTML;
