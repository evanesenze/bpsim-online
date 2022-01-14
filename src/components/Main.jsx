import React, {useEffect, useState} from "react";
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
    const [frameProperties, setFrameProperties] = useState([]);
    
    const [frameExamples, setFrameExamples] = useState({});
    const [currentProject, setCurrentProject] = useState({});
    const [currentFrame, setCurrentFrame] = useState({});
    const [currentProperty, setCurrentProperty] = useState({});
    
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



    const selectProject = ({id}) => {
      const targetProjects = projects.filter(item => item.id === id);
      if(!targetProjects.length) {
        alert(`Проекта с id ${id} не существует`);
        return;
      }
      setCurrentProject(x => targetProjects[0]);
      setCurrentFrame(x => {return {}});
      setCurrentProperty(x => {return {}});
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
    
    const loadProjects = () => {
      UserHandler
        .getProjects()
        .then(uh => setProjects(x => uh.user.projects));
    };
    
    const loadFrames = () => {
      if(!currentProject?.id) return;
      UserHandler
        .getFrames({projectId: currentProject.id})
        .then(uh => setProjectFrames(x => uh.user.projectFrames || []))
    };

    const loadProperties = () => {
      if(!currentFrame?.id) return;
      UserHandler.getProperties({frameId: currentFrame.id})
        .then(uh => setFrameProperties(() => uh.user.frameProperties || []))
    };

    const loadFrameExamples = () => {
      if(!currentFrame?.id) return;
      UserHandler.getFrameExamples({frameId: currentFrame.id})
        .then(uh => setFrameExamples(x => uh.user.frameExamples || {}))
    };

    const loadPropertiesExamples = () => {
      //if(!currentProperty?.id) return;
      UserHandler.getPropertyExample({propertyId: currentProperty.id})
       // .then(uh => setFrameProperties(() => uh.user.frameProperties || []))
    };

    const saveTableData = ({propertyId, rowNumber, propertyNumber}) => {
      const property = frameExamples[rowNumber][propertyNumber];
      if(!property) return;
      if(property.property !== propertyId){
        alert('Ошибка: property.property !== propertyId');
        return;
      }
      //UserHandler.createPropertyExample({value: property.value, rowNumber, propertyId, frameId: currentFrame.id})
      console.log(property);
      console.log('propertyId >> ' + propertyId );
      console.log('rowNumber >> ' + rowNumber );
      console.log('propertyNumber >> ' + propertyNumber );
    };

    const renderTable = () => {
      const emptyRow = new Array(frameProperties.length)
        .fill(null)
        .map((item, index) => {return {property: frameProperties[index].id, value: ''}});
      console.log(emptyRow);
      return Object.keys(frameExamples).map(rowNumber => {
        let rowData = frameExamples[rowNumber];
        if(rowData.length < emptyRow.length) rowData = [...emptyRow].map((item, index) => rowData[index] || item);
        return (
          <tr>
            <td>{rowNumber}</td>
            {rowData.map((item, index) => {
              const {property, value} = item;
              return (<td key={`rowData_${index}`} >
                <input onBlur={() => saveTableData({propertyId: property, rowNumber, propertyNumber: index})} 
                  value={value}  
                  onChange={(e) => setFrameExamples(x => {
                //console.log(x);
                //let dataRef = x[rowNumber][index];
                if(!x[rowNumber][index]) x[rowNumber][index] = {property};
                x[rowNumber][index].value = e.target.value;
                return {...x};
              })} /></td>)
            })}
          </tr>
        )
      });
    }

    

    useEffect(loadProjects, []);
    useEffect(loadFrames, [currentProject]);
    useEffect(loadFrameExamples, [currentFrame]);
    useEffect(loadProperties, [currentFrame]);
    useEffect(() => {
      console.log('reload');
      //console.log(frameExamples);
    });


    //const {username} = UserHandler;
    return (<React.Fragment>
      <div className="wrapper">
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
          <span>Создать свойство</span>
          <form onSubmit={createProperty} >
            <input placeholder="Имя свойства" name="name"/>
            <input placeholder="Значение по умолчанию" name="defaultValue"/>
            <button type='submit'>Add</button>
          </form>
        </div>
        <div className="block">
          Свойства фрейма
          <ul>
            {frameProperties.map(({id, name}) => 
            (<li className="project_li" key={`frame_${id}`} onClick={()=>selectProperty({id})} >
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
          <button onClick={loadPropertiesExamples} >load</button>
          <table className="properties-table" border="1" cellPadding="10" cols={frameProperties.length + 1} width="100%">
            <caption>Экземпляры свойств фрейма</caption>
            <tr>
              <th>Номер экземпляра</th>
              {frameProperties.map((item, i) => (<th>{item.name || 'untitled'}</th>))}
            </tr>
            {renderTable()}
          </table>
        </div>
      </div>
      </React.Fragment>);
}