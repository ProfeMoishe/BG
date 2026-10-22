(function () {
  var studentName = 'Nombre del Estudiante';
  var customMessages = {
    'Maze_moveForward': 'Avanzar',
    'Maze_turnLeft': 'Girar a la izquierda',
    'Maze_turnRight': 'Girar a la derecha',
    'Maze_pathAhead': 'Hay camino adelante',
    'Maze_pathLeft': 'Hay camino a la izquierda',
    'Maze_pathRight': 'Hay camino a la derecha',
    'Maze_repeat': 'Repetir',
    'Maze_capacity1': 'Puedes usar %1 bloques.',
    'Maze_capacity2': 'Has usado %1 de %2 bloques.',
    'Maze_helpStack': 'Une dos bloques para crear una secuencia.',
    'Bird_fly': 'Volar',
    'Bird_advance': 'Avanzar',
    'Bird_path': 'Camino',
    'Bird_help': 'Ayuda del IPET'
  };

  function applyBrandMarkup() {
    if (document.getElementById('ipetBrand')) return;

    var brand = document.createElement('div');
    brand.id = 'ipetBrand';
    brand.className = 'ipet-brand';

    var logo = document.createElement('img');
    logo.alt = 'Escudo IPET N° 249';
    logo.src = 'index/ipet249.jpg';
    logo.onerror = function () {
      this.onerror = null;
      this.src = 'index/ipet249.svg';
    };

    var copy = document.createElement('div');
    copy.className = 'ipet-brand-copy';
    copy.innerHTML = '<strong>IPET N° 249</strong><span>Nicolás Copérnico</span>';

    brand.appendChild(logo);
    brand.appendChild(copy);
    document.body.insertBefore(brand, document.body.firstChild);

    if (!document.getElementById('ipetFooter')) {
      var footer = document.createElement('footer');
      footer.id = 'ipetFooter';
      footer.textContent = 'Adaptación institucional realizada por ' + studentName + ' para el IPET N° 249 Nicolás Copérnico';
      document.body.appendChild(footer);
    }
  }

  function applyMessages() {
    var Msg = (window.Blockly && window.Blockly.Msg) || {};
    Object.keys(customMessages).forEach(function (key) {
      Msg[key] = customMessages[key];
    });
    if (window.Blockly) {
      window.Blockly.Msg = Msg;
    }
  }

  function setupMazeStats() {
    if (!document.getElementById('runButton') || document.getElementById('ipetStats')) {
      return;
    }

    var stats = document.createElement('div');
    stats.id = 'ipetStats';
    stats.innerHTML = '<span>Intentos: <strong id="ipetAttempts">0</strong></span> | <span>Tiempo: <strong id="ipetTime">00:00</strong></span>';

    var target = document.getElementById('visualization') || document.getElementById('blockly') || document.body;
    target.appendChild(stats);

    var attempts = 0;
    var startedAt = null;
    var timerId = null;

    function formatTime(ms) {
      ms = Math.max(0, ms);
      var totalSeconds = Math.floor(ms / 1000);
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;
      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    function updateTimer() {
      var timeNode = document.getElementById('ipetTime');
      if (timeNode && startedAt) {
        timeNode.textContent = formatTime(Date.now() - startedAt);
      }
    }

    function startTimer() {
      if (!startedAt) {
        startedAt = Date.now();
      }
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = window.setInterval(updateTimer, 1000);
      updateTimer();
    }

    function stopTimer() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      updateTimer();
    }

    var runButton = document.getElementById('runButton');
    var resetButton = document.getElementById('resetButton');

    if (runButton) {
      runButton.addEventListener('click', function () {
        attempts += 1;
        var attemptsNode = document.getElementById('ipetAttempts');
        if (attemptsNode) {
          attemptsNode.textContent = String(attempts);
        }
        startTimer();
      }, true);
    }

    if (resetButton) {
      resetButton.addEventListener('click', function () {
        startedAt = null;
        stopTimer();
        var timeNode = document.getElementById('ipetTime');
        if (timeNode) {
          timeNode.textContent = '00:00';
        }
      }, true);
    }

    var doneDialog = document.getElementById('dialogDone');
    if (doneDialog) {
      var observer = new MutationObserver(function (records) {
        records.forEach(function (record) {
          if (record.type === 'childList' && doneDialog.textContent && doneDialog.textContent.indexOf('¡') !== -1 && !doneDialog.dataset.ipetExtended) {
            doneDialog.dataset.ipetExtended = 'true';
            doneDialog.textContent += ' · IPET 249: ' + attempts + ' intento(s) en ' + document.getElementById('ipetTime').textContent;
            stopTimer();
          }
        });
      });
      observer.observe(doneDialog, { childList: true, subtree: true, characterData: true });
    }
  }

  function init() {
    applyBrandMarkup();
    applyMessages();
    setupMazeStats();
  }

  window.IPETCustomInit = init;

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 120);
  } else {
    window.addEventListener('load', function () {
      setTimeout(init, 150);
    });
  }
})();
