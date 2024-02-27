const express = require("express");
const router = express.Router();
const config = require("../config");
const sql = require("mssql/msnodesqlv8");
const multer = require("multer");
const xlsx = require("xlsx");

const connection = sql.connect(config, (err) => {
    if (err) console.log(err);
});

const upload = multer();

router.post("/", upload.fields([{ name: "file" }, { name: "matchedData" }, { name: "amountData" }]), async (req, res) => {
    const matchedDataString = req.body.matchedData;
    const matchedDataArray = JSON.parse(matchedDataString);
    const amountData = req.body.amountData;
    const file = req.files['file'][0];
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = "2.Shear test All";
    worksheet = workbook.Sheets[sheetName];
    const row = parseInt(amountData, 10) + 1;
    // console.log(matchedDataArray)

    const range = {
        s: { c: 1, r: 2 }, // B2
        e: { c: 101, r: row }, // CX2
    };

    const data = xlsx.utils.sheet_to_json(worksheet, {
        range,
        header: 1,
        blankRows: true,
        defval: null,
    });

    if (data.length === 0) {
        return res.status(400).send("No data found in the Excel sheet");
    }

    // Keep SerialID
    const SerialID_Values = matchedDataArray.map(subArray => subArray[2]);
    // Keep sheartest value
    const ShearTest_Values = matchedDataArray.map(subArray => subArray[13]);
    // Keep sheartest value
    const Cri_Values = matchedDataArray.map(subArray => subArray[14]);
    // Keep prediction
    const prediction = matchedDataArray.map(subArray => subArray[15]);
    // console.log('SerialID_Values',SerialID_Values ,'shear: ',ShearTest_Values,'  prediction: ',prediction);

    const indices = {};
    SerialID_Values.forEach((value, index) => {
        indices[value] = index;
    });

    const filteredData = data.filter(row => SerialID_Values.includes(row[6]));

    filteredData.sort((a, b) => {
        const indexA = indices[a[6]];
        const indexB = indices[b[6]];
        return indexA - indexB;
    });
    // console.log("Filtered data based on specific values:", filteredData.length);
    // console.log(filteredData)

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-` +
                            `${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:` +
                            `${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    
    const request = connection.request();

    const refId_query = 'SELECT COALESCE(MAX(ISARefID)+1 , 1) AS MaxValue FROM ISAInsp;';
    const refId_result = await request.query(refId_query);
    let refId = refId_result.recordset[0].MaxValue;

    const folder_path = '/src/assets/Exel/';
    let index = 0

    // ISAInsp
    for (let rowData of filteredData) {
        try {
            // console.log(refId)s
            for (let i = 0; i < rowData.length; i++) {
                const value = rowData[i];
                const paraVal = value !== undefined ? (typeof value === 'string' ? `'${value}'` : value) : 'NULL';
                // if (i === 6) console.log(paraVal);
                if (i === 98) {
                    const insp_query = `INSERT INTO ISAInsp (ISARefID, ParaID, ParaVal, StatusID, CreatedDateTime, CreatedByID)
                                    VALUES (${refId}, ${i+1}, ${ShearTest_Values[index]}, 3, '${formattedDate}', 1)`;
                    // console.log('index : ',index,'ShearTest_Value : ',ShearTest_Values[index]);
                    await request.query(insp_query);
                } else if (i === 99) {
                    const insp_query = `INSERT INTO ISAInsp (ISARefID, ParaID, ParaVal, StatusID, CreatedDateTime, CreatedByID)
                                    VALUES (${refId}, ${i+1}, '${Cri_Values[index]}', 3, '${formattedDate}', 1)`;
                    await request.query(insp_query);
                } else if (i === 100) {
                    const insp_query = `INSERT INTO ISAInsp (ISARefID, ParaID, ParaVal, StatusID, CreatedDateTime, CreatedByID)
                                    VALUES (${refId}, ${i+1}, ${prediction[index]}, 3, '${formattedDate}', 1)`;
                    await request.query(insp_query);
                } else {
                    const insp_query = `INSERT INTO ISAInsp (ISARefID, ParaID, ParaVal, StatusID, CreatedDateTime, CreatedByID)
                                    VALUES (${refId}, ${i+1}, ${paraVal}, 3, '${formattedDate}', 1)`;
                    await request.query(insp_query);
                }
            }
            let shearTestValue = ShearTest_Values[index];
            if (typeof shearTestValue === 'string') {
                shearTestValue = parseFloat(shearTestValue); // Convert to number if it's a string
            }

            if (!isNaN(shearTestValue)) {
                shearTestValue = shearTestValue.toFixed(3); // Applying toFixed if it's a valid number
            } else {
                console.error('ShearTest_Values[index] is not a valid number:', ShearTest_Values[index]);
                continue; // Skip further execution for this iteration
            }

            let path_slider = `${folder_path}${rowData[6]}_S_${shearTestValue}_${rowData[7]}.jpg`;
            let path_cosa = `${folder_path}${rowData[6]}_C_${shearTestValue}_${rowData[7]}.jpg`;

            const lot_query = `INSERT INTO ISALot (ISARefID, SerialID, Path_Slider, Path_COSA, Type, StatusID, CreatedDateTime, CreatedByID)
                                VALUES (${refId}, '${rowData[6]}', '${path_slider}', '${path_cosa}', '${rowData[7]}', 3,'${formattedDate}', 1)`;
            await request.query(lot_query);

            refId++; 
            index++;
        } catch (error) {
            console.error("Error occurred during insertion:", error);
        }
    }
});

module.exports = router;