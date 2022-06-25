const fetchData = (nameField) => {  
    const data = JSON.parse(localStorage.getItem(nameField))
    return data ? data : []
}

const saveData = (data, nameField) => {
    localStorage.setItem(nameField, JSON.stringify(data))
}

const calculateTotal = (data) => {
    let weekly_total = 0;
    let bi_weekly_total = 0;
    let monthly_total = 0;
    let yearly_total = 0;

    for (const item of data) {
        weekly_total += item.weekly
        bi_weekly_total += item.bi_weekly
        monthly_total += item.monthly
        yearly_total += item.yearly
    }

    return {weekly_total, bi_weekly_total, monthly_total, yearly_total}
}

export {fetchData, saveData, calculateTotal};