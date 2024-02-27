
const PopupImage = ({ isPopupImage, setIsPopupImage }) => {

    const closePopup = () => {
        setIsPopupImage(null); 
    };

    return (
        <div>
            {isPopupImage && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 cursor-zoom-out"
                    onClick={closePopup}
                >
                    <div className="flex justify-center items-center">
                        <img
                            src={isPopupImage}
                            alt="Popup Image"
                            className="w-[900px] max-[900px] rounded-xl"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default PopupImage;