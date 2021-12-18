'use strict';
let banco = [
    {'tarefa': 'estudar JS', 'status': ''},
    {'tarefa': 'netflix', 'status': 'checked'}
]; // essa let cria um banco de dados em array



const getBanco = () =>JSON.parse(localStorage.getItem('todoList')) ??[];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const criarItem = (tarefa,status, indice) =>{
    const item = document.createElement("label"); // comando usado para criar uma tag <label>
    item.classList.add("todo__item"); // código usado para adicionar uma classe na label
    item.innerHTML = ` 
        <input type="checkbox" ${status} data-indice= ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice= ${indice}>
    `;// usado para colocar mais tags dentro da const item.
    document.getElementById("todoList").appendChild(item);
}
const limparTarefas = () =>{ // função para limpar a tela anterior
    const todoList= document.getElementById("todoList");
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela= () =>{ // cria uma função para poder atualizar o banco de dados criato acima
    limparTarefas();
    const banco=getBanco()
    banco.forEach ((item, indice)=> criarItem (item.tarefa, item.status, indice)); //o forEach percorre todo o array item a item e passa alguns elementos para o callback
}

const inserirItem = (evento) =>{ // função criada para ouvir a tecla enter e inserir a tarefa na to-do list
    const tecla = evento.key;
    const texto = evento.target.value
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = "" // limpa a tarefa na box depois de adicionar ela
    }
}

const removerItem = (indice) =>{
    const banco = getBanco()
    banco.splice (indice,1);
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) =>{
    const banco = getBanco()
    banco[indice].status = banco[indice].status == "" ? 'checked' : '';
    setBanco(banco)
    atualizarTela()
}

function clickItem(evento) {
    const elemento = evento.target;
    if (elemento.type == 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type == "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }

}

document.getElementById("newItem").addEventListener('keypress', inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);

atualizarTela() // chama a função

