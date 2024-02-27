import axios from "axios";
import LocalAPI from "./LocalAPI";

const SendMatchedData = async (matchedData, formData, amountData) => {

    const matchedDataString = JSON.stringify(matchedData);
    // console.log('matchedData : ', matchedData);
    // console.log('matchedDataString : ', matchedDataString);
    formData.append('matchedData', matchedDataString);
    formData.append('amountData', amountData);

    try {
        const response = await axios.post(`${LocalAPI.node}/matchdata`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        console.log("Data successfully submitted:");

    } catch (error) {
        console.error("Error sending data:", error);
    }
};

export default SendMatchedData;
