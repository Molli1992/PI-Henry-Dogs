import "./DogCard.css";
import { Link } from "react-router-dom";
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

    const dog = useSelector((state) => state?.dogsDetail);

    if (Array.isArray(dog)) {

        console.log(dog);

        return (

            <div>

                <article className="card">

                    <div className="card-header">
                        <img src={dog[0].img} />
                    </div>

                    <div>

                        <ul>

                            <li>
                                <span>Name: </span>
                                {dog[0].name}
                            </li>

                            <li>
                                <span>Temperamento: </span>
                                {dog[0].temperamento}
                            </li>

                            <li>
                                <span>Peso: </span>
                                {dog[0].peso}
                            </li>

                            <li>
                                <span>Altura: </span>
                                {dog[0].altura}
                            </li>

                            <li>
                                <span>Años de vida: </span>
                                {dog[0].AñosDeVida}
                            </li>

                        </ul>


                    </div>


                </article>

                <div>
                    <Link to="/home">
                        <button className='button-home'>Home</button>
                    </Link>
                </div>

            </div>

        )

    } else return (
        <div>Dog not foound</div>
    )

};