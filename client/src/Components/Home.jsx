import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs, getTemperaments } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogs());
        dispatch(getTemperaments())

    }, [dispatch]);



    const allDogs = useSelector((state) => state?.dogs);
    const temperaments = useSelector((state) => state?.temperaments);

    useEffect(() => {
        if (allDogs && allDogs.length) {
            setDatosFromApi(allDogs);
            setItems([...allDogs].splice(0, ITEMS_PER_PAGE));
        }
    }, [allDogs]);

    var nextHandler;
    var prevHandler;
    var handleSearchNombre;
    var handleFilterRaza;
    var handleFilterTemp;
    var results;
    var handleSortAsc;
    var handleSortDes;
    var handleDelete;
    var handleSortWeigth;


    const [datosFromApi, setDatosFromApi] = useState("");

    const [items, setItems] = useState("");

    const [currentPage, serCurrentPage] = useState(0);

    const [searchNombre, setSearchNombre] = useState("");

    const [filterRaza, setFilterRaza] = useState("");

    const [filterTemp, setFilterTemp] = useState("");

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
            setSearchNombre(e.target.value)
            console.log(e.target.value)
        };

        handleFilterRaza = (e) => {
            setFilterRaza(e.target.value)
            console.log(e.target.value)
        };

        handleFilterTemp = (e) => {
            setFilterTemp(e.target.value)
            console.log(e.target.value)
        };



        handleSortDes = (e) => {
            setItems([...datosFromApi].sort((a, b) => {

                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            }))
            console.log(items);
        };




        handleSortAsc = (e) => {
            setItems([...datosFromApi].sort((a, b) => {

                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }))
            console.log(items);
        };

        handleSortWeigth = (e) => {
            setItems([...datosFromApi].sort((a, b) => {

                if (a.peso_min > b.peso_min) {
                    return 1;
                }
                if (b.peso_min > a.peso_min) {
                    return -1;
                }
                return 0;
            }))
            console.log(items);
        };

        handleDelete = (e) => {
            window.location.reload(true);
        };


        results = [];

        if (filterTemp) {
            results = items.filter((dato) => {
                return dato.temperamento.toLowerCase().includes(filterTemp.toLowerCase())
            })
            console.log(results);
        } else if (filterRaza) {
            results = items.filter((dato) => {
                return dato.name.toLowerCase().includes(filterRaza.toLowerCase())
            })
            console.log(results);
        } else if (searchNombre) {
            results = items.filter((dato) => {
                return dato.name.toLowerCase().includes(searchNombre.toLowerCase())
            })
            console.log(results);
        } else if (!searchNombre) {
            results = items;
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
                    <input placeholder='busca por nombre' name='search'
                        onChange={handleSearchNombre} />
                    <button>Search</button>
                </div>

            </div>

            <select onClick={handleFilterRaza}>

                <option>Razas</option>

                {allDogs && allDogs.map((raza) => {
                    return (
                        <option key={raza.name}>
                            {raza.name}
                        </option>
                    );
                })}

            </select>

            <select onClick={handleFilterTemp}>

                <option>Temperaments</option>

                {temperaments && temperaments.map((temp) => {
                    return (
                        <option key={temp}>
                            {temp}
                        </option>
                    );
                })}

            </select>

            <button onClick={handleSortAsc}>Ascendente</button>
            <button onClick={handleSortDes}>Descendente</button>
            <button onClick={handleSortWeigth}>Order by Weigth</button>

            <button onClick={handleDelete}>Refresh</button>

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