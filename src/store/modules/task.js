import Axios from 'axios'
import Swal from 'sweetalert2'
const task = {
    namespaced: true,
    state: {
        tasks: []
    },
    getters: {
        allTasks(state) {
            return state.tasks
        }
    },
    mutations: {
        TodoApp(state, tasks) {
            state.tasks = tasks
        },
        newTask(state, task) {
            state.tasks.unshift(task)
        },
        updateTask(state, updateTask) {
            const index = state.tasks.findIndex(task => task.id == updateTask.id)
            if (index < -1) {
                state.tasks.splice(index, 1, updateTask)
            }
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id != id)
        }
    },
    actions: {
        async TodoApp({ commit }) {
            try {
                await Axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
                    commit('TodoApp', res.data)
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        },
        async filterTask({ commit }, limit) {
            try {
                await Axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`).then((res) => {
                    commit('TodoApp', res.data)
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        },
        async storeTask({ commit }, title) {
            try {
                const response = await Axios.post("https://jsonplaceholder.typicode.com/todos", {
                    title: title,
                    completed: false
                })
                commit('newTask', response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'taskadded',
                    showCancelButton: false,
                    timerProgressBar: true,
                    time: 3000,
                    toast: true,
                    position: top
                })

            } catch (error) {
                console.log(error);
            }
        },
        async updateTask({ commit }, task) {
            try {
                const response = await Axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                    id: task.id,
                    title: task.title,
                    completed: !task.completed
                })
                commit('updateTask', response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'taskupdated',
                    showCancelButton: false,
                    timerProgressBar: true,
                    time: 3000,
                    toast: true,
                    position: top
                })

            } catch (error) {
                console.log(error);
            }
        },
        async deleteTask({ commit }, id) {
            try {
                await Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                commit('deleteTask', id)
                Swal.fire({
                    icon: 'warning',
                    title: 'taskDeleted',
                    showCancelButton: false,
                    timerProgressBar: true,
                    time: 3000,
                    toast: true,
                    position: top
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
}
export default task