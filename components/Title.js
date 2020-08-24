import React from 'react';

function Title(){
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <ul className="nav nav-tabs-x mt-2" id="myTab" role="tablist">
                <li className="nav-item-x" role="presentation">
                    <a className="nav-link-x active" id="home-tab" data-toggle="tab"
                     href="#home" role="tab" aria-controls="home" aria-selected="true">Вход</a>
                </li>
                <li className="nav-item-x" role="presentation">
                    <a className="nav-link-x" id="profile-tab" data-toggle="tab" 
                    href="#profile" role="tab" aria-controls="profile" aria-selected="false">Регистрация</a>
                </li>
            </ul>
            <style jsx>
                {
                    `
                        .active{
                            background: #1964B0;
                            color: white;
                        }
                        .nav-link-x{
                            text-decoration: none;
                            padding: 10px;
                            border-radius: 5px;
                        }
                    `
                }
            </style>
        </div>
    )
}

export default Title;