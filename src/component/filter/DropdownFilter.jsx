import { useContext } from "react";
import { TableContext } from "../../App";

const DropdownFilter = () => {

    const { criterial, setCriterial } = useContext(TableContext);

    const handleSelection = (event) => {
        setCriterial(event.target.value);
        console.log(event.target.value)
    }

    return (
            <select className="mt-2 text-white text-sm rounded-xl w-full h-10 p-2.5 bg-lightdark"
                    value={criterial}
                    onChange={handleSelection}
            >
                <option value=''>Select Criterial</option>
                <option value="Pass">Pass</option>
                <option value="Accept">Accept</option>
                <option value="Fail">Fail</option>
            </select>
    )
}

export default DropdownFilter;