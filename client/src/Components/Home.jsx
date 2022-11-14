import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import FilterRaza from './FilterRaza';
import FilterTemp from './FilterTemp';

export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());

    }, [dispatch]);



    const allDogs = useSelector((state) => state?.dogs);

    useEffect(() => {
        if (allDogs && allDogs.length) {
            setDatosFromApi(allDogs);
            setItems([...allDogs].splice(0, ITEMS_PER_PAGE));
        }
    }, [allDogs]);

    var nextHandler;
    var prevHandler;
    var handleSearchNombre;
    var results;

    const [datosFromApi, setDatosFromApi] = useState("");

    const [items, setItems] = useState("");

    const [currentPage, serCurrentPage] = useState(0);

    const [searchNombre, setSearchNombre] = useState("");

    if (Array.isArray(allDogs) && allDogs.length) {

        console.log(allDogs);
        console.log(items);

        var ITEMS_PER_PAGE = 8;

        nextHandler = () => {

            const totalElementos = datosFromApi.length;

            const nextPage = currentPage + 1;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
            serCurrentPage(nextPage);

        };

        prevHandler = () => {

            const prevPage = currentPage - 1;

            if (prevPage < 0) return;

            const firstIndex = prevPage * ITEMS_PER_PAGE;

            setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
            serCurrentPage(prevPage);

        };

        handleSearchNombre = (e) => {
            setSearchNombre(e.target.value);
            console.log(e.target.value)
        };

        results = [];

        if (!searchNombre) {
            results = items;
        } else if (searchNombre) {
            results = items.filter((dato) => {
                return dato.name.toLowerCase().includes(searchNombre.toLowerCase())
            })
            console.log(results);
        }
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
                    <input placeholder='busca por nombre' onChange={handleSearchNombre} />
                </div>

            </div>

            <FilterRaza />
            <FilterTemp />

            {

                results && results.map((dog) => {


                    return (

                        <Link to={"/home/" + dog.name}>
                            <HomeCard key={dog.name} img={dog.img} name={dog.name}
                                temperamento={dog.temperamento} />
                        </Link>

                    )

                })

            }

        </div>
    );

};