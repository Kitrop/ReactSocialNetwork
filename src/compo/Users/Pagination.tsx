import styles from './Users.module.css'
import {FC, useEffect, useState} from 'react'
import cn from 'classnames'
import {FilterType} from '../../redux/reducers/usersReducer'


// type props for component
type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    filter: FilterType
    onPageChanged: (currentPage: number, filter: FilterType) => void
    portionSize: number
}

const Pagination: FC<Props> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 15, filter}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;


    useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize])
    
    return <div>

        {/*First page*/}
        <button className={styles.btn_pagination} onClick={() => setPortionNumber(portionNumber = 1)}>First</button>
        {/*Prev button*/}
        { portionNumber > 1 && <button className={styles.btn_pagination} onClick={() =>  setPortionNumber(portionNumber - 1) }> PREV </button> }
        <span className={styles.pagination_span}>
        {pages
            .filter(p => p >= leftBorder && p <= rightBorder)
            .map((p) => {
                return <span className={cn({[styles.selected]: currentPage === p}, styles.num)} key={p}
                             onClick={ () => onPageChanged(p, filter) }> {p} </span> })
        }
            </span>
        {/*Next button*/}
        { portionCount > portionNumber && <button className={styles.btn_pagination} onClick={() =>  setPortionNumber(portionNumber + 1) }> NEXT </button> }
    </div>
}

export default Pagination