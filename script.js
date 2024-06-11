const inputItem = document.getElementById('inputAdd')
const containerList = document.getElementById('containerList')

//Array vazio para as tarefas
let tarefas = []

//Chamando a função 
function pegar() {
  if(inputItem.value == ''){
    alert("Escreva alguma coisa!!!")
    return
  }
  //Colocando um objeto dentro de um array
  tarefas.push({
    tarefa: inputItem.value,
    concluir: false
  })

  //Limpando o inpit
  inputItem.value = ''

  //Chamando a função adicionar
  adicionar()
}

function adicionar() {

  //Variavel para as mensagens
  let novaDiv = '';

  /*O forEach passa dois parametros,
  tarefa = nome dado aos elementos do
  array, index = qual o indice de cada
  elemento
  */
  tarefas.forEach((tarefa, index) => {
    //Transformando a variavel das tarefas em tarefas adicionadas no inputAdd
    novaDiv = novaDiv + `
    
    <div class="containerItens ">
          <div class="textTarefa">
            <button onclick="feito(${index})"><img src="images/feito.png" class="imgFeito"></button>
            <p class="text ${tarefa.concluir && "concluida"}">${tarefa.tarefa}</p>
          </div>
            
          <div class="containerImg">
            <button onclick="editar(${index})"><img src="images/lapis.png" class="imgList"></button>
            <button onclick="apagar(${index})"><img src="images/lixeira.png" class="imgList"></button>
          </div>
      </div>`
  });

  //Adicionando a variavel no arquivo HTML
  containerList.innerHTML = novaDiv

  localStorage.setItem('list', JSON.stringify(tarefas))
}

function feito(index) {
  tarefas[index].concluir = !tarefas[index].concluir;
  adicionar()
}

//Função para remove uma tarefa
function apagar(index) {

  //Removendo a tarefa pelo indice dela
  //slipe remove um elemento do array de acordo com o indice, e quantos apagar apartir dele
  tarefas.splice(index, 1)
  adicionar()
}

function editar(index) {
  const valor = prompt("Altere a sua tarefa")
  tarefas[index].tarefa = valor

  adicionar()
}

function recarregarTarefas() {
  const tarefasGuardadas = localStorage.getItem('list')

  if (tarefasGuardadas) {
    tarefas = JSON.parse(tarefasGuardadas)
  }
  adicionar()
}


recarregarTarefas()

