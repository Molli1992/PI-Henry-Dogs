import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs } from "../Actions";


export default function FilterRaza() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogs())

    }, [dispatch]);

    const dogs = useSelector((state) => state?.dogs);

    return (
        <div>

            <select >

                <option>Razas</option>

                {dogs && dogs.map((raza) => {
                    return (
                        <option key={raza.name} name={raza.name}>
                            {raza.name}
                        </option>
                    );
                })}

            </select>

        </div>
    );

};