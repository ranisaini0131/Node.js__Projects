import React from 'react'
import { useGetAllAddressesQuery, useGetAddressesByLimitQuery, useDeleteAddressMutation, useCreateAddressMutation } from '../services/profile.js';

const Contact = () => {
    // const { data } = useGetAllAddressesQuery();
    // const { limit } = useGetAddressesByLimitQuery(2);
    // const [deleteAddress, res] = useDeleteAddressMutation()
    const [createAddress] = useCreateAddressMutation();
    // console.log(res);
    //     console.log(limit, "8")
    // console.log(data, "9");
    // if (data) {
    //     console.log(data, "11");
    // }
    return (
        //getAllData
        // <div>Contact

        //     {data?.map((e) => {
        //         return (
        //             <div>
        //                 {e._id}
        //                 {e.city},
        //                 {e.pincode}
        //                 {e.nearby}
        //             </div>
        //         )
        //     })
        //     }
        // </div>

        //getLimitedData
        // <div>Contact

        //     {limit?.map((e) => {
        //         return (
        //             <div>
        //                 {e._id}
        //                 {e.city},
        //                 {e.pincode}
        //                 {e.nearby}
        //             </div>
        //         )
        //     })
        //     }
        // </div>

        //deleteAddress
        // <div>
        //     <button onClick={() => { deleteAddress(2) }}>Delete Address</button>
        // </div>

        <div>
            <button onClick={() => { createAddress() }}>Add Post</button>
        </div>
    );
}

export default Contact