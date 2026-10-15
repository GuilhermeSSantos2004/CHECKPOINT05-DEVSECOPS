document.getElementById("year").textContent = new Date().getFullYear();

const status = document.getElementById("pipeline-status");
const messages = [
  "Gitleaks monitorando segredos",
  "Semgrep analisando o código",
  "Trivy verificando a imagem",
  "3 barreiras ativas"
];

let index = 0;
setInterval(() => {
  index = (index + 1) % messages.length;
  status.textContent = messages[index];
}, 2200);
