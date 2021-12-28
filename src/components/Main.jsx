import React from "react";
import {BrowserRouter as Router, Link, Navigate} from 'react-router-dom';

export default function({username, setUsername}){
    if(!username) return (<Navigate to="/" />)
    return (<React.Fragment>
        <header className="header">
          <div className="header_container">
            <div className="header_title">
              <h1 className="title">
                BPsim Online
              </h1>
            </div>
          <div className="user">
            <div className="user">
              <p className="user_name">
                Пользователь:{username}
              </p>
              <div className="dropdown">
                <input className="dropdown__check" type="checkbox" id="dropdown[1]" />
                <label className="dropdown__toggle" htmlFor="dropdown[1]">
                  <div className="conteiner_img" tabIndex="1">
                    <img src="/img/user.svg" alt="user" className="user_img" />
                  </div>              
                </label>
                <ul className="dropdown__menu">
                  <li>
                    <label htmlFor="popupCheckbox" className="popup-shower">
                      <p className="text">Мои проекты</p>
                    </label>                              
                  </li>
                  <li>
                    <a href="#" className="text" onClick={(e) => setUsername(x => null)} >Выйти</a>
                  </li>
                </ul>
              </div>
           </div>
          </div>        
        </div>
      </header>
      <main className="main">
        <div className="main_container">
          <nav className="menu">
            <ul className="menu_list">
              <li className="menu_item">
                <label htmlFor="popupCheckboxOne" className="popup-shower">
                  <span className="hidden">Свойства</span>
                  <svg className="faetures_img" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.25 7.5V23.7413C23.2512 23.9054 23.22 24.0682 23.1582 24.2203C23.0965 24.3724 23.0053 24.5108 22.8901 24.6277C22.7748 24.7446 22.6377 24.8376 22.4864 24.9015C22.3352 24.9654 22.1729 24.9989 22.0088 25H1.99125C1.66227 25 1.34674 24.8694 1.114 24.6369C0.881252 24.4044 0.750331 24.089 0.75 23.76V1.24C0.75 0.56875 1.31125 0 2.0025 0H15.7463L23.25 7.5ZM20.75 8.75H14.5V2.5H3.25V22.5H20.75V8.75Z" fill="#959595"/>
                  </svg>
                </label>
                <div className="popup-wrapper">
                  <input type="checkbox" className="popup-checkbox" id="popupCheckboxOne" />
                  <div className="popup">
                    <div className="popup-content four">    
                      <div className="popup-wrapper_win">
                        <div className="header_container_win">
                          <nav className="nav_main">
                            <ul className="nav_list">
                              <li className="nav_item">
                                <label htmlFor="popupCheckboxOne" className="popup-closer">
                                  <span className="hidden">Выйти</span>
                                  <svg className="go_out_img" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.735 20L0 10L11.735 0V6.25C18.2162 6.25 23.47 11.8463 23.47 18.75C23.47 19.0912 23.4583 19.4287 23.4324 19.7625C21.7156 16.295 18.3512 13.8988 14.4493 13.7563L14.082 13.75H11.735V20ZM9.388 11.25H14.1219L14.5291 11.2587C16.0371 11.3125 17.491 11.6462 18.8429 12.2162C17.1214 10.0938 14.5749 8.75 11.735 8.75H9.388V5.20125L3.75755 10L9.388 14.7987V11.25Z" fill="#959595"/>
                                  </svg>
                                </label>
                              </li>
                              <li className="nav_item">
                                <a className="add_link" href="#">
                                  <span className="hidden">Добавить</span>
                                  <svg className="add_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.75684 9V5H11.7568V9H15.7568V11H11.7568V15H9.75684V11H5.75684V9H9.75684ZM10.7568 20C5.23384 20 0.756836 15.523 0.756836 10C0.756836 4.477 5.23384 0 10.7568 0C16.2798 0 20.7568 4.477 20.7568 10C20.7568 15.523 16.2798 20 10.7568 20ZM10.7568 18C12.8786 18 14.9134 17.1571 16.4137 15.6569C17.914 14.1566 18.7568 12.1217 18.7568 10C18.7568 7.87827 17.914 5.84344 16.4137 4.34315C14.9134 2.84285 12.8786 2 10.7568 2C8.6351 2 6.60027 2.84285 5.09998 4.34315C3.59969 5.84344 2.75684 7.87827 2.75684 10C2.75684 12.1217 3.59969 14.1566 5.09998 15.6569C6.60027 17.1571 8.6351 18 10.7568 18Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="delete_link" href="#">
                                  <span className="hidden">Удалить</span>
                                  <svg className="delete_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6035 4H20.6035V6H18.6035V19C18.6035 19.2652 18.4982 19.5196 18.3106 19.7071C18.1231 19.8946 17.8687 20 17.6035 20H3.60352C3.3383 20 3.08395 19.8946 2.89641 19.7071C2.70887 19.5196 2.60352 19.2652 2.60352 19V6H0.603516V4H5.60352V1C5.60352 0.734784 5.70887 0.48043 5.89641 0.292893C6.08395 0.105357 6.3383 0 6.60352 0H14.6035C14.8687 0 15.1231 0.105357 15.3106 0.292893C15.4982 0.48043 15.6035 0.734784 15.6035 1V4ZM16.6035 6H4.60352V18H16.6035V6ZM12.0175 12L13.7855 13.768L12.3715 15.182L10.6035 13.414L8.83552 15.182L7.42152 13.768L9.18952 12L7.42152 10.232L8.83552 8.818L10.6035 10.586L12.3715 8.818L13.7855 10.232L12.0175 12ZM7.60352 2V4H13.6035V2H7.60352Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="save_link" href="#">
                                  <span className="hidden">Сохранить</span>
                                  <svg className="save_img" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.75 20.25V12.75H18.25V20.25H20.75V6.285L17.215 2.75H3.25V20.25H5.75ZM2 0.25H18.25L23.25 5.25V21.5C23.25 21.8315 23.1183 22.1495 22.8839 22.3839C22.6495 22.6183 22.3315 22.75 22 22.75H2C1.66848 22.75 1.35054 22.6183 1.11612 22.3839C0.881696 22.1495 0.75 21.8315 0.75 21.5V1.5C0.75 1.16848 0.881696 0.850537 1.11612 0.616116C1.35054 0.381696 1.66848 0.25 2 0.25ZM8.25 15.25V20.25H15.75V15.25H8.25Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </nav>  
                        </div>
                        <div className="main_win">
                          <table className="table-border">
                            <thead className="table_title">
                              <th className="order_title">№</th>
                              <th className="name_title">Имя</th>
                              <th className="type_title">Тип</th>
                              <th className="className_title">Значение</th>
                            </thead>
                            <tbody>
                              <tr> 
                                <td className="order">
                                  <p className="order_text">1</p>
                                </td>
                                <td className="name">
                                  <label htmlFor="" className="name_lable">
                                    <span className="hidden">Имя</span>
                                    <input type="text" className="name_text" />
                                  </label>
                                </td>
                                <td className="type">
                                  <select name="type" className="type_select">
                                    <option value="1">Тип 1</option>
                                  </select>
                                </td>
                                <td className="className">
                                  <label htmlFor="" className="className_lable">
                                    <span className="hidden">Значение</span>
                                    <input type="text" className="className_text" />
                                  </label>
                                </td>
                              </tr>                                      
                            </tbody>
                          </table>
                        </div>
                        <div className="article_container_active">
                          <div className="nav_side_button">
                            <a className="expand_link" href="#">
                              <span className="hidden">Развернуть</span>
                              <svg className="expand_img" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5407 0L5.54083 5.32338L10.5407 10.6468L11.8467 9.25628L8.1528 5.32338L11.8467 1.39049L10.5407 0ZM4.99987 0L0 5.32338L4.99987 10.6468L6.30585 9.25628L2.61197 5.32338L6.30585 1.39049L4.99987 0Z" fill="#959595"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className="article_container_side">
                          <div className="nav_side_button">
                            <a className="roll_up_link" href="#">
                              <span className="hidden">Свернуть</span>
                              <svg className="roll_up_img" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.30602 0L6.30602 5L1.30602 10L0 8.69398L3.69398 5L0 1.30602L1.30602 0ZM6.84699 0L11.847 5L6.84699 10L5.54097 8.69398L9.23495 5L5.54097 1.30602L6.84699 0Z" fill="#959595"/>
                              </svg>                            
                            </a>
                          </div>
                          <nav className="nav_side">
                            <ul className="nav_list_side">
                              <li className="nav_item_side">
                                <a className="nav_link_side" href="#">Класс 1</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="menu_item">
                <label htmlFor="popupCheckboxTwo" className="popup-shower">
                  <span className="hidden">Методы</span>
                  <svg className="methods_img" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0C10.19 0 10.75 0.56 10.75 1.25V6.25C10.75 6.94 10.19 7.5 9.5 7.5H7V10H13.25V8.75C13.25 8.06 13.81 7.5 14.5 7.5H22C22.69 7.5 23.25 8.06 23.25 8.75V13.75C23.25 14.44 22.69 15 22 15H14.5C13.81 15 13.25 14.44 13.25 13.75V12.5H7V20H13.25V18.75C13.25 18.06 13.81 17.5 14.5 17.5H22C22.69 17.5 23.25 18.06 23.25 18.75V23.75C23.25 24.44 22.69 25 22 25H14.5C13.81 25 13.25 24.44 13.25 23.75V22.5H5.75C5.06 22.5 4.5 21.94 4.5 21.25V7.5H2C1.31 7.5 0.75 6.94 0.75 6.25V1.25C0.75 0.56 1.31 0 2 0H9.5ZM20.75 20H15.75V22.5H20.75V20ZM20.75 10H15.75V12.5H20.75V10ZM8.25 2.5H3.25V5H8.25V2.5Z" fill="#959595"/>
                  </svg>
                </label>
                <div className="popup-wrapper">
                  <input type="checkbox" className="popup-checkbox" id="popupCheckboxTwo"/>
                  <div className="popup">
                    <div className="popup-content three">    
                      <div className="popup-wrapper_win">
                        <div className="header_container_win">
                          <nav className="nav_main">
                            <ul className="nav_list">
                              <li className="nav_item">
                                <label htmlFor="popupCheckboxTwo" className="popup-closer">
                                  <span className="hidden">Выйти</span>
                                  <svg className="go_out_img" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.735 20L0 10L11.735 0V6.25C18.2162 6.25 23.47 11.8463 23.47 18.75C23.47 19.0912 23.4583 19.4287 23.4324 19.7625C21.7156 16.295 18.3512 13.8988 14.4493 13.7563L14.082 13.75H11.735V20ZM9.388 11.25H14.1219L14.5291 11.2587C16.0371 11.3125 17.491 11.6462 18.8429 12.2162C17.1214 10.0938 14.5749 8.75 11.735 8.75H9.388V5.20125L3.75755 10L9.388 14.7987V11.25Z" fill="#959595"/>
                                  </svg>
                                </label>
                              </li>
                              <li className="nav_item">
                                <a className="add_link" href="#">
                                  <span className="hidden">Добавить</span>
                                  <svg className="add_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.75684 9V5H11.7568V9H15.7568V11H11.7568V15H9.75684V11H5.75684V9H9.75684ZM10.7568 20C5.23384 20 0.756836 15.523 0.756836 10C0.756836 4.477 5.23384 0 10.7568 0C16.2798 0 20.7568 4.477 20.7568 10C20.7568 15.523 16.2798 20 10.7568 20ZM10.7568 18C12.8786 18 14.9134 17.1571 16.4137 15.6569C17.914 14.1566 18.7568 12.1217 18.7568 10C18.7568 7.87827 17.914 5.84344 16.4137 4.34315C14.9134 2.84285 12.8786 2 10.7568 2C8.6351 2 6.60027 2.84285 5.09998 4.34315C3.59969 5.84344 2.75684 7.87827 2.75684 10C2.75684 12.1217 3.59969 14.1566 5.09998 15.6569C6.60027 17.1571 8.6351 18 10.7568 18Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="delete_link" href="#">
                                  <span className="hidden">Удалить</span>
                                  <svg className="delete_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6035 4H20.6035V6H18.6035V19C18.6035 19.2652 18.4982 19.5196 18.3106 19.7071C18.1231 19.8946 17.8687 20 17.6035 20H3.60352C3.3383 20 3.08395 19.8946 2.89641 19.7071C2.70887 19.5196 2.60352 19.2652 2.60352 19V6H0.603516V4H5.60352V1C5.60352 0.734784 5.70887 0.48043 5.89641 0.292893C6.08395 0.105357 6.3383 0 6.60352 0H14.6035C14.8687 0 15.1231 0.105357 15.3106 0.292893C15.4982 0.48043 15.6035 0.734784 15.6035 1V4ZM16.6035 6H4.60352V18H16.6035V6ZM12.0175 12L13.7855 13.768L12.3715 15.182L10.6035 13.414L8.83552 15.182L7.42152 13.768L9.18952 12L7.42152 10.232L8.83552 8.818L10.6035 10.586L12.3715 8.818L13.7855 10.232L12.0175 12ZM7.60352 2V4H13.6035V2H7.60352Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="save_link" href="#">
                                  <span className="hidden">Сохранить</span>
                                  <svg className="save_img" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.75 20.25V12.75H18.25V20.25H20.75V6.285L17.215 2.75H3.25V20.25H5.75ZM2 0.25H18.25L23.25 5.25V21.5C23.25 21.8315 23.1183 22.1495 22.8839 22.3839C22.6495 22.6183 22.3315 22.75 22 22.75H2C1.66848 22.75 1.35054 22.6183 1.11612 22.3839C0.881696 22.1495 0.75 21.8315 0.75 21.5V1.5C0.75 1.16848 0.881696 0.850537 1.11612 0.616116C1.35054 0.381696 1.66848 0.25 2 0.25ZM8.25 15.25V20.25H15.75V15.25H8.25Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                        <div className="main_win">
                          <div className="main_container_win">
                            <div className="name">
                              <h2 className="name_title">
                                Название:
                              </h2>
                              {/* <htmlForm action="" className="name_htmlForm">
                                <label className="name_lable">
                                  <span className="hidden">Название</span>
                                  <input type="text" className="name_text dop" placeholder="Введите название" />
                                </label>                          
                              </htmlForm> */}
                            </div>    
                            <div className="type_method">
                              <h2 className="type_method_title">
                                Тип метода:
                              </h2>
                              <select name="type_method" className="type_method_select">
                                <option value="1">Поле</option>
                                <option value="2">Расчет</option>
                              </select>
                            </div> 
                            <div className="fields">
                              <h2 className="fields_title">
                                Поле(я):
                              </h2>
                              {/* <htmlForm action="" method="post" className="fields_htmlForm">
                                <span className="hidden">Поля</span>
                                <label className="fields_lable">
                                  <input type="checkbox" className="fields_input" />
                                  Поле 1
                                </label>
                              </htmlForm> */}
                            </div>
                            <div className="function">
                              <h2 className="function_title">
                                Функция:
                              </h2>
                              {/* <htmlForm action="" className="function_htmlForm">
                                <label className="function_lable">
                                  <span className="hidden">Функция</span>
                                  <input type="text" className="function_text" placeholder="Введите запрос" />
                                </label>
                              </htmlForm> */}
                            </div>
                            <div className="add_className">
                              {/* <htmlForm action="">
                                <span className="hidden">Добавить</span>          
                                <button className="button_add">Добавить</button>
                              </htmlForm> */}
                            </div>
                          </div>
                          <div className="article_container_active">
                            <div className="nav_side_button">
                              <a className="expand_link" href="#">
                                <span className="hidden">Развернуть</span>
                                <svg className="expand_img" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M10.5407 0L5.54083 5.32338L10.5407 10.6468L11.8467 9.25628L8.1528 5.32338L11.8467 1.39049L10.5407 0ZM4.99987 0L0 5.32338L4.99987 10.6468L6.30585 9.25628L2.61197 5.32338L6.30585 1.39049L4.99987 0Z" fill="#959595"/>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div className="article_container_side">
                            <div className="nav_side_button">
                              <a className="roll_up_link" href="#">
                                <span className="hidden">Свернуть</span>
                                <svg className="roll_up_img" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M1.30602 0L6.30602 5L1.30602 10L0 8.69398L3.69398 5L0 1.30602L1.30602 0ZM6.84699 0L11.847 5L6.84699 10L5.54097 8.69398L9.23495 5L5.54097 1.30602L6.84699 0Z" fill="#959595"/>
                                </svg>                            
                              </a>
                            </div>
                            <nav className="nav_side">
                              <ul className="nav_list_side">
                                <li className="nav_item_side">
                                  <a className="nav_link_side" href="#">Метод 1</a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>             
              </li>
              <li className="menu_item">
                <label htmlFor="popupCheckboxThree" className="popup-shower">
                  <span className="hidden">Экземпляры классов</span>
                  <svg className="instances_img" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 23.541V25.956C7.50019 26.0749 7.46649 26.1913 7.40283 26.2917C7.33918 26.3921 7.24822 26.4723 7.14063 26.5228C7.03303 26.5733 6.91326 26.5921 6.79536 26.5769C6.67747 26.5618 6.56633 26.5133 6.475 26.4373L1.325 22.146C1.22622 22.0636 1.15526 21.9528 1.1218 21.8286C1.08834 21.7044 1.094 21.573 1.13802 21.4521C1.18204 21.3313 1.26227 21.2269 1.36777 21.1534C1.47326 21.0798 1.59889 21.0406 1.7275 21.041H20C20.663 21.041 21.2989 20.7776 21.7678 20.3088C22.2366 19.8399 22.5 19.2041 22.5 18.541V8.54102H25V18.541C25 19.8671 24.4732 21.1389 23.5355 22.0765C22.5979 23.0142 21.3261 23.541 20 23.541H7.5ZM17.5 3.54102V1.12602C17.4998 1.00715 17.5335 0.890696 17.5972 0.79031C17.6608 0.689925 17.7518 0.609772 17.8594 0.559254C17.967 0.508737 18.0867 0.489949 18.2046 0.505095C18.3225 0.520241 18.4337 0.568693 18.525 0.644767L23.675 4.93602C23.7737 5.01832 23.8446 5.12904 23.8781 5.25311C23.9116 5.37717 23.9061 5.50855 23.8622 5.62934C23.8183 5.75013 23.7383 5.85447 23.633 5.92813C23.5277 6.0018 23.4023 6.04122 23.2738 6.04102H5C4.33696 6.04102 3.70107 6.30441 3.23223 6.77325C2.76339 7.24209 2.5 7.87798 2.5 8.54102V18.541H0V8.54102C0 7.21493 0.526784 5.94316 1.46447 5.00548C2.40215 4.0678 3.67392 3.54102 5 3.54102H17.5Z" fill="#959595"/>
                  </svg>
                </label>
                <div className="popup-wrapper">
                  <input type="checkbox" className="popup-checkbox" id="popupCheckboxThree" />
                  <div className="popup">
                    <div className="popup-content two"> 
                      <div className="popup-wrapper_win">
                        <div className="header_container_win">
                          <nav className="nav_main">
                            <ul className="nav_list">
                              <li className="nav_item">
                                <label htmlFor="popupCheckboxThree" className="popup-closer">
                                  <span className="hidden">Выйти</span>
                                  <svg className="go_out_img" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.735 20L0 10L11.735 0V6.25C18.2162 6.25 23.47 11.8463 23.47 18.75C23.47 19.0912 23.4583 19.4287 23.4324 19.7625C21.7156 16.295 18.3512 13.8988 14.4493 13.7563L14.082 13.75H11.735V20ZM9.388 11.25H14.1219L14.5291 11.2587C16.0371 11.3125 17.491 11.6462 18.8429 12.2162C17.1214 10.0938 14.5749 8.75 11.735 8.75H9.388V5.20125L3.75755 10L9.388 14.7987V11.25Z" fill="#959595"/>
                                  </svg>
                                </label>
                              </li>
                              <li className="nav_item">
                                <a className="add_link" href="#">
                                  <span className="hidden">Добавить</span>
                                  <svg className="add_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.75684 9V5H11.7568V9H15.7568V11H11.7568V15H9.75684V11H5.75684V9H9.75684ZM10.7568 20C5.23384 20 0.756836 15.523 0.756836 10C0.756836 4.477 5.23384 0 10.7568 0C16.2798 0 20.7568 4.477 20.7568 10C20.7568 15.523 16.2798 20 10.7568 20ZM10.7568 18C12.8786 18 14.9134 17.1571 16.4137 15.6569C17.914 14.1566 18.7568 12.1217 18.7568 10C18.7568 7.87827 17.914 5.84344 16.4137 4.34315C14.9134 2.84285 12.8786 2 10.7568 2C8.6351 2 6.60027 2.84285 5.09998 4.34315C3.59969 5.84344 2.75684 7.87827 2.75684 10C2.75684 12.1217 3.59969 14.1566 5.09998 15.6569C6.60027 17.1571 8.6351 18 10.7568 18Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="delete_link" href="#">
                                  <span className="hidden">Удалить</span>
                                  <svg className="delete_img" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6035 4H20.6035V6H18.6035V19C18.6035 19.2652 18.4982 19.5196 18.3106 19.7071C18.1231 19.8946 17.8687 20 17.6035 20H3.60352C3.3383 20 3.08395 19.8946 2.89641 19.7071C2.70887 19.5196 2.60352 19.2652 2.60352 19V6H0.603516V4H5.60352V1C5.60352 0.734784 5.70887 0.48043 5.89641 0.292893C6.08395 0.105357 6.3383 0 6.60352 0H14.6035C14.8687 0 15.1231 0.105357 15.3106 0.292893C15.4982 0.48043 15.6035 0.734784 15.6035 1V4ZM16.6035 6H4.60352V18H16.6035V6ZM12.0175 12L13.7855 13.768L12.3715 15.182L10.6035 13.414L8.83552 15.182L7.42152 13.768L9.18952 12L7.42152 10.232L8.83552 8.818L10.6035 10.586L12.3715 8.818L13.7855 10.232L12.0175 12ZM7.60352 2V4H13.6035V2H7.60352Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                              <li className="nav_item">
                                <a className="save_link" href="#">
                                  <span className="hidden">Сохранить</span>
                                  <svg className="save_img" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.75 20.25V12.75H18.25V20.25H20.75V6.285L17.215 2.75H3.25V20.25H5.75ZM2 0.25H18.25L23.25 5.25V21.5C23.25 21.8315 23.1183 22.1495 22.8839 22.3839C22.6495 22.6183 22.3315 22.75 22 22.75H2C1.66848 22.75 1.35054 22.6183 1.11612 22.3839C0.881696 22.1495 0.75 21.8315 0.75 21.5V1.5C0.75 1.16848 0.881696 0.850537 1.11612 0.616116C1.35054 0.381696 1.66848 0.25 2 0.25ZM8.25 15.25V20.25H15.75V15.25H8.25Z" fill="#959595"/>
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </nav>  
                        </div>
                        <div className="main_win">
                          <table className="table-border">
                            <thead className="table_title">
                              <th className="order_title">№</th>
                              <th className="name_title">Название</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="order">
                                  <p className="order_text">1</p>
                                </td>
                                <td className="date">
                                  <label htmlFor="" className="date_lable">
                                    <input type="text" className="date_text" />
                                  </label>
                                </td>   
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="article_container_active">
                          <div className="nav_side_button">
                            <a className="expand_link" href="#">
                              <span className="hidden">Развернуть</span>
                              <svg className="expand_img" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5407 0L5.54083 5.32338L10.5407 10.6468L11.8467 9.25628L8.1528 5.32338L11.8467 1.39049L10.5407 0ZM4.99987 0L0 5.32338L4.99987 10.6468L6.30585 9.25628L2.61197 5.32338L6.30585 1.39049L4.99987 0Z" fill="#959595"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className="article_container_side">
                          <div className="nav_side_button">
                            <a className="roll_up_link" href="#">
                              <span className="hidden">Свернуть</span>
                              <svg className="roll_up_img" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.30602 0L6.30602 5L1.30602 10L0 8.69398L3.69398 5L0 1.30602L1.30602 0ZM6.84699 0L11.847 5L6.84699 10L5.54097 8.69398L9.23495 5L5.54097 1.30602L6.84699 0Z" fill="#959595"/>
                              </svg>                            
                            </a>
                          </div>
                          <nav className="nav_side">
                            <ul className="nav_list_side">
                              <li className="nav_item_side">
                                <a className="nav_link_side" href="#">Класс 1</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>               
                </div>
              </li>
              <li className="menu_item">
                <a className="search" href="#" title="Поиск решений">
                  <span className="hidden">Поиск решений</span>
                  <svg className="search_img" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.25 0.5H23.75C24.0815 0.5 24.3995 0.631696 24.6339 0.866116C24.8683 1.10054 25 1.41848 25 1.75V21.75C25 22.0815 24.8683 22.3995 24.6339 22.6339C24.3995 22.8683 24.0815 23 23.75 23H1.25C0.91848 23 0.600537 22.8683 0.366117 22.6339C0.131696 22.3995 0 22.0815 0 21.75V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.91848 0.5 1.25 0.5ZM2.5 3V20.5H22.5V3H2.5ZM6.25 13H8.75V18H6.25V13ZM11.25 5.5H13.75V18H11.25V5.5ZM16.25 9.25H18.75V18H16.25V9.25Z" fill="#959595"/>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          <div className="popup-wrapper">
            <input type="checkbox" className="popup-checkbox" id="popupCheckbox" />
            <div className="popup">
              <div className="popup-content one">      
                <div className="popup-wrapper_win">
                  <h2 className="title_win">Мои проекты</h2>
                  <div className="project_container">
                    <h3 className="project_name">Имя проекта 1</h3>
                    <div className="del_img">
                      <label htmlFor="popupCheckboxDelete" className="popup-shower">
                        <svg className="delete_img_2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.6035 4H20.6035V6H18.6035V19C18.6035 19.2652 18.4982 19.5196 18.3106 19.7071C18.1231 19.8946 17.8687 20 17.6035 20H3.60352C3.3383 20 3.08395 19.8946 2.89641 19.7071C2.70887 19.5196 2.60352 19.2652 2.60352 19V6H0.603516V4H5.60352V1C5.60352 0.734784 5.70887 0.48043 5.89641 0.292893C6.08395 0.105357 6.3383 0 6.60352 0H14.6035C14.8687 0 15.1231 0.105357 15.3106 0.292893C15.4982 0.48043 15.6035 0.734784 15.6035 1V4ZM16.6035 6H4.60352V18H16.6035V6ZM12.0175 12L13.7855 13.768L12.3715 15.182L10.6035 13.414L8.83552 15.182L7.42152 13.768L9.18952 12L7.42152 10.232L8.83552 8.818L10.6035 10.586L12.3715 8.818L13.7855 10.232L12.0175 12ZM7.60352 2V4H13.6035V2H7.60352Z" fill="#959595"/>
                        </svg>
                      </label>        
                    </div>
                  </div>              
                  <div className="buttons">
                    <label htmlFor="popupCheckboxSave" className="popup-shower">
                      <div className="button_add_two">
                        <p className="button_text_1">Добавить</p>
                      </div>
                    </label>      
                    <label htmlFor="popupCheckbox" className="popup-closer_two">
                      <div className="button_close">
                        <p className="button_text_2">Закрыть</p>
                      </div>
                    </label>                                     
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-wrapper">
            <input type="checkbox" className="popup-checkbox" id="popupCheckboxSave" />
            <div className="popup">
              <div className="popup-content six">      
                <div className="popup-wrapper_win">
                  <h2 className="title_win">Введите имя проекта</h2>
                  {/* <htmlForm action="" className="name_htmlForm">
                    <label className="name_lable">
                      <span className="hidden">Название</span>
                      <input type="text" className="name_text dop" placeholder="Введите название" />
                    </label>                          
                  </htmlForm> */}
                  <div className="buttons">  
                    {/* <htmlForm action="">
                      <span className="hidden"></span>        
                      <button className="button_save">Сохранить</button>
                    </htmlForm>                                      */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-wrapper">
            <input type="checkbox" className="popup-checkbox" id="popupCheckboxDelete" />
            <div className="popup">
              <div className="popup-content five">      
                <div className="popup-wrapper_win">
                  <h2 className="title_win">Безвозвратно удалить проект "Имя проекта"?</h2>
                  <div className="buttons">
                    {/* <htmlForm action="">
                      <span className="hidden">Да</span>          
                      <button className="button_yes">Да</button>
                    </htmlForm>      */}
                      {/* <htmlForm action="">
                        <span className="hidden">Нет</span>        
                        <button className="button_no">Нет</button>
                      </htmlForm>                                      */}
                  </div>
                </div>
              </div>
            </div>
          </div>      
          <div className="addendum">
            <p className="addendum_text">+</p>
          </div>
        </div>
        <article className="article">
          <div className="article_container">
            <div className="model_structure">
              <svg className="model_structur_img" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.25 16.875H22V12.4219C22 12.293 21.8875 12.1875 21.75 12.1875H14V9.375H17.375C17.65 9.375 17.875 9.16406 17.875 8.90625V0.46875C17.875 0.210938 17.65 0 17.375 0H8.375C8.1 0 7.875 0.210938 7.875 0.46875V8.90625C7.875 9.16406 8.1 9.375 8.375 9.375H11.75V12.1875H4C3.8625 12.1875 3.75 12.293 3.75 12.4219V16.875H0.5C0.225 16.875 0 17.0859 0 17.3438V25.7812C0 26.0391 0.225 26.25 0.5 26.25H9.5C9.775 26.25 10 26.0391 10 25.7812V17.3438C10 17.0859 9.775 16.875 9.5 16.875H6V14.2969H19.75V16.875H16.25C15.975 16.875 15.75 17.0859 15.75 17.3438V25.7812C15.75 26.0391 15.975 26.25 16.25 26.25H25.25C25.525 26.25 25.75 26.0391 25.75 25.7812V17.3438C25.75 17.0859 25.525 16.875 25.25 16.875ZM7.625 19.1016V24.0234H2.375V19.1016H7.625ZM10.25 7.14844V2.22656H15.5V7.14844H10.25ZM23.375 24.0234H18.125V19.1016H23.375V24.0234Z" fill="#959595"/>
              </svg>
              <h2 className="model_structure_title">
                Структура модели:
              </h2>
            </div>
          </div>
        </article>
      </main>
      </React.Fragment>);
}