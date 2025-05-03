import {useEffect, useState} from 'react';

function App(){
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:7065/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h1>Products List</h1>
            <ul>
                {products.map((p, index)=>(
                    <li key={index}>{p}</li>
                ))}
            </ul>
        </div>
    );
}