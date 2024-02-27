import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';

const MergeButton = ({ setIsPress }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { uploadedImage, allData, setMatchedData, predict } = useContext(DataContext);

    const matchData = () => {
        const newMatchedData = [];
        const folder_path = '/src/assets/Exel/';
    
        if (allData && Object.keys(allData).length > 0) {
            uploadedImage.forEach((image, index) => {
                const imageNames = image.name.split('_')[0];
                const parts = imageNames.split('_');
                const searchName = image.name.split('_')[1];
                const shear = image.name.split('_')[2];
                const type = image.name.split('_')[3];
    
                const slider_image = folder_path + image.name;
                const cosa_image = folder_path + imageNames + '_C_' + `${shear}_` + type;
    
                parts.forEach((imageNamePart) => {
                    const matchingIndex = Object.values(allData.SerialID).indexOf(imageNamePart);
                    if (matchingIndex !== -1) {
                        const newObject = Object.values(allData).map((data) => data[matchingIndex]);
                        newMatchedData.push(newObject);
                        newMatchedData[index].push(slider_image, cosa_image, image.value, image.cri, predict[index], '','',''); 
                    } else {
                        console.log(`Value "${imageNamePart}" does not exist in the allData array.`);
                    }
                });
            });
    
            setMatchedData(newMatchedData);
            // console.log('Matched:', newMatchedData);
        } else {
            console.log('allData is empty or not an array.');
            setMatchedData([]);
        }
    };

    return (
        <button
            className='w-auto h-16 bg-graycustom flex justify-center items-center gap-2 mt-5 rounded-xl p-5 
        text-white hover:bg-white hover:text-dark transition-colors duration-300 shadow-xl hover:shadow-none group'
            onMouseMove={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                setIsPress(true);
                matchData();
            }}
        >
            <span className="material-symbols-outlined text-4xl font-black">cell_merge</span>
            {isHovered && <p className='text-xl'>Merge</p>}
        </button>
    );
};

export default MergeButton;
