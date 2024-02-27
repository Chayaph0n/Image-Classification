import { useState, useContext } from "react";
import { DataContext } from "../../App";
import SendMatchedData from "../../API/SendMatchedData";
import MakeSureAlert from "../../subcomponent/alert/MakeSureAlert";
import SuccessAlert from "../../subcomponent/alert/SuccessAlert";

const SubmitButton = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { matchedData, formData, allData, setUploadedImage, setUploadedExel, setAllData, setMatchedData, setUploaded, setFormData, setIsPress } = useContext(DataContext);

    const handleClick = () => {
        const amountData = allData.SerialID.length;

        MakeSureAlert().then((result) => {
            if (result.isConfirmed) {
                SendMatchedData(matchedData, formData, amountData);
                SuccessAlert();
                setUploadedImage([]) 
                setUploadedExel([])
                setAllData([])
                setMatchedData([]) 
                setUploaded(new Set()) 
                setFormData(new FormData())
                setIsPress(false)
            }
        });
    }

    return(
        <button
            className='w-auto h-16 bg-graycustom flex justify-center items-center gap-2 mt-5 rounded-xl p-5 
        text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group'
            onMouseMove={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleClick()}>
            <span className="material-symbols-outlined text-4xl font-black">upload</span>
            {isHovered && <p className='text-xl'>Submit</p>}
        </button>
    )
}

export default SubmitButton;
