const emojis = ["🎂", "🎁", "🎈", "🎉", "🥳"];
let interval;

function createEmoji() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  if (day === 20 && month === 4) {
    // cria um novo elemento span para o emoji
    const span = document.createElement("span");

    // define a posição inicial do emoji em um local aleatório da parte superior da tela
    const x = Math.random() * window.innerWidth;
    const y = 0;

    // define um emoji aleatório para mostrar
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    // adiciona o emoji ao elemento span
    span.innerHTML = emoji;

    // define o estilo do span
    span.style.position = "absolute";
    span.style.left = x + "px";
    span.style.top = y + "px";
    span.style.fontSize = "30px";
    span.style.zIndex = "9999";
    span.style.transformOrigin = "bottom center";

    // adiciona o span à div da chuva
    const rainDiv = document.querySelector("#rain");
    rainDiv.appendChild(span);

    // define a velocidade e direção do emoji
    let angle = 360;

    // anima o emoji para cair verticalmente até o final da tela
    const animation = span.animate(
      [
        { transform: `translate(0px, 0px) rotate(${angle}deg)` },
        { transform: `translate(0px, ${window.innerHeight}px) rotate(${angle}deg)` },
      ],
      {
        duration: 1000,
        easing: "linear",
        fill: "both",
      }
    );

    // remove o elemento span após a animação terminar
    animation.onfinish = () => {
      span.remove();
    };
  }
}

function startRain() {
  interval = setInterval(() => {
    createEmoji();
  }, 1);
  return interval;
}

document.addEventListener("DOMContentLoaded", () => {
  const rainDiv = document.createElement("div");
  rainDiv.id = "rain";
  rainDiv.style.position = "fixed";
  rainDiv.style.width = "100%";
  rainDiv.style.height = "100%";
  rainDiv.style.top = "0";
  rainDiv.style.left = "0";
  rainDiv.style.pointerEvents = "none";
  document.body.appendChild(rainDiv);
  startRain();

  setTimeout(() => {
    clearInterval(interval);
  }, 3050); // para a chuva após 10 segundos
});
