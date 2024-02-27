const express = require("express");
const router = express.Router();
const config = require("../config");
const sql = require("mssql/msnodesqlv8");

const connection = sql.connect(config, (err) => {
    if (err) console.log(err);
});

router.get('/', async (req, res) => {
    const { cosaLotID, sliderLotID, serialID, station, startDate, endDate, failType, criterial } = req.query;
    try {
        const request = connection.request();

        let data_query = 'SELECT * FROM combinelog';
        let whereConditions = []

        if (startDate && endDate) {
            whereConditions.push(`CONVERT(DATE, Build_date, 6) BETWEEN '${startDate}' AND '${endDate}'`);
        } else if (startDate) {
            whereConditions.push(`CONVERT(DATE, Build_date, 6) = '${startDate}'`);
        }
        if (cosaLotID) {
            whereConditions.push(`CosaLotID LIKE '%${cosaLotID}%'`)
        } if (sliderLotID) {
            whereConditions.push(`SliderLotID LIKE '%${sliderLotID}%'`)
        } if (serialID) {
            whereConditions.push(`SerialID LIKE '%${serialID}%'`)
        } if (station) {
            whereConditions.push(`Station LIKE '${station}%'`)
        } if (failType) {
            whereConditions.push(`Failure_type LIKE '${failType}'`)
        } if (criterial) {
            whereConditions.push(`Criterial LIKE '${criterial}'`)
        }

        if (whereConditions.length > 0) {
            data_query += ' WHERE ' + whereConditions.join(' AND ');
        }

        const data_result = await request.query(data_query);
        const total_data = data_result.recordset;

        res.json({
            data: total_data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching the data' });
    }
});

module.exports = router;
