import { useRef, useState, useContext } from 'react';
import ErrorAlert from './alert/ErrorAlert';
import UploadUI from './minicomponent/UploadUI';
import PostImage from './minicomponent/PostImage';
import { DataContext } from '../App';
import CheckData from '../API/CheckData';

const Image = ({ title, img, icon }) => {

    const { uploadedImage, setUploadedImage, uploaded, setUploaded, setPredict } = useContext(DataContext);

    const [files, setFiles] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    }

    const uploadFile = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const serialID = file.name.split('_')[0]
        const check_result = await CheckData({ serialID });

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

        const allowedSlider = ['s', 'S'];
        const type = file.name.split('_')[1];

        if (!check_result) {
            if (allowedTypes.includes(file.type)) {
                if (!uploaded.has(file.name)) {
                    setUploaded(new Set(uploaded).add(file.name));
                    if (allowedSlider.includes(type)) {
    
                        // Valid file type in allowedTypes
                        const fileName = file.name.length > 29
                            ? `${file.name.substring(0, 25)}... .${file.name.split('.')[2]}`
                            : file.name;
    
                        const shear_val = fileName.split('_')[2];
                        let criterial = '';
    
                        if (shear_val <= 0.200) {
                            criterial = 'Fail'
                        } else if (shear_val > 0.200 && shear_val <= 0.299) {
                            criterial = 'Accept'
                        } else if (shear_val >= 0.300) {
                            criterial = 'Pass'
                        }
    
                        const formData = new FormData();
                        formData.append('file', file);
                        setFiles(prevState => [...prevState, { name: fileName, value: shear_val, cri: criterial, loading: 0 }]);
                        setShowProgress(true);
                        PostImage(formData, setFiles, setUploadedImage, setShowProgress, uploadedImage, fileName, shear_val, criterial);
                    } else {
                        ErrorAlert({ title: 'Invalid Image Type', text: 'Please select a slider image.' });
                    }
                } else {
                    ErrorAlert({ title: 'Image uploaded', text: 'Please select new image.' });
                }
            } else {
                ErrorAlert({ title: 'Invalid File Type', text: 'Please select a image file.' });
            }
        } else {
            ErrorAlert({ title: 'Duplicate Image', text: 'Please select a new image file.' });
        }
    }

    return (
        <UploadUI title={title} fileInputRef={fileInputRef} uploadFile={uploadFile}
            handleFileInputClick={handleFileInputClick} img={img} showProgress={showProgress}
            files={files} icon={icon} uploadedFiles={uploadedImage} type={'image'} setPredict={setPredict} />
    )
}

export default Image;