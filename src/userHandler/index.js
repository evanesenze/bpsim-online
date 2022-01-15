
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

    addFrameExamplesRow(){
        return new Promise((resolve, reject) => {
            try{
                if(!this.user.frameExamples) this.user.frameExamples = {}
                let rowCount = Object.keys(this.user.frameExamples).length;
                this.user.frameExamples = {...this.user.frameExamples, [rowCount + 1]: []}
                resolve(this);
            }catch(error) {reject(error);}
        });
    }

    resetFindMethodCach(){
        return new Promise((resolve, reject) => {
            try{
                this.user.executeFindMethodCach = {};
                resolve(this);
            }catch(error){reject(error);}
        });
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
                        //console.log(frameExamples)
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
    async createPropertyExample({value, rowNumber, propertyId, frameId, propertyNumber}){
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
                success => success.json()
                    .then(res => this.user.frameExamples[rowNumber][propertyNumber] = res) //
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;  
    }
    async editPropertyExamples({method, propertyExampleId, rowNumber=0, propertyNumber=0, value=''}){
        switch (method) {
            case 'DELETE':
                await fetch(this._serverUrl + `editpropertyexample/${propertyExampleId}`, {method})
                    .then(() => {
                        this.user.frameExamples[rowNumber] = this.user.frameExamples[rowNumber]
                            .filter(item => item.id !== propertyExampleId)
                        //delete this.user.frameExamples[rowNumber][propertyNumber]
                        console.log(this.user.frameExamples);
                    })
                    .catch(err => {throw new Error(err)});
                break;
            case 'PUT':
                const body = new FormData();
                body.append('value', value);
                await fetch(this._serverUrl + `editpropertyexample/${propertyExampleId}`, {method, body})
                    .then(() => {
                        this.user.frameExamples[rowNumber][propertyNumber].value = value;
                        // this.user.frameExamples[rowNumber] = this.user.frameExamples[rowNumber]
                        //     .filter(item => item.id !== propertyExampleId)
                        //delete this.user.frameExamples[rowNumber][propertyNumber]
                        console.log(this.user.frameExamples);
                    })
                    .catch(err => {throw new Error(err)}); 
                break;
            default:
                break;
        }
        
        
        return this;
    }

    async getFindMethods({frameId}){
        await fetch(this._serverUrl + `getfindmethods/${frameId}`, {method: 'GET'})
            .then(
                success => success.json()
                    .then(res => this._saveUser({frameMethods: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async createFindMethod({propertiesNames, name, frameId}){
        const body = new FormData();
        body.append('propertiesNames', propertiesNames);
        body.append('name', name);
        body.append('frame', frameId);
        await fetch(this._serverUrl + 'createfindmethod/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => this.user.frameMethods.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this; 
    }
    async editFindMethod({method, methodId}){
        await fetch(this._serverUrl + `editfindmethod/${methodId}`, {method})
        .then(() => {
            this.user.frameMethods = this.user.frameMethods.filter(item => item.id !== methodId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }

    async getUseCases({projectId}){
        await fetch(this._serverUrl + `getusecases/${projectId}`, {method: 'GET'})
            .then(
                success => success.json()
                    .then(res => this._saveUser({projectUseCases: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async createUseCase({name, projectId}){
        const body = new FormData();
        body.append('project', projectId);
        body.append('name', name);
        await fetch(this._serverUrl + 'createusecase/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => this.user.projectUseCases.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this; 
    }
    async editUseCase({method, useCaseId}){
        await fetch(this._serverUrl + `editusecase/${useCaseId}`, {method})
        .then(() => {
            this.user.projectUseCases = this.user.projectUseCases.filter(item => item.id !== useCaseId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }

    async getFindMethodsExamples({useCaseId}){
        await fetch(this._serverUrl + `getfindmethodexamples/${useCaseId}`, {method: 'GET'})
            .then(
                success => success.json()
                    // .then(console.log)
                    .then(res => this._saveUser({useCaseMethodsExamples: res}))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this;
    }
    async createFindMethodExamples({parameters, index, methodId, usecaseId}){
        const body = new FormData();
        body.append('parameters', parameters);
        body.append('index', index);
        body.append('method', methodId);
        body.append('usecase', usecaseId);
        await fetch(this._serverUrl + 'createfindmethodexample/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => this.user.useCaseMethodsExamples.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this; 
    }
    async editFindMethodExamples({method, methodExampleId}){
        await fetch(this._serverUrl + `editfindmethodexample/${methodExampleId}`, {method})
        .then(() => {
            this.user.useCaseMethodsExamples = this.user.useCaseMethodsExamples.filter(item => item.id !== methodExampleId);
        })
        .catch(err => {throw new Error(err)});
        return this;
    }

    async executeFirstFindMethod({methodExampleId}){
        await fetch(this._serverUrl + `executefirstfindmethod/${methodExampleId}`, {method: 'GET'})
        .then(
            success => success.json()
                .then(res => {
                    const obj = {
                        resultOriginal: res.result,
                        resultView: JSON.parse(res.result)
                    };
                    this._saveUser({executeFindMethodCach: {1: obj}});
                    console.log(obj);
                })
                // .then(res => this._saveUser({useCaseMethodsExamples: res}))
                .catch(err => {throw new Error(err)}))
        .catch(err => {throw new Error(err)});
    return this;
    }
    async executeNextFindMethod({nextMethodExampleId, currentResult, executeFindMethodIndex}){
        const body = new FormData();
        body.append('findmethodexample_id', nextMethodExampleId);
        body.append('result', currentResult);
        await fetch(this._serverUrl + 'executenextfindmethod/', {
                method: 'POST',
                body
            })
            .then(
                success => success.json()
                    .then(res => {
                        const obj = {
                            resultOriginal: res.result,
                            resultView: JSON.parse(res.result)
                        };
                        this.user.executeFindMethodCach = {...this.user.executeFindMethodCach, [executeFindMethodIndex]: obj};
                        // this._saveUser({executeFindMethodCach: {}});
                        console.log(obj);
                    })
                    //.then(res => this.user.useCaseMethodsExamples.push(res))
                    .catch(err => {throw new Error(err)}))
            .catch(err => {throw new Error(err)});
        return this; 
    }
}