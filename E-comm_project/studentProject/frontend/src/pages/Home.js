import React from 'react'
import { useGetCartQuery } from '../services/profile.js';

const Home = () => {
    const { data } = useGetCartQuery();
    // console.log(data.orderById);
    if (data) {
        console.log(data, "6");
    }
    return (
        <div>Home
            {data?.map((e) => {
                return (
                    <div>
                        {e.items}
                        {e.orderById.name}
                        {e.paymentBy}
                        {e.paymentTo}
                        {e.orderTo}
                        {e.items}

                    </div>
                )
            })}
            <h3>This is Home Page</h3>
        </div>
    )
}

export default Home

//jsx=html+js can write together