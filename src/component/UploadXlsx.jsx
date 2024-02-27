import Xlsx from "../subcomponent/Xlsx";

const UploadXlsx = () => {

    return(
        <div className="w-full">
            <Xlsx title={'Upload Excel'} img={'xlsxIcon.png'} icon={'description'} />
        </div>
    )
}

export default UploadXlsx;