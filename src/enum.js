const enumHelper = {
    gender: [
        {value: 1, label: 'Male'},
        {value: 2, label: 'Female'},
        {value: 3, label: 'Other'},
    ]
};

const getEnumLabel = (arr, val) => {
    return arr.find(({value}) => value === val)?.label
}

const getEnumItem = (arr, val) => {
    return arr.find(({value}) => value === val);
};

export default enumHelper;
export { getEnumLabel, getEnumItem};