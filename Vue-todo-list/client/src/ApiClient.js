// REST API URL
const url = "http://localhost:5000/api"

// Asynchronous Client using Javascript Fetch APIs 
class ApiClient {

    // Retrieve todolist tasks and return JSON data
    static retrieveTasks() {
        return new Promise((resolve, reject) => {
            fetch(`${url}/todos`)
                .then(response => {
                    if(!response.ok){
                        return reject(response.status)
                    } else{
                        resolve(response.json());
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }

    // Add todolist task
    static addTask(task) {
        return new Promise((resolve, reject) => {
            fetch(`${url}/todo`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        todo: task,
                    })
                })
                .then(response => {
                    if(!response.ok){
                        return reject(response.status)
                    } else{
                        resolve(response.json());
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        })
    }

    // Delete todolist task
    static deleteTask(id) {
        return new Promise((resolve, reject) => {
            fetch(`${url}/todo/${id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if(!response.ok){
                        return reject(response.status)
                    } else{
                        resolve(response);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        })
    }

    //Complete todolist task
    static editTask(id, task, completed) {
        return new Promise((resolve, reject) => {
            fetch(`${url}/todo/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        todo: task,
                        completed: completed
                    })
                })
                .then(response => {
                    if(!response.ok){
                        return reject(response.status)
                    } else{
                        resolve(response);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        })
    }
}

export default ApiClient;