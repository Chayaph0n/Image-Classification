
const RejectButton = ({ onClick }) => {

    return(
        <button
            className='w-14 h-14 bg-graycustom flex justify-center items-center rounded-xl p-5 
                text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group'
                onClick={onClick}>
            <span className="material-symbols-outlined text-4xl text-red font-black">close</span>
        </button>
    )
}

export default RejectButton;