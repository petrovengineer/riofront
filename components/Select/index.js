import React, { useState } from 'react';
import styles from './Select.module.css';
import arrow from '../../imgs/svg/next.svg';
// import arrow from '../imgs/svg/next.svg';

export const SelectWrapper = ({options, multi, selected=multi?[]:null, setSelected, full, param})=>{
    const [select, showSelect] = useState(false);
    // useState(()=>{
    //     console.log(options)
    // },[])
    return (
        <div style={{display:'inline-block'}}>
            <div className={[styles.btn, select?styles['btn-selected']:styles['btn-hover']].join(' ')} 
                onClick={(e)=>{
                    if(e.target.id!=='btn-close'){showSelect(!select)};
                }}>
                {multi?<div className={styles["btn-text"]}>{selected.map((s,i)=>{
                    return <span className={styles["btn-item"]} key={'s'+i}>
                        {full.find(f=>f._id==s)[param]}
                        <span className={styles["btn-item-close"]} id="btn-close" onClick={()=>{
                            const newSelected = [...selected];
                            newSelected.splice(i,1);
                            setSelected(newSelected);
                        }}>x</span>
                    </span>
                })}{selected.length===0?'Выбрать':null}</div>
                :<div className={styles["btn-text"]}>{selected?options.find(o=>selected===o.value).label:'Выбрать'}</div>
                }
                <div className={styles["btn-right"]}>
                    <span className={styles["btn-separator"]}></span>
                        {/* <Arrow className="btn-arrow"/> */}
                        <img scr={arrow} className={styles["btn-arrow"]}/>
                </div>
            </div>
{/* ==========================ITEMS======================================================= */}
            {select?<div className={styles["items"]}>{
                multi?options.filter(o=>selected.indexOf(o.value)>-1).length!==options.length?
                        options.map((o, i)=>(selected.indexOf(o.value)===-1?
                            <div key={'k'+i} className={styles["item"]} 
                                onClick={()=>{setSelected([...selected, o.value]);}}>
                                {o.label}
                            </div>
                        :null))
                    :<div className={styles["item"]} style={{color:'gray'}}>Пусто</div>
                :options.length!=0?options.map((o, i)=>(
                    o.value!==selected?
                        <div key={'k'+i} className={styles["item"]} onClick={()=>{showSelect(false); setSelected(o.value);}}>
                                {o.label}
                        </div>
                    :null
                )):<div className={styles["item"]} style={{color:'gray'}}>Пусто</div>
                }</div>
                :null
            }
            <div className={select?styles['bg']:''} onClick={()=>showSelect(false)}></div>
        </div>
    )
}

SelectWrapper.defaultProps = {
    // onChange: ()=>{console.log("HELLOW")}
}


export default SelectWrapper;