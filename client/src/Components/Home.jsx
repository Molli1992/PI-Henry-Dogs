import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import FilterTemp from './FilterTemp';
import FilterRaza from './FilterRaza';


export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogs())

    }, [dispatch]);

    const dogs = useSelector((state) => state.dogs);

    var ITEMS_PER_PAGE = 8;

    const [datosFromApi, setDatosFromApi] = useState(dogs);

    const [items, setItems] = useState([...dogs].splice(0, ITEMS_PER_PAGE));

    const [currentPage, serCurrentPage] = useState(0);

    const nextHandler = () => {

        const totalElementos = datosFromApi.length;

        const nextPage = currentPage + 1;

        const firstIndex = nextPage * ITEMS_PER_PAGE;

        //ITEMS_PER_PAGE = ITEMS_PER_PAGE + 10;

        if (nextPage > 21) return;

        setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
        serCurrentPage(nextPage);

    };

    const prevHandler = () => {

        const prevPage = currentPage - 1;

        if (prevPage < 0) return;

        const firstIndex = prevPage * ITEMS_PER_PAGE;

        setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
        serCurrentPage(prevPage);

    };

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

            <div>Pagina: {currentPage}</div>

            <div>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>

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

            <FilterTemp />
            <FilterRaza />

            {

                items && items.map((dog) => {


                    return (

                        <Link to={"/home/" + dog.name}>
                            <HomeCard key={dog.name} img={dog.img} name={dog.name} temperamento={dog.temperamento} />
                        </Link>

                    )

                })

            }

        </div>
    );
};