'use client'
import useAxios from "axios-hooks";
import { PRODUCTS_URL } from "../config/constants";

export default function app (){
    const [{ data, loading, error }] = useAxios(PRODUCTS_URL);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;    

    return (
        <div>
            <main>
                <h1>Data from API:</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </main>
        </div>
    );
}
