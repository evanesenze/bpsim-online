
export default class UserHandler{

    constructor(user=null){
        this._serverUrl = 'https://bpsimdeveloper.pythonanywhere.com/';
        //this._serverUrl = 'http://127.0.0.1:8000/';
        this.user = user;
    }

    _saveUser(data){
        //console.log(data);
        this.user = {...this.user, ...data};
        console.log(this);
        //this._find();
    }

    _find(){
        let name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        console.log('csrftoken >> ' + cookieValue);
        return cookieValue;
    }

    async doRegistration({username, password}){
        console.log('doRegistration');
        const body = new FormData();
        body.append('username', username);
        body.append('password', password);
        await fetch(this._serverUrl + 'register/', {
                method: 'POST',
                mode: 'cors',
                body
            })
            .then(
                success => success.json()
                    .then(() => this._saveUser({username, password}))
                    .catch(() => {throw new Error('Пользователь уже существует')})
            ).catch(err => {throw new Error(err)})
        return this;
    }

    async doLogin_({}){
    }

    async getProjects(){
        await fetch(this._serverUrl + 'getprojects/', {method: 'GET'})
        .then(
            success => success.json()
            .then(res => this._saveUser(res))
            .catch(err => {throw new Error(err)}),
        )
        .catch(err => {throw new Error(err)});
        return this;
    }
    async editproject({method, projectId}){
        await fetch(this._serverUrl + `editproject/${projectId}`, {method})
        .then(() => {
            this.user.projects = this.user.projects.filter(item => item.id !== projectId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }
    async createProject({projectName}){
        const body = new FormData();
        body.append('project_name', projectName);
        await fetch(this._serverUrl + 'createproject/', {
                method: 'POST',
                mode: 'cors',
                body
            })
            .then(
                success => success.json()
                    .then(data => this.user.projects.push(data.project))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }

    async getFrames({projectId}){
        await fetch(this._serverUrl + `getframes/${Number(projectId)}`, {method: 'GET'})
            .then(
                success => success.json()
                    .then(res => this._saveUser({projectFrames: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async createFrame({name, projectId}){
        const body = new FormData();
        body.append('name', name);
        body.append('project', projectId);
        await fetch(this._serverUrl + 'createframe/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => this.user.projectFrames.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async editFrame({method, frameId}){
        await fetch(this._serverUrl + `editframe/${frameId}`, {method})
        .then(() => {
            this.user.projectFrames = this.user.projectFrames.filter(item => item.id !== frameId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }
    async createProperty({name, defaultValue, frameId}){
        const body = new FormData();
        body.append('name', name);
        body.append('defaultValue', defaultValue);
        body.append('frame', frameId);
        await fetch(this._serverUrl + 'createproperty/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => this.user.frameProperties.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async getProperties({frameId}){
        await fetch(this._serverUrl + `getproperties/${Number(frameId)}`, {method: 'GET'})
            .then(
                success => success.json()
                    .then(res => this._saveUser({frameProperties: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    
    async editProperty({method, propertyId}){
        await fetch(this._serverUrl + `editproperty/${propertyId}`, {method})
        .then(() => {
            this.user.frameProperties = this.user.frameProperties.filter(item => item.id !== propertyId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }

    async getFrameExamples({frameId}){
        await fetch(this._serverUrl + `getframeexamples/${Number(frameId)}`, {method: 'GET'})
            .then(
                success => success.json()
                    .then(res => {
                        console.log(res);
                        //const data = JSON.parse(text);
                        const frameExamples = JSON.parse(res.result);
                        console.log(frameExamples)
                        //const data = JSON.parse().result;
                        this._saveUser({frameExamples});
                    })
                    //.then(res => this._saveUser({frameProperties: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }

    async getPropertyExample({propertyId}){
        await fetch(this._serverUrl + `getpropertyexamples/${propertyId}`, {method: 'GET'})
            .then(
                success => success.text().then(console.log)
                    //.then(res => this._saveUser({propertyExamples: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async createPropertyExample({value, rowNumber, propertyId, frameId}){
        const body = new FormData();
        body.append('value', value);
        body.append('frameExample', rowNumber);
        body.append('property', propertyId);
        body.append('frame', frameId);
        await fetch(this._serverUrl + 'createpropertyexample/', {
                method: 'POST',
                body
            })
            .then(
                success => success.text()
                    .then(console.log)
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;  
    }

    async editPropertyExamples({method, propertyId}){

    }

    async getFindMethods_({frameId}){
    }
    async createFindMethod({propertiesNames, name, frame}){
        const body = new FormData();
        body.append('propertiesNames', propertiesNames);
        body.append('name', name);
        body.append('frame', frame);
        await fetch(this._serverUrl + 'createfindmethod/', {
                method: 'POST',
                body
            })
            .then(
                success => console.log(success),
                err => alert(`Error: ${err}`)
            );
        return this;
    }
    async editFindMethod_({methodId}){
    }
    async getUseCases_({projectId}){
    }
    async createUseCase({name, project}){
        const body = new FormData();
        body.append('project', project);
        body.append('name', name);
        await fetch(this._serverUrl + 'createusecase/', {
                method: 'POST',
                body
            })
            .then(
                success => console.log(success),
                err => alert(`Error: ${err}`)
            );
        return this;
    }
    async editUseCase({useCaseId}){
    }
    async getFindMethodsExamples_({useCaseId}){
    }
    async createFindMethodExamples({parameters, index, method, usecase}){
        const body = new FormData();
        body.append('parameters', parameters);
        body.append('index', index);
        body.append('method', method);
        body.append('usecase', usecase);
        await fetch(this._serverUrl + 'createfindmethodexample/', {
                method: 'POST',
                body
            })
            .then(
                success => console.log(success),
                err => alert(`Error: ${err}`)
            );
        return this;
    }
    async editFindMethodExamples_({methodExampleId}){
    }
    async executeFirstFindMethod_({methodExampleId}){
    }
    async executeNextFindMethod_({nextMethodExampleId, currentResult}){
    }
    
    
    
    

    // async removeProject({projectName}){
    //     if(!this.user) throw new Error('No user created');
    //     const body = JSON.stringify({
    //         user: this.user,
    //         data: {
    //             project_name: projectName
    //         }
    //     });
    //     await fetch(this._serverUrl + 'deleteProject/', {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body
    //         })
    //         .then(
    //             success => success
    //                 .json()
    //                 .then(data => {
    //                     console.log(data);
    //                 })
    //                 .catch(err => alert(`Error: ${err}`)),
    //             err => alert(`Error: ${err}`)
    //         );
    // }

    // async checkLogin(){
    //     await fetch(this._serverUrl, {
    //         method: 'GET',
    //     }).then(success => success.json().then(console.log), err => console.log(err));
    // }

}