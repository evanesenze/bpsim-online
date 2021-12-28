export default class UserHandler{

    constructor(){
        this._serverUrl = 'http://bpsimdeveloper.pythonanywhere.com/';
        this.user = null;
    }

    _saveUser(data){
        console.log(data);
        this.user = data;
    }

    async doRegistration({username, password}){
        const body = JSON.stringify({username,password});
        await fetch(this._serverUrl + 'registration/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body
            })
            .then(
                success => success
                    .json()
                    .then(data => this._saveUser({username, password, ...data}))
                    .catch(err => alert(`Error: ${err}`)) ,
                err => alert(`Error: ${err}`)
            );
    }

    async addProject({projectName}){
        if(!this.user) throw new Error('No user created');
        const body = JSON.stringify({
            user: this.user,
            data: {
                project_name: projectName
            }
        });
        await fetch(this._serverUrl + 'addproject/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body
            })
            .then(
                success => success
                    .json()
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => alert(`Error: ${err}`)),
                err => alert(`Error: ${err}`)
            );
    }

    async removeProject({projectName}){
        if(!this.user) throw new Error('No user created');
        const body = JSON.stringify({
            user: this.user,
            data: {
                project_name: projectName
            }
        });
        await fetch(this._serverUrl + 'deleteProject/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body
            })
            .then(
                success => success
                    .json()
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => alert(`Error: ${err}`)),
                err => alert(`Error: ${err}`)
            );
    }

    async checkLogin(){
        await fetch(this._serverUrl, {
            method: 'GET',
        }).then(success => success.json().then(console.log), err => console.log(err));
    }

}