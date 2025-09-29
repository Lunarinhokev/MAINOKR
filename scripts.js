const container = document.getElementById("container");
const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const createBtn = document.getElementById("createBtn");

let count = 1;

addBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

createBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".type-checkbox");
  checkboxes.forEach(cb => {
    if(cb.checked){
      createCard(cb.value);
      cb.checked = false;
    }
  });
  modal.classList.remove("show");
});

modal.addEventListener("click", (e)=>{
  if(e.target === modal){
    modal.classList.remove("show");
  }
});

function createCard(type){
  const card = document.createElement("div");
  card.className = "card";
  card.style.top = `${50 + count*20}px`;
  card.style.left = `${50 + count*20}px`;

  let content = "";
  if(type === "texto") content = `<p>Este é um texto simples dentro da janela.</p>`;
  else if(type === "aviso") content = `<p><strong>Aviso:</strong> verifique os relatórios pendentes.</p>`;
  else if(type === "grafico") content = `<div class="chart-placeholder"></div><p>Gráfico exemplo</p>`;

  card.innerHTML = `
  <div class="title-bar">
    <h3>Janela ${count} (${type})</h3>
    <button class="close-btn">&times;</button>
  </div>
  <div class="card-content">${content}</div>
`;


  // fechar
  card.querySelector(".close-btn").addEventListener("click", ()=>{
    container.removeChild(card);
  });

  makeDraggable(card, card.querySelector(".title-bar"));
  container.appendChild(card);
  count++;
}

function makeDraggable(element, handle){
  let offsetX=0, offsetY=0;
  let isDragging=false;

  handle.addEventListener("mousedown", e=>{
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", e=>{
    if(!isDragging) return;
    element.style.left = (e.clientX - offsetX) + "px";
    element.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", ()=>{
    isDragging=false;
    element.style.zIndex="";
  });
}
