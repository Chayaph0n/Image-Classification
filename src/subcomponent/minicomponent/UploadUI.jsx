import LocalAPI from "../../API/LocalAPI";
import UploadedImage from "./UploadedImage";
import UploadedXlsx from "./UploadedXlsx";
import Uploading from "./Uploading";
import axios from "axios";

const UploadUI = ({ title, fileInputRef, uploadFile, handleFileInputClick, img, showProgress, files, icon, uploadedFiles, type, setPredict }) => {

    const predictImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        if (type === 'image') {
            try {
                const response = await axios.post(`${LocalAPI.machine}/predict`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                // console.log(response.data);
                const predictions = response.data.predictions;
                // console.log(predictions)
                setPredict(prevPredictions => [...prevPredictions, predictions]);
    
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleFileChange = (event) => {
        uploadFile(event); 
        predictImage(event); 
    };

    return (
        <div className={`h-auto flex flex-col items-center px-10 gap-4`}>
            <p className="text-white text-xl font-extrabold">{title}</p>
            <form className="w-full">
                <input type="file" name='file' hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                <div className="w-full h-auto bg-dark hover:bg-white flex flex-col items-center p-5 gap-8 rounded-xl cursor-pointer text-white hover:text-dark transition-colors duration-500" onClick={handleFileInputClick}>
                    <img src={`/src/assets/${img}`} className='w-32 h-32' alt="" />
                    <p className="font-semibold">Browse Files to Upload</p>
                </div>
            </form>
            <div className="w-full max-h-48 flex flex-col overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-purple scrollbar-thumb-rounded-full scrollbar-track-dark scrollbar-track-rounded-full">
                {showProgress && (
                    <Uploading files={files} icon={icon} />
                )}
                {type === 'image' && (
                    <UploadedImage uploadedFiles={uploadedFiles} icon={icon} />
                )}
                {type === 'xlsx' && (
                    <UploadedXlsx uploadedFiles={uploadedFiles} icon={icon} />
                )}
            </div>
        </div>
    );
}


export default UploadUI;