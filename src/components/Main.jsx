import React, {useEffect, useState, useRef} from "react";
import {Navigate} from 'react-router-dom';

export default function({UserHandler}){
    if(!UserHandler) {
      alert('Пользователь не авторизован');
      return (<Navigate to="/" />);
    }
    //console.log(UserHandler);
    const {username} = UserHandler.user;
    
    const [projects, setProjects] = useState([]);
    const [projectFrames, setProjectFrames] = useState([]);
    const [projectUseCases, setProjectUseCases] = useState([]);
    const [frameProperties, setFrameProperties] = useState([]);
    const [frameMethods, setFrameMethods] = useState([]);
    const [useCaseMethodsExamples, setUseCaseMethodsExamples] = useState([]);
    
    const [currentProject, setCurrentProject] = useState({});
    const [currentFrame, setCurrentFrame] = useState({});
    const [currentProperty, setCurrentProperty] = useState({});
    const [currentMethod, setCurrentMethod] = useState({});
    const [currentUseCase, setCurrentUseCase] = useState({});
    const [currentMethodExample, setCurrentMethodExample] = useState({});
    
    const [frameExamples, setFrameExamples] = useState({});
    const [selectedMethodProperty, setSelectedMethodProperty] = useState(null);
    const [executeFindMethodIndex, setExecuteFindMethodIndex] = useState(1);
    const [executeFindMethodCach, setExecuteFindMethodCach] = useState({});

    const createProject = (event) => {
      event.preventDefault();
      const projectName = event.target.projectName.value;
      UserHandler.createProject({projectName})
        .then(uh => setProjects(x => [...uh.user.projects] || []))
        .then(() => alert(`Проект "${projectName}" создан`))
        .then(() => event.target.reset());
    };
    const createFrame = (event) => {
      event.preventDefault();
      if(!currentProject.id) {
        alert('Сначала выберите проект');
        return;
      };
      const name = event.target.name.value;
      UserHandler.createFrame({name, projectId: currentProject.id})
        .then(uh => setProjectFrames(x => [...uh.user.projectFrames] || []))
        .then(() => alert(`Фрейм "${name}" создан`))
        .then(() => event.target.reset());
        //.then(x => x)
    };
    const createProperty = (event) => {
      event.preventDefault();
      if(!currentFrame.id){
        alert('Сначала выберите фрейм');
        return;
      };
      const name = event.target.name.value;
      const defaultValue = event.target.defaultValue.value;
      UserHandler.createProperty({name, defaultValue, frameId: currentFrame.id})
        .then(uh => setFrameProperties(() => [...uh.user.frameProperties] || []))
        .then(() => alert(`Свойство "${name}" создано`))
        .then(() => event.target.reset());
    };
    const createPropertyExample = (event) => {
      event.preventDefault();
      if(!currentProperty.id){
        alert('Сначала выберите свойство');
        return;
      };
      const name = event.target.name.value;
      const defaultValue = event.target.defaultValue.value;
      UserHandler.createProperty({name, defaultValue, frameId: currentFrame.id})
    };
    const createMethod = (event) => {
      event.preventDefault();
      if(!currentFrame.id){
        alert('Сначала выберите фрейм');
        return;
      };
      const name = event.target.name.value;
      const propertiesNames = event.target.propertiesNames.value;
      const propData = JSON.stringify([String(propertiesNames)]);
      if(!name || !propertiesNames) {
        alert('Не задано имя или не выбрано свойство');
        return;
      }
      UserHandler.createFindMethod({name, frameId: currentFrame.id, propertiesNames: propData})
        .then(uh => setFrameMethods(x => [...uh.user.frameMethods] || []))
        .then(() => alert(`Метод ${name} создан`))
        .then(() => event.target.reset());
    };
    const createUseCase = (event) => {
      event.preventDefault();
      if(!currentProject.id) {
        alert('Сначала выберите проект');
        return;
      };
      const name = event.target.name.value;
      UserHandler.createUseCase({name, projectId: currentProject.id})
        .then(uh => setProjectUseCases(x => {return [...uh.user.projectUseCases] || []}))
        .then(() => alert(`Сценарий ${name} создан`))
        .then(() => event.target.reset());
    };
    const createMethodsExamples = (event) => {
      event.preventDefault();
      if(!currentFrame.id) {
        alert('Сначала выберите фрейм');
        return;
      }else if(!currentUseCase.id){
        alert('Сначала выберите сценарий');
        return;
      }
      const value = event.target.value.value;
      const methodId = event.target.methodId.value;
      const propertyId = event.target.propertyId.dataset.propertyid;
      const index = useCaseMethodsExamples.length + 1;
      
      UserHandler.createFindMethodExamples({
        parameters: JSON.stringify({[propertyId]: value}),
        index,
        methodId,
        usecaseId: currentUseCase.id
      })
        .then(uh => setUseCaseMethodsExamples(x => {return [...uh.user.useCaseMethodsExamples] || []}))
        .then(() => alert('Экземпляр метода создан'))
        .then(() => {
          event.target.reset();
          setSelectedMethodProperty(x => null);
        });
      //console.log(value,methodId,propertyId);

    };

    const removeCurrentProject = () => {
      if(!currentProject.id){
        return;
      }
      UserHandler
        .editproject({method: 'DELETE', projectId: currentProject.id})
        .then(uh => setProjects(x => uh.user.projects || []))
        .then(() => {
          alert(`Вы удалили проект "${currentProject.name}"`)
          setCurrentProject(x => {return {}});
        })
    };
    const removeCurrentFrame = () => {
      if(!currentFrame.id){
        return;
      }
      UserHandler
        .editFrame({method: 'DELETE', frameId: currentFrame.id})
        .then(uh => setProjectFrames(x => uh.user.projectFrames || []))
        .then(() => {
          alert(`Вы удалили фрейм "${currentFrame.name}"`)
          setCurrentFrame(x => {return {}});
        })
    };
    const removeCurrentProperty = () => {
      if(!currentProperty.id){
        return;
      }
      UserHandler.editProperty({method: 'DELETE', propertyId: currentProperty.id})
        .then(uh => setFrameProperties(x => uh.user.frameProperties || []))
        .then(() => {
          alert(`Вы удалили свойство "${currentProperty.name}"`)
          setCurrentProperty(x => {return {}});
        })
    };
    const removeCurrentMethod = () => {
      if(!currentMethod.id){
        return;
      }
      UserHandler.editFindMethod({method: 'DELETE', methodId: currentMethod.id})
        .then(uh => setFrameMethods(x => uh.user.frameMethods || []))
        .then(() => {
          alert(`Вы удалили метод "${currentMethod.name}"`)
          setCurrentMethod(x => {return {}});
        })
    };
    const removeCurrentUseCase = () => {
      if(!currentUseCase.id){
        return;
      }
      UserHandler.editUseCase({method: 'DELETE', useCaseId: currentUseCase.id})
        .then(uh => setProjectUseCases(x => uh.user.projectUseCases || []))
        .then(() => {
          alert(`Вы удалили сценарий "${currentUseCase.name}"`)
          setCurrentUseCase(x => {return {}});
        })
    };
    const removeCurrentMethodExample = () => {
      if(!currentMethodExample.id){
        return;
      }else if (currentMethodExample.index != useCaseMethodsExamples.length){
        alert('Удалить можно только последний экземпляр');
        return;
      }
      UserHandler.editFindMethodExamples({method: 'DELETE', methodExampleId: currentMethodExample.id})
        .then(uh => setUseCaseMethodsExamples(x => uh.user.useCaseMethodsExamples || []))
        .then(() => {
          alert('Вы удалили экземпляр метода')
          setCurrentMethodExample(x => {return {}});
        })
    }



    const selectProject = ({id}) => {
      const targetProjects = projects.filter(item => item.id === id);
      if(!targetProjects.length) {
        alert(`Проекта с id ${id} не существует`);
        return;
      }

      setCurrentProject(() => targetProjects[0]);
      setCurrentFrame(() => {return {}});
      setCurrentProperty(() => {return {}});
      setCurrentMethod(() => {return {}});
      setCurrentUseCase(() => {return {}});
      setCurrentMethodExample(() => {return {}});
      
      setProjectFrames(() => []);
      setProjectUseCases(() => []);
      setFrameProperties(() => []);
      setFrameMethods(() => []);
      setUseCaseMethodsExamples(() => []);
      
      setFrameExamples(() => {return {}});
      setSelectedMethodProperty(() => null);
      setExecuteFindMethodIndex(() => 1);
      setExecuteFindMethodCach(() => {return {}})
      
    };
    const selectFrame = ({id}) => {
      const targetFrames = projectFrames.filter(item => item.id === id);
      if(!targetFrames.length) {
        alert(`Фрейма с id ${id} не существует`);
        return;
      }
      setCurrentFrame(x => targetFrames[0]);
    };
    const selectProperty = ({id}) => {
      const targetProperties = frameProperties.filter(item => item.id === id);
      if(!targetProperties.length) {
        alert(`Свойства с id ${id} не существует`);
        return;
      }
      setCurrentProperty(x => targetProperties[0]);
    };
    const selectMethod = ({id}) => {
      const targetMethods = frameMethods.filter(item => item.id === id);
      if(!targetMethods.length) {
        alert(`Метода с id ${id} не существует`);
        return;
      }
      setCurrentMethod(x => targetMethods[0]);
    };
    const selectUseCase = ({id}) => {
      const targetUseCases = projectUseCases.filter(item => item.id === id);
      if(!targetUseCases.length) {
        alert(`Сценария с id ${id} не существует`);
        return;
      }
      setCurrentUseCase(x => targetUseCases[0]);
    };
    const selectMethodExample = ({id}) => {
      const targetMethodExample = useCaseMethodsExamples.filter(item => item.id === id);
      if(!targetMethodExample.length) {
        alert(`Экземпляра метода с id ${id} не существует`);
        return;
      }
      setCurrentMethodExample(x => targetMethodExample[0]);
    }
    
    const loadProjects = () => {
      UserHandler
        .getProjects()
        .then(uh => setProjects(x => uh.user.projects));
    };
    const loadFrames = () => {
      if(!currentProject?.id) return;
      UserHandler
        .getFrames({projectId: currentProject.id})
        .then(uh => setProjectFrames(x => uh.user.projectFrames || []));
    };
    const loadUseCases = () => {
      if(!currentProject?.id) return;
      UserHandler
        .getUseCases({projectId: currentProject.id})
        .then(uh => setProjectUseCases(x => uh.user.projectUseCases || []));
    }
    const loadProperties = () => {
      if(!currentFrame?.id) return;
      UserHandler.getProperties({frameId: currentFrame.id})
        .then(uh => setFrameProperties(() => uh.user.frameProperties || []))
    };
    const loadMethods = () => {
      if(!currentFrame?.id) return;
      UserHandler.getFindMethods({frameId: currentFrame.id})
        .then(uh => setFrameMethods(() => uh.user.frameMethods || []))
    }
    const loadFrameExamples = () => {
      if(!currentFrame?.id) return;
      UserHandler.getFrameExamples({frameId: currentFrame.id})
        .then(uh => setFrameExamples(x => uh.user.frameExamples || {}));
    };
    const loadUseCaseMethondsExamples = () => {
      if(!currentUseCase?.id) return;
      UserHandler.getFindMethodsExamples({useCaseId: currentUseCase.id})
        .then(uh => setUseCaseMethodsExamples(x => uh.user.useCaseMethodsExamples || []));
    }
    const loadPropertiesExamples = () => {
      //if(!currentProperty?.id) return;
      UserHandler.getPropertyExample({propertyId: currentProperty.id})
       // .then(uh => setFrameProperties(() => uh.user.frameProperties || []))
    };

    const editTableData = ({event, propertyId, rowNumber, propertyNumber}) => {
      console.log('propertyId>>'+propertyId);
      const selectedPropertyExample = frameExamples[rowNumber][propertyNumber];
      if(event.ctrlKey && window.confirm(`Хотите удалить значение "${selectedPropertyExample?.value}"?`)){
        if(!selectedPropertyExample) alert('Вы не можете удалить пустое поле');
        else {
          UserHandler.editPropertyExamples({
            method:'DELETE', 
            propertyExampleId: selectedPropertyExample.id,
            rowNumber,
            propertyNumber
          })
            .then(uh => setFrameExamples(x => {return {...uh.user.frameExamples} || {}}));
          console.log('remove');
        } 
      }else if(!event.ctrlKey){
        const newValue = prompt('Новое значение');
        if(!newValue) alert('Новое значение не задано');
        else if(selectedPropertyExample){
          UserHandler.editPropertyExamples({
            method:'PUT', 
            propertyExampleId: selectedPropertyExample.id,
            rowNumber,
            propertyNumber,
            value: newValue
          })
            .then(uh => setFrameExamples(x => {return {...uh.user.frameExamples} || {}}))
          console.log('Меняем');
        }else{
          //const propertyId = frameProperties[propertyNumber].id;
          UserHandler.createPropertyExample({
            value: newValue, 
            rowNumber,
            propertyNumber, 
            propertyId, 
            frameId: currentFrame.id
          })
            .then(uh => setFrameExamples(x => {return {...uh.user.frameExamples} || {}}))
        }

      }
      //console.log(event.ctrlKey);
      //console.log(newValue);
      //console.log(property);
    };
    const renderTable = ({tableData, name, canEdit=false}) => {
      const emptyRow = new Array(frameProperties.length)
        .fill(null)
        .map((item, index) => {return {property: frameProperties[index].id, value: ''}});
      //console.log(emptyRow);
      return Object.keys(tableData).map(rowNumber => {
        let rowData = tableData[rowNumber];
        if(rowData.length < emptyRow.length) rowData = [...emptyRow].map((item, index) => rowData[index] || item);
        return (
          <tr key={`${name}_tableRow_${rowNumber}`} >
            <td>{rowNumber}</td>
            {rowData.map((item, index) => {
              const {property, value} = item;
              return (<td 
                key={`${name}_rowData_${index}`} 
                onClick={(event) => {
                  if(canEdit)
                    editTableData({event, propertyId:property, rowNumber, propertyNumber: index})
                  }}>{value}</td>)
            })}
          </tr>
        )
      });
    };
    const addTableRow = () => {
      if(Object.values(frameExamples).filter(item => !item.length).length > 0){
        alert('Заполните все пустые строки');
        return;
      }
      UserHandler.addFrameExamplesRow()
        .then(uh => setFrameExamples(x => {return {...uh.user.frameExamples}}));
      //let rowCount = Object.keys(frameExamples).length;
      
    };

    const changeSelectedMethodProperty = (event) => {
      const methodId = Number(event.target.value);
      // console.log(methodId);
      // console.log(frameMethods);
      const targetMethods = frameMethods.filter(item => item.id === methodId);
      if(!targetMethods.length){
        alert('error');
        return;
      }
      // console.log(targetMethods);
      const propertyId = Number(targetMethods[0].propertiesNames[0]);
      const targetProperties = frameProperties.filter(item => item.id === propertyId);
      if(!targetProperties.length){
        alert('error');
        return;
      }
      // console.log(targetProperties);
      setSelectedMethodProperty(x => targetProperties[0]);
    }

    const executeFindMethod = () => {
      if(!useCaseMethodsExamples.length || executeFindMethodCach[executeFindMethodIndex]) return;
      const currentMethodIndex = executeFindMethodIndex - 1;
      const methodExampleId = useCaseMethodsExamples[currentMethodIndex].id;
      if(executeFindMethodIndex === 1){
        UserHandler.executeFirstFindMethod({methodExampleId})
          .then(uh => setExecuteFindMethodCach(x => uh.user.executeFindMethodCach));
      }else{
        const cachResult = executeFindMethodCach[currentMethodIndex];
        if(!cachResult){
          alert('Ошибка кеша запросов');
          return;
        };
        UserHandler.executeNextFindMethod({
          nextMethodExampleId:methodExampleId, 
          currentResult: cachResult.resultOriginal,
          executeFindMethodIndex 
        })
          .then(uh => setExecuteFindMethodCach(x => {return {...uh.user.executeFindMethodCach} || {}}));
        console.log(cachResult);
      }
    }

    const resetFindMethodCach = () => {
      setExecuteFindMethodIndex(x => 1);
      UserHandler.resetFindMethodCach()
        .then(uh => setExecuteFindMethodCach(x => uh.user.executeFindMethodCach || {}))
    }

    useEffect(loadProjects, []);
    useEffect(loadFrames, [currentProject]);
    useEffect(loadUseCases, [currentProject]);
    useEffect(loadFrameExamples, [currentFrame]);
    useEffect(loadProperties, [currentFrame]);
    useEffect(loadMethods, [currentFrame]);
    useEffect(loadUseCaseMethondsExamples, [currentUseCase]);
    useEffect(executeFindMethod, [executeFindMethodIndex]);
    useEffect(() => {
      console.log('reload');
      //console.log(frameExamples);
    });


    //const {username} = UserHandler;
    return (<React.Fragment>
        <div className="block_group" >
          <div className="block">
            <span>Создать проект</span>
            <form onSubmit={createProject} >
              <input placeholder="Имя проекта" name="projectName"/>
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Проекты
            <ul>
              {projects.map(({id, name}) => 
              (<li className="project_li" key={`project_${id}`} onClick={()=>selectProject({id})} >
                <span>{name||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранный проект</span>
            <div>ID: {currentProject?.id || ''}</div>
            <div>Название: {currentProject?.name || ''}</div>
            {currentProject?.id?(<button onClick={removeCurrentProject} >Удалить</button>):null}
          </div>
        </div>
        <div className="block_group" >
          <div className="block">
            <span>Создать фрейм</span>
            <form onSubmit={createFrame} >
              <input placeholder="Имя фрейма" name="name"/>
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Фреймы проекта
            <ul>
              {projectFrames.map(({id, name}) => 
              (<li className="project_li" key={`frame_${id}`} onClick={()=>selectFrame({id})} >
                <span>{name||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранный фрейм</span>
            <div>ID: {currentFrame?.id || ''}</div>
            <div>Название: {currentFrame?.name || ''}</div>
            {currentFrame?.id?(<button onClick={removeCurrentFrame} >Удалить</button>):null}
          </div>
          <div className="block">
            <span>Создать сценарий</span>
            <form onSubmit={createUseCase} >
              <input placeholder="Имя сценария" name="name"/>
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Cценарии проекта
            <ul>
              {projectUseCases.map(({id, name}) => 
              (<li className="project_li" key={`method_${id}`} onClick={()=>selectUseCase({id})} >
                <span>{name||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранный сценарий</span>
            <div>ID: {currentUseCase?.id || ''}</div>
            <div>Название: {currentUseCase?.name || ''}</div>
            {currentUseCase?.id?(<button onClick={removeCurrentUseCase} >Удалить</button>):null}
            {/* {useCaseMethodsExamples.length?(<button onClick={runUseCase} >Выполнить</button>):null} */}
          </div>
        </div>
        <div className="block_group">
          <div className="block">
            <span>Создать свойство</span>
            <form onSubmit={createProperty} >
              <div><input placeholder="Имя свойства" name="name"/></div>
              <div><input placeholder="Значение по умолчанию" name="defaultValue"/></div>
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Свойства фрейма
            <ul>
              {frameProperties.map(({id, name}) => 
              (<li className="project_li" key={`property_${id}`} onClick={()=>selectProperty({id})} >
                <span>{name||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранное свойство</span>
            <div>ID: {currentProperty?.id || ''}</div>
            <div>Название: {currentProperty?.name || ''}</div>
            {currentProperty?.id?(<button onClick={removeCurrentProperty} >Удалить</button>):null}
          </div>
          <div className="block table">
            <table className="properties-table" border="1" cellPadding="10" cols={frameProperties.length + 1} width="100%">
              <caption>Экземпляры свойств фрейма</caption>
              <thead>
                <tr>
                  <th>Номер экземпляра</th>
                  {frameProperties.map((item, i) => (<th>{item.name || 'untitled'}</th>))}
                </tr>
              </thead>
              <tbody>
                {renderTable({
                  tableData:frameExamples, 
                  name: 'properties',
                  canEdit: true})}
              </tbody>
            </table>
            <div>ЛКМ - задать значение полю, CTRL+ЛКМ - удалить поле</div>
            <button onClick={addTableRow} >Добавить строку</button>
          </div>
        </div>
        <div className="block_group">
          <div className="block">
            <span>Создать метод</span>
            <form onSubmit={createMethod} >
              <div><input placeholder="Имя метода" name="name"/></div>
              <div>
                <select name="propertiesNames" defaultValue='' >
                  <option disabled value=''>Выберите совйство</option>
                  {frameProperties.map((item, i) => (
                    <option key={`propName_${i}`} value={item.id} >{item.name}</option>
                  ))}
                </select>
              </div>
              {/* <input placeholder="Значение по умолчанию" name="defaultValue"/> */}
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Методы фрейма
            <ul>
              {frameMethods.map(({id, name}) => 
              (<li className="project_li" key={`method_${id}`} onClick={()=>selectMethod({id})} >
                <span>{name||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранный метод</span>
            <div>ID: {currentMethod?.id || ''}</div>
            <div>Название: {currentMethod?.name || ''}</div>
            {currentMethod?.id?(<button onClick={removeCurrentMethod} >Удалить</button>):null}
          </div>
        
          <div className="block">
            <span>Создать экземпляр метода</span>
            <form onSubmit={createMethodsExamples} >
              <div>
                <select name="methodId" defaultValue='' onChange={(e) => changeSelectedMethodProperty(e)} >
                  <option disabled value=''>Выберите метод</option>
                  {frameMethods.map((item, i) => (
                    <option key={`methodName_${i}`} value={item.id} >{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <input name="propertyId" data-propertyid={selectedMethodProperty?.id ?? ''} disabled value={selectedMethodProperty?.name ?? 'Метод не выбран'}/>
                {/* <select name="propertyId" defaultValue={selectedMethodProperty?.id ?? ''} >
                  <option disabled value={selectedMethodProperty?.id ?? ''}>
                    {selectedMethodProperty?.name ?? 'Метод не выбран'}
                  </option>
                </select> */}
              </div>
              <div><input name="value" placeholder="Значение свойства" /></div>
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="block">
            Экземпляры методов
            <ul>
              {useCaseMethodsExamples.map(({id, index}) => 
              (<li className="project_li" key={`method_${id}`} onClick={()=>selectMethodExample({id})} >
                <span>{index||'untitled'}</span>  
              </li>))}
            </ul>
          </div>
          <div className="block" >
            <span>Выбранный экземпляр метода</span>
            <div>Id: {currentMethodExample?.id || ''}</div>
            <div>Index: {currentMethodExample?.index || ''}</div>
            <div>Метод: {(frameMethods
              .filter(item => item.id === currentMethodExample?.method )[0]?.name) || ''}
            </div>
            {currentMethodExample?.id?(<button onClick={removeCurrentMethodExample} >Удалить</button>):null}
          </div>
        </div>
        <div className="block_group">
          <div className="block table" >
              <span>Выполнение сценария</span>
              <div>Текущий номер метода: {executeFindMethodIndex}</div>
              <div>
                {!Object.keys(executeFindMethodCach).length?(<button onClick={() => executeFindMethod()}>Начать</button>):null}
                {Object.keys(executeFindMethodCach).length?(<button onClick={() => resetFindMethodCach()}>Сброс</button>):null}
                <button 
                  disabled={executeFindMethodIndex === 1} 
                  onClick={() => setExecuteFindMethodIndex(x => x - 1)}>Назад</button>
                <button 
                  disabled={executeFindMethodIndex === useCaseMethodsExamples.length} 
                  onClick={() => setExecuteFindMethodIndex(x => x + 1)} >Вперед</button>
              </div>
              <table className="properties-table" border="1" cellPadding="10" cols={frameProperties.length + 1} width="100%">
              <caption>Результаты</caption>
              <thead>
                <tr>
                  <th>Номер экземпляра</th>
                  {frameProperties.map((item, i) => (<th>{item.name || 'untitled'}</th>))}
                </tr>
              </thead>
              <tbody>
                {renderTable({
                  tableData: executeFindMethodCach[executeFindMethodIndex]?.resultView ?? {},
                  name: 'results'
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>);
}