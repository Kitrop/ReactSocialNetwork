import styles from './Users.module.css'
import {useEffect, useState} from 'react'
import cn from 'classnames'


const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 15 }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;

    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage, portionSize])
    
    return <div>
        <button onClick={() => setPortionNumber(portionNumber = 1)}>First</button>
        { portionNumber > 1 && <button onClick={() =>  setPortionNumber(portionNumber - 1) }> PREV </button> }
        {pages
            .filter(p => p >= leftBorder && p <= rightBorder)
            .map((p) => {
                return <span className={ cn({[styles.selected]: currentPage === p}, styles.num) } key={p} onClick={(e) => onPageChanged(p) }>{p}</span>
            })}
        { portionCount > portionNumber && <button onClick={() =>  setPortionNumber(portionNumber + 1) }> NEXT </button> }
        <button onClick={() => setPortionNumber(portionCount)}>Last</button>
    </div>
}

export default Pagination