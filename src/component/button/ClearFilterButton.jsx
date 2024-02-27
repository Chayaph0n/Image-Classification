import { useContext } from "react";
import { TableContext } from "../../App";

const ClearFilterButton = ({ startDateRef, endDateRef, cosaLotIDRef, sliderLotIDRef, serialIDRef, stationRef, typeRef }) => {

    const { setStartDate, setEndDate, setCOSALotID, setSliderLotID, setSerialID, setStation, setFailType, setCriterial } = useContext(TableContext);

    const clearRef = () => {
        if (startDateRef.current) startDateRef.current.value = '';
        if (endDateRef.current) endDateRef.current.value = '';
        if (cosaLotIDRef.current) cosaLotIDRef.current.value = '';
        if (sliderLotIDRef.current) sliderLotIDRef.current.value = '';
        if (serialIDRef.current) serialIDRef.current.value = '';
        if (stationRef.current) stationRef.current.value = '';
        if (typeRef.current) typeRef.current.value = '';
    }

    const clearFilter = () => {
        setStartDate(''); 
        setEndDate(''); 
        setCOSALotID('');  
        setSliderLotID('');  
        setSerialID('');  
        setStation(''); 
        setFailType('');
        setCriterial('');
        clearRef();
    }

    return (
        <span className="w-1/8 h-10 bg-lightdark rounded-xl flex items-center mt-2 p-5 text-white text-sm cursor-pointer
                        font-bold hover:bg-white hover:text-dark transition-colors duration-300"
                        onClick={clearFilter}>CLEAR</span>
    )
}

export default ClearFilterButton;