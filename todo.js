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
    },
    created() {
        this.getTasks()
    }
})