import axios from "axios";
import LocalAPI from "./LocalAPI";

const CheckData = async ({ serialID }) => {
    try {
        const response = await axios.get(`${LocalAPI.node}/datatable`);
        const data_response = response.data.data; 
        const data_array = data_response.map(obj => Object.values(obj));

        const foundDuplicate = data_array.some(array => array[2] === serialID);
        console.log('in checkData: ',foundDuplicate);
    
        return foundDuplicate;
    } catch (error) {
        console.error('Error checking data:', error);
        setIsDuplicate(false); 
    }
}

export default CheckData;