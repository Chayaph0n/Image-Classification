import DeleteButton from "../../component/button/DeleteButton";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../App";

const UploadedXlsx = ({ uploadedFiles, icon }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const { uploadedExel, setUploadedExel, setAllData } = useContext(DataContext);

    const handleDelete = (index) => {
        console.log(index)
        const updatedData = [...uploadedExel];
        updatedData.splice(index, 1);
        setUploadedExel(updatedData);
        setAllData([]);
    };

    return (
        <>
            <section>
                {uploadedFiles.map((file, index) => (
                    <li
                        className="h-14 mb-1 flex items-center justify-between bg-dark hover:bg-middark px-6 py-3 rounded-xl text-white"
                        key={index}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-purple text-4xl">{icon}</span>
                            <div>
                                <p className="w-full text-sm">{file.name}</p>
                                <p className="text-xs text-gray-400">{file.size}</p>
                            </div>
                        </div>
                        {hoveredItem === index && <DeleteButton onClick={() => handleDelete(index)} />}
                        {hoveredItem !== index && (
                            <span className="material-symbols-outlined text-blue text-4xl">done</span>
                        )}
                    </li>
                ))}
            </section>
        </>
    );
};

export default UploadedXlsx;
