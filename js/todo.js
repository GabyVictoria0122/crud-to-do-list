var app = new Vue({
    el: '#app',
    data: {
        message: 'Olá Vue',
        tasks: [
        ],
        load: false,
        textFilter: '',
        task: {
            "id": null,
            "title": null,
            "dueTo": null,
            "project": null,
            "usuario": null,
        },
        taskFrom: {
            "id": null,
            "title": 'gggg',
            "dueTo": null,
            "project": null,
            "usuario": null,
        },
        modoAdicionar: false,
    },
    methods: {
        show() {
            this.modoAdicionar = true
        },
        getTasks() {
            this.load = true
            fetch("http://localhost:3000/tasks")
                .then((response) => response.json())
                .then((tarefasJson) => {
                    (this.tasks = tarefasJson)
                    this.load = false
                });

        },
        postTasks() {
            const data = this.task
            const son = JSON.stringify(data)

            fetch(`http://localhost:3000/tasks`, {
                headers: { "Content-type": "application/json; charset=UTF-8" },
                method: "POST",
                body: son,
            })
            this.getTasks()
        },
        editTaskPut() {
            fetch(`http://localhost:3000/tasks/${this.taskFrom.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    title: this.taskFrom.title,
                    project: this.taskFrom.project,
                    dueTo: this.taskFrom.dueTo
                })
            })
            this.getTasks()
        },

        editTask(tarefaId) {
            //modal
            console.log(tarefaId)
            console.log(this.tasks)

            let tarefa = this.tasks.filter((item) => item.id == tarefaId)[0]
            console.log(tarefa)
            this.taskFrom.id = tarefa.id
            this.taskFrom.title = tarefa.title
            this.taskFrom.project = tarefa.project
            this.taskFrom.dueTo = tarefa.dueTo

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                document.getElementById("modelWin").style.display = 'none'
            }

            // //edit tela
            // this.taskFrom.id = tarefaId.id
            // this.taskFrom.title = tarefaId.title

            // //PUT API
            // console.log("edit")



        },
        deleteTask(tarefaId) {
            fetch(`http://localhost:3000/tasks/${tarefaId}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            this.getTasks()
        }
    },
    created() {
        this.getTasks()
    },
    computed: {
        filterTasks() {
            return this.tasks.filter((el) =>
                el.title.toLowerCase().includes(this.textFilter.toLowerCase()))
        }
    }
})