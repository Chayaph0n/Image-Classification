import axios from "axios";
import LocalAPI from "./LocalAPI";

const FetchData = async ({ cosaLotID, sliderLotID, serialID, station, startDate, endDate, setData, failType, criterial }) => {
    try {
        let url = `${LocalAPI.node}/datatable`;

        const queryParams = [];
        if (startDate) queryParams.push(`startDate=${startDate}`);
        if (endDate) queryParams.push(`endDate=${endDate}`);
        if (cosaLotID) queryParams.push(`cosaLotID=${cosaLotID}`);
        if (sliderLotID) queryParams.push(`sliderLotID=${sliderLotID}`);
        if (serialID) queryParams.push(`serialID=${serialID}`);
        if (station) queryParams.push(`station=${station}`);
        if (failType) queryParams.push(`failType=${failType}`);
        if (criterial) queryParams.push(`criterial=${criterial}`);
        
        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        const response = await axios.get(url);
        const data_response = response.data.data; 
        const data_array = data_response.map(obj => Object.values(obj));  

        setData(data_array)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default FetchData;