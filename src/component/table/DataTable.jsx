import { useContext, useEffect, useState } from "react";
import { TableContext } from "../../App";
import FetchData from "../../API/FetchData";
import PopupImage from "../../subcomponent/minicomponent/PopupImage";

const DataTable = () => {

    const { data, setData, cosaLotID, sliderLotID, serialID, station, startDate, endDate, failType, criterial } = useContext(TableContext);
    const [isPopupImage, setIsPopupImage] = useState(false);

    const handleImageClick = (src) => {
        setIsPopupImage(src); 
    };
    
    useEffect(()=> {
        FetchData({cosaLotID, sliderLotID, serialID, station, startDate, endDate, setData, failType, criterial});
    }, [data, setData, cosaLotID, sliderLotID, serialID, station, startDate, endDate, failType, criterial])

    return (
        <div className='w-full max-h-96 overflow-x-auto overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-purple 
                            scrollbar-thumb-rounded-full scrollbar-track-dark scrollbar-track-rounded-full mt-5 rounded-xl'>
            <PopupImage isPopupImage={isPopupImage} setIsPopupImage={setIsPopupImage} />
            <table className='w-full text-sm text-center rtl:text-right text-white dark:text-gray-400'>
                <thead className="text-xs text-center text-white uppercase bg-lightdark sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">COSALotID</th>
                        <th scope="col" className="px-6 py-3">SliderLotID</th>
                        <th scope="col" className="px-6 py-3">SerialID</th>
                        <th scope="col" className="px-6 py-3">Station</th>
                        <th scope="col" className="px-6 py-3">Laser_ST</th>
                        <th scope="col" className="px-6 py-3">Laser_P</th>
                        <th scope="col" className="px-6 py-3">Laser_BT</th>
                        <th scope="col" className="px-6 py-3">Laser_TM</th>
                        <th scope="col" className="px-6 py-3">Build_Type</th>
                        <th scope="col" className="px-6 py-3">ISAType</th>
                        <th scope="col" className="px-6 py-3">Build_Date</th>
                        <th scope="col" className="px-6 py-3">Slider</th>
                        <th scope="col" className="px-6 py-3">COSAs</th>
                        <th scope="col" className="px-6 py-3">Shear Test</th>
                        <th scope="col" className="px-6 py-3">Criterial</th>
                        <th scope="col" className="px-6 py-3">Failure type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr className="bg-graycustom border-b hover:bg-middark" key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className="w-4 p-4" key={cellIndex}>
                                    {cellIndex === 11 || cellIndex === 12 ? (
                                        <img src={cell} 
                                        alt={`Image ${cellIndex}`} 
                                        className="w-full h-full rounded-md cursor-zoom-in" 
                                        onClick={() => handleImageClick(cell)} />
                                    ) : (
                                        cell
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;