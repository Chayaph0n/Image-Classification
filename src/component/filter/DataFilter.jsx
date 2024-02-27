import { useContext } from "react";
import { TableContext } from "../../App";

const DataFilter = ({ title, ref_value }) => {

    const { cosaLotID, setCOSALotID, sliderLotID, setSliderLotID, serialID, setSerialID, station, setStation, failType, setFailType } = useContext(TableContext);

    const handleDataChange = (event) => {
        if (title === 'COSALotID') {
            setCOSALotID(event.target.value);
            console.log('cosaLotID: ',cosaLotID);
        } else if (title === 'SliderLotID') {
            setSliderLotID(event.target.value);
            console.log('sliderLotID: ',sliderLotID);
        } else if (title === 'SerialID') {
            setSerialID(event.target.value);
            console.log('serialID: ',serialID);
        } else if (title === 'Station') {
            setStation(event.target.value);
            console.log('station: ',station);
        } else if (title === 'Failure Type') {
            setFailType(event.target.value);
            console.log('Failure Type: ',failType);
        } 
    }
    
    return (
        <div>
            <p className="text-white font-bold text-sm">{title}</p>
            <input className="w-full h-10 bg-lightdark rounded-xl flex items-center mt-2 p-5 text-white text-sm" 
                    type="text" 
                    ref={ref_value}
                    placeholder={`Search ${title}`} 
                    onChange={handleDataChange} />
        </div>
    )
}

export default DataFilter;