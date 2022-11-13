import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTemperaments } from "../Actions";


export default function FilterTemp() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getTemperaments())

    }, [dispatch]);

    const temperaments = useSelector((state) => state?.temperaments);

    const handleDelete = (e) => {
        window.location.reload(true);
    };

    return (
        <div>

            <select>

                <option>Temperaments</option>

                {temperaments && temperaments.map((temp) => {
                    return (
                        <option key={temp} name={temp}>
                            {temp}
                        </option>
                    );
                })}

            </select>

            <button onClick={handleDelete}>Refresh</button>

        </div>
    );

};