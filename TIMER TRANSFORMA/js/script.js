const timerDisplay = document.getElementById("timer");
    const messageDisplay = document.getElementById("message");
    const startFirstBtn = document.getElementById("startFirst");
    const startSecondBtn = document.getElementById("startSecond");
    const resetBtn = document.getElementById("reset");

    let interval;

    function speak(text) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "es-ES";
      utter.rate = 1;
      speechSynthesis.speak(utter);
    }

    function startTimer(duration, label, onEnd) {
      clearInterval(interval);
      let time = duration;
      timerDisplay.textContent = formatTime(time);
      messageDisplay.textContent = label;

      interval = setInterval(() => {
        time--;
        timerDisplay.textContent = formatTime(time);
        if (time <= 0) {
          clearInterval(interval);
          onEnd();
        }
      }, 1000);
    }

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startFirstBtn.addEventListener("click", () => {
      speak("Inicia el bloque de dos minutos y treinta segundos.");
      startFirstBtn.disabled = true;
      startSecondBtn.disabled = false;
      startTimer(150, "Contando 2:30 minutos...", () => {
        messageDisplay.textContent = "¡Tiempo del primer bloque finalizado!";
        speak("Primer bloque finalizado.");
      });
    });

    startSecondBtn.addEventListener("click", () => {
      speak("Inicia el conteo de treinta segundos.");
      startSecondBtn.disabled = true;
      startTimer(30, "Contando 30 segundos...", () => {
        messageDisplay.textContent = "¡Tiempo completo!";
        speak("¡Tiempo completo!");
      });
    });

    resetBtn.addEventListener("click", () => {
      clearInterval(interval);
      timerDisplay.textContent = "00:00";
      messageDisplay.textContent = "Presiona un botón para comenzar";
      startFirstBtn.disabled = false;
      startSecondBtn.disabled = true;
      speak("Timer reiniciado.");
    });