export const updateObj = (items, itemId, objName, newPropsObj) => {
    return items.map(u => {
        if (u[objName] === itemId) {
            return {...u, ...newPropsObj}
        }
        return u
    })
}