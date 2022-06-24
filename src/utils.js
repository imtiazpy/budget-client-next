const fetchData = (nameField) => {  
    const data = JSON.parse(localStorage.getItem(nameField))
    return data ? data : []
}

const saveData = (data, nameField) => {
    localStorage.setItem(nameField, JSON.stringify(data))
}

export {fetchData, saveData};