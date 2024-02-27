import axios from 'axios'

const PostFiles = async ( formData, setFiles, setUploadedFiles, setShowProgress, uploadedFiles, fileName, shear_val, criterial ) => {
    await axios.post('http://localhost:3000/matchdata', formData, {
        onUploadProgress: ({ loaded, total }) => {
            setFiles(prevState => {
                const newFiles = [...prevState];
                newFiles[newFiles.length - 1].loading = Math.floor((loaded / total) * 100);
                return newFiles;
            });
            if (loaded === total) {
                const fileSize = total < 1024
                    ? `${total} KB`
                    : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
                setUploadedFiles([...uploadedFiles, { name: fileName, value: shear_val , cri: criterial, size: fileSize }]);
                setFiles([]);
                setShowProgress(false);
            }
        }
    });
}

export default PostFiles