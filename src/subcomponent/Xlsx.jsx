import React, { useRef, useState, useContext } from 'react';
import * as XLSX from 'xlsx';
import ErrorAlert from './alert/ErrorAlert';
import UploadUI from './minicomponent/UploadUI';
import GetDataColumn from './minicomponent/GetDataColumn';
import { DataContext } from '../App';
import PostImage from './minicomponent/PostImage';

const Xlsx = ({ title, img, icon }) => {
    const { uploadedExel, setUploadedExel, setAllData, setFormData } = useContext(DataContext);

    const [files, setFiles] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        if (allowedTypes.includes(file.type)) {
            // Valid file type in allowedTypes
            const fileName =
                file.name.length > 22
                    ? `${file.name.substring(0, 23)}... .${file.name.split('.')[1]}`
                    : file.name;

            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Accumulate data in allData as a single array
                const newData = {
                    COSALotID: GetDataColumn(worksheet, 'C'),
                    SliderLotID: GetDataColumn(worksheet, 'D'),
                    SerialID: GetDataColumn(worksheet, 'H'),
                    Station: GetDataColumn(worksheet, 'I'),
                    Laser_st: GetDataColumn(worksheet, 'BQ'),
                    Laser_power: GetDataColumn(worksheet, 'BR'),
                    Laser_bt: GetDataColumn(worksheet, 'BS'),
                    Laser_tm: GetDataColumn(worksheet, 'BT'),
                    Build_type: GetDataColumn(worksheet, 'CK'),
                    ISA_type: GetDataColumn(worksheet, 'CL'),
                    Build_date: GetDataColumn(worksheet, 'CM'),
                };

                // Merge the new data into the existing data
                setAllData((prevAllData) => {
                    const combinedData = {
                        COSALotID: [...(prevAllData.COSALotID || []), ...newData.COSALotID],
                        SliderLotID: [...(prevAllData.SliderLotID || []), ...newData.SliderLotID],
                        SerialID: [...(prevAllData.SerialID || []), ...newData.SerialID],
                        Station: [...(prevAllData.Station || []), ...newData.Station],
                        Laser_st: [...(prevAllData.Laser_st || []), ...newData.Laser_st],
                        Laser_power: [...(prevAllData.Laser_power || []), ...newData.Laser_power],
                        Laser_bt: [...(prevAllData.Laser_bt || []), ...newData.Laser_bt],
                        Laser_tm: [...(prevAllData.Laser_tm || []), ...newData.Laser_tm],
                        Build_type: [...(prevAllData.Build_type || []), ...newData.Build_type],
                        ISA_type: [...(prevAllData.ISA_type || []), ...newData.ISA_type],
                        Build_date: [...(prevAllData.Build_date || []), ...newData.Build_date],
                    };
                    return combinedData;
                });

                try {
                    const newFormData = new FormData();
                    newFormData.append('file', file);
                    setFormData(newFormData);
                    setFiles(prevState => [...prevState, { name: fileName, loading: 0 }]);
                    setShowProgress(true);
                    PostImage(newFormData, setFiles, setUploadedExel, setShowProgress, uploadedExel, fileName);

                } catch (error) {
                    console.log(error);
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            ErrorAlert({ title: 'Invalid File Type', text: 'Please select an Excel file.' });
        }
    };

    return (
        <UploadUI
            title={title}
            fileInputRef={fileInputRef}
            uploadFile={uploadFile}
            handleFileInputClick={handleFileInputClick}
            img={img}
            showProgress={showProgress}
            files={files}
            icon={icon}
            uploadedFiles={uploadedExel}
            type={'xlsx'}
        />
    );
};

export default Xlsx;
