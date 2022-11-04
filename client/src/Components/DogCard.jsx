import "./DogCard.css";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getDogsDetail } from "../Actions/index";


export default function DogCard() {

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {

        dispatch(getDogsDetail(id))

    }, [dispatch]);

    const dog = useSelector((state) => state.dogsDetail);

    console.log(dog);


    return (

        <div>

            <article className="card">

                <ul>
                    <li>
                        Img: {dog[0].img}
                    </li>

                    <li>
                        Name: {dog[0].name}
                    </li>

                    <li>
                        Temperamento: {dog[0].temperamento}
                    </li>

                    <li>
                        Peso: {dog[0].peso}
                    </li>

                    <li>
                        Altura: {dog[0].altura}
                    </li>

                    <li>
                        Años de vida: {dog[0].AñosDeVida}
                    </li>

                </ul>

            </article>

        </div>

    )
};