
const SaveButton = ({ rowIndex, inputValue, setInputValue, updateCellData }) => {

    const handleSave = () => {
        updateCellData(rowIndex, 15, inputValue);
        console.log(inputValue)
        setInputValue('');
    };

    return(
        <button
            className='w-14 h-14 bg-graycustom flex justify-center items-center rounded-xl p-5 
                text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group'
                onClick={handleSave}>
            <span className="material-symbols-outlined text-4xl text-blue font-black">check</span>
        </button>
    )
}

export default SaveButton;