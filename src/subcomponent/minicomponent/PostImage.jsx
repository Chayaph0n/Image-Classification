const simulateUpload = async (formData, setFiles, setUploadedFiles, setShowProgress, uploadedFiles, fileName, shear_val, criterial) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const file = formData.get('file'); // Retrieve the file from FormData
    const totalSize = file.size; // Actual file size in bytes
    let loaded = 0;

    while (loaded < totalSize) {
        // Simulating progress by incrementing loaded bytes (for demonstration purposes)
        loaded += 100000; // Increment loaded bytes (adjust for simulation purposes)

        // Calculate progress percentage
        const progress = Math.floor((loaded / totalSize) * 100);

        // Update UI with the progress
        setFiles((prevState) => {
            const newFiles = [...prevState];
            newFiles[newFiles.length - 1].loading = progress;
            return newFiles;
        });

        // Simulate delay to display progress
        await delay(10); // Adjust delay time as needed
    }

    // When the upload progress reaches 100%
    const fileSize = totalSize < 1024
        ? `${totalSize} B`
        : `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    
    setUploadedFiles([...uploadedFiles, { name: fileName, value: shear_val , cri: criterial, size: fileSize }]);
    setFiles([]);
    setShowProgress(false);
};

const PostImage = async (formData, setFiles, setUploadedFiles, setShowProgress, uploadedFiles, fileName, shear_val, criterial) => {
    // Simulate upload progress locally without sending to an API
    await simulateUpload(formData, setFiles, setUploadedFiles, setShowProgress, uploadedFiles, fileName, shear_val, criterial);
};

export default PostImage;
