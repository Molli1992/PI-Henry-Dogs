import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";


export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogs())

    }, [dispatch]);

    const dogs = useSelector((state) => state.dogs);

    const [state, setState] = useState({
        nombre: ""
    });

    function handleInputChange(e) {

        setState({
            ...state,
            [e.target.name]: e.target.value
        });

    };

    return (

        <div>

            <div >
                <Link to="/form">
                    <button className='button-home'>Crea tu raza de perros</button>
                </Link>
            </div>

            <div className='home-page'>

                <div>
                    <label>Busca tu perro</label>
                    <input placeholder='busca tu perro' name='name' />
                    <button>Buscar</button>
                </div>

            </div>

            {

                dogs && dogs.map((dog) => {


                    return (

                        <Link to={"/home/" + dog.name}>
                            <HomeCard img={""} nombre={""} temperamento={""} />
                        </Link>

                    )

                })

            }

        </div>
    );
};