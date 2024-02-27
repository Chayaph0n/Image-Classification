import { useContext, useEffect } from "react";
import { TableContext } from "../../App";

const DateFilter = ({ title, ref_value }) => {
    const { startDate, setStartDate, endDate, setEndDate } = useContext(TableContext);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        if (title === 'Start Date') {
            setStartDate(selectedDate); 
        } else if (title === 'End Date') {
            setEndDate(selectedDate); 
        }
    };

    // useEffect(() => {
    //     console.log('start date: ', startDate);
    //     console.log('end date: ', endDate);
    // }, [startDate, endDate]);

    return (
        <div>
            <p className="text-white font-bold text-sm">{title}</p>
            <input
                className="w-full h-10 bg-lightdark rounded-xl flex items-center mt-2 p-5 text-white text-sm"
                type="date"
                ref={ref_value}
                placeholder={`${title}`}
                onChange={(event) => handleDateChange(event, false)}
            />
        </div>
    );
};

export default DateFilter;
