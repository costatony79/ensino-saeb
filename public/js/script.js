
// Função para o temporizador
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;

  var countdownInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      display.textContent = "Tempo Esgotado";
      alert("Tempo esgotado!");
      
    }
  }, 1000);
}

// Função para iniciar o temporizador
function iniciarTemporizador() {
  var oneMinute = 60; // 1 minuto em segundos
  var display = document.getElementById('timer'); // Elemento HTML onde o tempo será exibido

  display.textContent = "01:00"; // Reinicia o temporizador

  startTimer(oneMinute, display);
}


function validarFormulario() {
  var campoTexto = document.getElementById('name').value.trim();
  var gruposRadio = document.getElementsByClassName('btn-group');

  if (campoTexto === '') {
    alert('Por favor, preencha o seu nome.');
    return false;
  }

  for (var i = 0; i < gruposRadio.length; i++) {
    var radioButtons = gruposRadio[i].querySelectorAll('input[type="radio"]');
    var radioSelecionado = false;

    for (var j = 0; j < radioButtons.length; j++) {
      if (radioButtons[j].checked) {
        radioSelecionado = true;
        break;
      }
    }

    if (!radioSelecionado) {
      alert('Responda todas as questões.');
      return false;
    }
  }

  // Validação passou, enviar para o banco de dados
  // Aqui você pode adicionar o código para enviar as informações para o banco de dados MySQL
  // Exemplo fictício:
  alert('Respostas enviadas para o professor.');

  return true;
}

