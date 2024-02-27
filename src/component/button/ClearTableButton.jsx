
const ClearTableButton = ({ setIsPress }) => {

    return(
        <button
            className='w-auto h-16 bg-graycustom flex justify-center items-center gap-2 mt-5 rounded-xl p-5 
                text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group'
                onClick={() => setIsPress(false)}>
            <span className="material-symbols-outlined text-4xl font-black">close</span>
        </button>
    )
}

export default ClearTableButton;