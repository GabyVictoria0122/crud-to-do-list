var app = new Vue({
    el: '#app',
    data: {
        message: 'Olá Vue',
        tasks: [
        ],
    },
    methods: {
        getTasks() {
            fetch("http://localhost:3000/tasks")
                .then((response) => response.json())
                .then((tarefasJson) => (this.tasks = tarefasJson));
        },
        postTasks() {
            console.log("post")
        },
        editTask() {
            console.log("edit")

        },
        deleteTask(tarefa) {
            fetch(`http://localhost:3000/tasks/${tarefa.id}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then((response) => response.json())
                .then((tarefasJson) => (this.tasks = tarefasJson));
            // this..delete(tarefa)
            console.log("delete")
        }
    },
    created() {
        this.getTasks()
    }
})