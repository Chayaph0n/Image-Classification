import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';
import RejectButton from '../button/RejectButton';
import SaveButton from '../button/SaveButton';
import InputType from '../Input/InputType';
import PopupImage from '../../subcomponent/minicomponent/PopupImage';

const MergeTable = () => {
    const { matchedData , setMatchedData } = useContext(DataContext);
    const [inputValues, setInputValues] = useState(Array(matchedData.length).fill(''));
    const [isPopupImage, setIsPopupImage] = useState(false);

    const handleReject = (rowIndex) => {
        const updatedData = [...matchedData];
        updatedData.splice(rowIndex, 1);
        setMatchedData(updatedData);
        const updatedInputValues = [...inputValues];
        updatedInputValues.splice(rowIndex, 1);
        setInputValues(updatedInputValues);
    };

    const updateCellData = (rowIndex, cellIndex, newValue) => {
        const updatedData = matchedData.map((row, index) => {
            if (index === rowIndex) {
                return row.map((cell, i) => (i === cellIndex ? newValue : cell));
            }
            return row;
        });
        setMatchedData(updatedData);
        console.log(updatedData)
    };

    const handleInputChange = (rowIndex, value) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[rowIndex] = value.slice(0, 2); // Update specific row's input value
        setInputValues(updatedInputValues);
    };

    const handleImageClick = (src) => {
        setIsPopupImage(src); 
    };

    return (
        <div className='w-full h-auto max-h-[400px] rounded-2xl px-14 py-7 bg-graycustom mt-5'>
            <h1 className='text-white text-xl font-extrabold'>Merged</h1>
            <div className='w-full max-h-72 overflow-x-auto overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-purple 
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
                            <th scope="col" className="px-6 py-3">Edit type</th>
                            <th scope="col" className="px-6 py-3">Save</th>
                            <th scope="col" className="px-6 py-3">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchedData.map((row, rowIndex) => (
                            <tr className="bg-dark border-b hover:bg-middark" key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td className="w-4 p-4" key={cellIndex}>
                                        {cellIndex === 11 || cellIndex === 12 ? (
                                            <img 
                                                src={cell} 
                                                alt={`Image ${cellIndex}`} 
                                                className="w-full h-full rounded-md cursor-zoom-in"
                                                onClick={() => handleImageClick(cell)} />
                                        ) : cellIndex === 16 ? (
                                            <InputType
                                                inputValue={inputValues[rowIndex]} 
                                                setInputValue={(value) => handleInputChange(rowIndex, value)}
                                            />
                                        ) : cellIndex === 17 ? (
                                            <SaveButton 
                                                rowIndex={rowIndex}
                                                inputValue={inputValues[rowIndex]}
                                                setInputValue={setInputValues}
                                                updateCellData={updateCellData}
                                            />
                                        ) : cellIndex === 18 ? (
                                            <RejectButton onClick={() => handleReject(rowIndex)}/>
                                        ) : (cell)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MergeTable;
