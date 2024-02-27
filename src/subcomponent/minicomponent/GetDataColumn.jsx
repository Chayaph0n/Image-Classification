
const GetDataColumn = (worksheet,column) => {
    const columnData = [];
    for (let i = 3; ; i++) { 
        const cellAddress = `${column}${i}`;
        const cell = worksheet[cellAddress];
        if (!cell || !cell.v) {
            break;
        }
        columnData.push(cell.v);
    }

    return columnData;
}

export default GetDataColumn;