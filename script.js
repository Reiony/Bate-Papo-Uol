let ChatHistory=[];
let archivedname;
let nameInput;
let PacoteMensagem=[];
askName();

function isConnected(value){
    console.log("Sucesso");
}
function notConnected(error){
    console.log("Usuario Offline");
    console.log(error.response.status);
}
function Sucedido(respondido){
    console.log(respondido.status);
    console.log("Sucesso");
}
function reqFalhou(falha){
    const erro = falha.response.status;
    if (erro===400){
        alert(`Falha no Engano: ${nameInput} ja esta online. Digite outro nome.`)
        askName();
    }
}

function stayConnected(){
    const postMalonline=axios.post("https://mock-api.driven.com.br/api/v6/uol/status",archivedname);
    postMalonline.then(isConnected);
    postMalonline.catch(notConnected);
}
function askName(){
    nameInput=prompt("Digite seu Nome");
    archivedname={name:nameInput};
    /* se o nome digitado estiver incluido no servidor */
    /* retorne um alert dizendo Usuario ja esta sendo utilizado */
    /* se nao, adicione o objeto a lista de nomes */
    const teste = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",archivedname);
    teste.then(Sucedido)
    teste.catch(reqFalhou)
    setInterval(stayConnected,5000) 

}

function searchforMessages(){
    msgpromisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    msgpromisse.then(showMessages)
    msgpromisse.catch(resolveErro)
}
setInterval(searchforMessages,3000);

function resolveErro(valor){
    console.log (valor.response.status);
}
function showMessages(value){
    ChatHistory=value.data;
    const buscador = document.querySelector("main");
    const queroscrollar = document.querySelector(".chat");
    buscador.innerHTML="";
    ChatHistory.forEach(element => {
        if(element.type==="status"){
            buscador.innerHTML+=`<div class="chat enter">
            <div class="chatfromuser">
                <h2><h3>(${element.time}) </h3>&nbsp <b>${element.from}</b> &nbsp${element.text}</h2>
            </div>
        </div>`
        } else if (element.type==="message") {
            buscador.innerHTML+= `<div class="chat say">
            <div class="chatfromuser">
                <h2><h3>(${element.time})</h3>&nbsp <b>${element.from}</b>&nbsppara&nbsp<b>${element.to}</b>:</h2>
            </div>
            <h2>${element.text}</h2>
        </div>`
        } else if (element.type==="private_message" && (element.to===nameInput || element.from===nameInput)){
            buscador.innerHTML+= `<div class="chat private">
            <div class="chatfromuser">
                <h2><h3>(${element.time})</h3>&nbsp <b>${element.from}</b>&nbspreservadamente para&nbsp<b>${element.to}</b>:&nbsp${element.text}</h2>
            </div>
            
        </div>`
        }
    });
    scrollMessages();
}

function scrollMessages(){
    const buscador = document.querySelector("main");
    /* console.log(buscador.lastChild) */
    buscador.lastChild.scrollIntoView();
}
let getMessage;
let putting;
let input;

/* Bonus: Funcionar com o Enter e com o clique juntos */
function makeitEnter(){
    input=document.getElementById("556");
    putting=document.getElementById("323");
    input.addEventListener("click",sendMessage);
    putting.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("556").click();
    }
  });
}
makeitEnter();
/* Fim do Bonus */
function sendMessage(){
    getMessage=document.querySelector('input').value;
    putting=document.getElementById("323");

    PacoteMensagem = { 
        from: nameInput,
        to: "Todos",
        text: getMessage,
        type: "message"
    }
    paperplanesend=axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",PacoteMensagem);
    paperplanesend.then(MandeiMensagem);
    paperplanesend.catch(deuruim);
    document.getElementById('323').value = '';
}

function MandeiMensagem(valor){
    console.log("Mensagem enviada com sucesso!");
}

function deuruim(value){
    console.log("Deu ruim! Usuário não está mais na sala");
    console.log(value.data);
    window.location.reload();

}