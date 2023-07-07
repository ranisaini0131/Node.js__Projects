import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
    reducerPath: 'profileApi', //key which defines where redux stores cache
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => "getCart",
            method: "GET"
        }),
        getAllAddresses: builder.query({
            query: () => "getAllAddresses",
            method: "GET"
        }),
        getAddressesByLimit: builder.query({
            query: (num) => {
                console.log("Limit Number:", num);
                return {
                    url: `contact?_limit=${num}`,
                    method: 'GET'
                }
            }
        }),

        deleteAddress: builder.mutation({
            query: (_id) => {
                console.log("delet id:", _id);
                return {
                    url: `posts/${_id}`,
                    method: 'DELETE'
                }
            }
        })
    }),

    createAddress: builder.mutation({
        query: (newPost) => {
            console.log("Create Post:", newPost);
            return {
                url: `posts`,
                method: 'POST',
                body: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
        }
    })

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery, useGetAllAddressesQuery, useGetAddressesByLimitQuer, useDeleteAddressMutation, useCreateAddressMutation } = profileApi //hooks
