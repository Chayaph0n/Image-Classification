import { useState, createContext, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import UploadImage from './component/UploadImage'
import UploadXlsx from './component/UploadXlsx'
import MergeTable from './component/table/MergeTable'
import MergeButton from './component/button/MergeButton'
import ClearTableButton from './component/button/ClearTableButton'
import SubmitButton from './component/button/SubmitButton'
import DataTable from './component/table/DataTable'
import DataFilter from './component/filter/DataFilter'
import DateFilter from './component/filter/DateFilter'
import ClearFilterButton from './component/button/ClearFilterButton'
import DropdownFilter from './component/filter/DropdownFilter'

export const DataContext = createContext();
export const TableContext = createContext();

const App = () => {

  const [isPress, setIsPress] = useState(false);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [uploadedExel, setUploadedExel] = useState([]);
  const [allData, setAllData] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [uploaded, setUploaded] = useState(new Set());
  const [formData, setFormData] = useState(new FormData());
  const [data, setData] = useState([]);
  const [predict, setPredict] = useState([]);
  // Filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cosaLotID, setCOSALotID] = useState('');
  const [sliderLotID, setSliderLotID] = useState('');
  const [serialID, setSerialID] = useState('');
  const [station, setStation] = useState('');
  const [failType, setFailType] = useState('');
  const [criterial, setCriterial] = useState('');
  //RefInput
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const cosaLotIDRef = useRef(null);
  const sliderLotIDRef = useRef(null);
  const serialIDRef = useRef(null);
  const stationRef = useRef(null);
  const typeRef = useRef(null);

  // useEffect(() => {
  //   console.log(matchedData)
  // },[setMatchedData])

  return (
    <div className='w-4/5 mx-auto py-5'>

      <Navbar />

      <div className='w-full bg-graycustom p-14 rounded-3xl mt-16'>
        <div className='w-full h-auto bg-banner rounded-2xl p-14'>
          <DataContext.Provider value={{
            uploadedImage, setUploadedImage, uploadedExel, setUploadedExel, allData, setAllData,
            matchedData, setMatchedData, uploaded, setUploaded, formData, setFormData, setIsPress, predict, setPredict
          }}>
            <div className='w-full flex flex-row justify-center h-full gap-y-4 bg-graycustom grid-rows-2 rounded-xl p-5'>
              <UploadImage />
              <UploadXlsx />
            </div>
            <div className='flex gap-5'>
              <MergeButton setIsPress={setIsPress} />
              {isPress && <SubmitButton />}
              {isPress && <ClearTableButton setIsPress={setIsPress} />}
            </div>
            {isPress && <MergeTable />}
          </DataContext.Provider>
        </div>

        <div className='bg-dark p-14 rounded-2xl mt-14'>
          <TableContext.Provider value={{
            data, setData, startDate, setStartDate, endDate, setEndDate, cosaLotID, setCOSALotID,
            sliderLotID, setSliderLotID, serialID, setSerialID, station, setStation, failType, setFailType, criterial, setCriterial
          }}>
            <div className='flex justify-between items-center'>
              <div className='grid grid-cols-3 gap-4 w-3/4 pr-1'>
                <DateFilter title={'Start Date'} ref_value={startDateRef} />
                <DateFilter title={'End Date'} ref_value={endDateRef} />
                <DataFilter title={'Failure Type'} ref_value={typeRef} />
              </div>
              <div className='w-1/4 mt-5 flex pl-3 gap-4'>
                <DropdownFilter />
                <ClearFilterButton  startDateRef={startDateRef} 
                                    endDateRef={endDateRef} 
                                    cosaLotIDRef={cosaLotIDRef} 
                                    sliderLotIDRef={sliderLotIDRef} 
                                    serialIDRef={serialIDRef} 
                                    stationRef={stationRef}
                                    typeRef={typeRef}
                />
              </div>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-3'>
              <DataFilter title={'COSALotID'} ref_value={cosaLotIDRef} />
              <DataFilter title={'SliderLotID'} ref_value={sliderLotIDRef} />
              <DataFilter title={'SerialID'} ref_value={serialIDRef} />
              <DataFilter title={'Station'} ref_value={stationRef} />
            </div>
            <div className='w-full h-auto max-h-96 mt-6 bg-graycustom rounded-xl text-white text-center'>
              <DataTable />
            </div>
          </TableContext.Provider>
        </div>
      </div>

    </div>
  )
}

export default App
