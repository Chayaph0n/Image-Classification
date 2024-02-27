
const InputType = ({ inputValue, setInputValue }) => {

    const handleInputChange = (e) => {
        setInputValue(e.target.value.slice(0,2));
    };

    return (
        <input className="w-14 h-14 bg-graycustom flex justify-center items-center rounded-xl p-5 
                text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group"
            maxLength={2}
            type="text" 
            value={inputValue}
            onChange={handleInputChange}
        />
    )
}

export default InputType;