/*import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import FilterTemp from './FilterTemp';
import FilterRaza from './FilterRaza';


export default function Home(props) {

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state?.dogs);

    var nextHandler;
    var prevHandler;
    var handleSearchTemperamento;
    var handleSearchRaza;
    var results;

    let [datosFromApi, setDatosFromApi] = useState([]);

    let [items, setItems] = useState([].splice(0, ITEMS_PER_PAGE));

    const [currentPage, serCurrentPage] = useState(0);

    const [searchTemperamento, setSearchTemperamento] = useState("");

    const [searchRaza, setSearchRaza] = useState("");



    if (Array.isArray(allDogs)) {

        setDatosFromApi = allDogs;
        setItems = [...allDogs];

        console.log(allDogs);

        var ITEMS_PER_PAGE = 4;

        nextHandler = () => {

            const totalElementos = datosFromApi.length;

            const nextPage = currentPage + 1;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage > 21) return;

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

        handleSearchTemperamento = (e) => {
            setSearchTemperamento(e.target.value);
            console.log(e.target.value)
        };

        handleSearchRaza = (e) => {
            setSearchRaza(e.target.value);
            console.log(e.target.value)
        };

        results = [];

        if (!searchTemperamento && !searchRaza) {
            results = items;
        } else if (searchTemperamento) {
            results = items.filter((dato) => {
                return dato.temperamento.toLowerCase().includes(searchTemperamento.toLowerCase())
            })
        } else {
            results = items.filter((dato) => {
                return dato.name.toLowerCase().includes(searchRaza.toLowerCase())
            })
        }

    }

    useEffect(async () => {
        dispatch(getDogs())
    }, [dispatch]);*/