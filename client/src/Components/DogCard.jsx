import "DogCard.css";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getDogsDetail } from "../Actions/index";


export default function DogCard(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogsDetail(props.match.params.id))

    }, [dispatch]);

    const dog = useSelector((state) => state.dogsDetail);


    return (

        <div>

            <article className="card">

                <ul>
                    <li>
                        Img:
                    </li>

                    <li>
                        Nombre:
                    </li>

                    <li>
                        Temperamento:
                    </li>

                    <li>
                        Peso:
                    </li>

                    <li>
                        Altura:
                    </li>

                    <li>
                        Años de vida:
                    </li>

                </ul>

            </article>

        </div>

    )
};