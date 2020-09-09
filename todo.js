// Your web app's Firebase configuration

/* CONFIGURAÇÃO DA FIREBASE AQUI!!!!!!!!!!!!!! */

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

let tasks = []

function createDelButton(task) {
    const newButton = document.createElement('button')
    newButton.appendChild(document.createTextNode('Excluir'))
    newButton.setAttribute('class', 'btn btn-danger ml-5')
    newButton.setAttribute('onclick', `deleteTask("${task.id}")`)
    return newButton
}

function createEditButton(task) {
    const newButton = document.createElement('button')
    newButton.appendChild(document.createTextNode('Editar'))
    newButton.setAttribute('class', 'btn btn-warning ml-2')
    //newButton.setAttribute('onclick', `deleteTask("${task.id}")`)
    return newButton
}

function renderTasks() {
    const taskList = document.getElementById("tasklist")
    taskList.innerHTML = ""
    for (task of tasks) {
        const newItem = document.createElement("li")
        newItem.appendChild(document.createTextNode(task.title))
        newItem.setAttribute('class', 'list-group-item')
        newItem.appendChild(createDelButton(task))
        // newItem.appendChild(createEditButton(task))
        taskList.appendChild(newItem)
    }
}

async function readTasks() {
    tasks = []
    const logTasks = await db.collection("tasks").get()
    for (doc of logTasks.docs) {
        tasks.push({
            id: doc.id,
            title: doc.data().title,
        })
    }
    renderTasks()
}

async function addTask() {
    const newTask = document.getElementById("newTask").value
    const date = new Date().toISOString()
    await db.collection("tasks").add({
        title: newTask,
        date: date,
    })
    readTasks()
}

async function deleteTask(id) {
    var resposta = confirm('Deseja realmente excluir? \n Clique em OK para EXCLUIR ou Cancel para CANCELAR');
    if (resposta == true) {
        await db.collection('tasks').doc(id).delete()
        readTasks()
    }

}

readTasks()