import {useEffect, useState} from "react";
import Portfolio from "./Portfolio";


const FinalPortfolio = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8000/bag").then((response) => {
            if (response.ok) {
                response.json().then((data1) => {
                    setData(data1);
                })
            }
        })
    })
    if (data === null) {
        return <p>Загрузка</p>
    }
    return (
        <Portfolio data={data} />
    )
}
export default FinalPortfolio;