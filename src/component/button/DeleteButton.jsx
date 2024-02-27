
const DeleteButton = ({ onClick }) => {

    return (
        <span className="material-symbols-outlined text-4xl text-red font-black cursor-pointer"
            onClick={onClick}>close</span>
    )
}

export default DeleteButton;