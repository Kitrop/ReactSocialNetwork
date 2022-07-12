import ums from './Users.module.css'

const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 15) {
            pages.push(i);
        }
    }
    return (
        <div className={ums.num_bar}>
            {pages.map(p => <span className={currentPage === p && ums.selected}
                                  onClick={(e) => {
                                        onPageChanged(p)}
                                  }> {p} </span>)}
        </div>
    )
}

export default Pagination