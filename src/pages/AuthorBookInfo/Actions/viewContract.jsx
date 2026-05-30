import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

const ViewContract = () => {
    const { id } = useParams()

    const [book, setBook] = useState(null)
    
    const [loading, setLoading] =
        useState(false)

    // =========================================
    // FETCH CONTRACT
    // =========================================

    const fetchContract = async () => {
        try {
            setLoading(true)

            const response =
                await axiosAuthInstance.get(
                    `/book/get-book/${id}`,
                )
          
            if (response.data) {
                setBook(response.data.result)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // =========================================
    // USE EFFECT
    // =========================================

    useEffect(() => {
        fetchContract()
    }, [])

    if (loading) {
        return (
            <div className='p-5'>
                Loading Contract...
            </div>
        )
    }

    return (
        <div className='p-5'>
            <div className='bg-white rounded-xl shadow-md p-8 max-w-5xl mx-auto'>
                {/* HEADER */}

                <div className='text-center border-b pb-5 mb-6'>
                    <h1 className='text-3xl font-bold'>
                        BOOK PUBLISHING AGREEMENT
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        ZCAD Publication
                    </p>
                </div>

                {/* BASIC DETAILS */}

                <div className='grid grid-cols-2 gap-5 mb-8'>
                    <div>
                        <p className='font-semibold'>
                            Book Title
                        </p>

                        <p>{book?.title}</p>
                    </div>

                    <div>
                        <p className='font-semibold'>
                            Category
                        </p>

                        <p>{book?.category}</p>
                    </div>

                    <div>
                        <p className='font-semibold'>
                            Author Name
                        </p>

                        <p>
                            {
                                book?.authorId
                                    ?.firstName
                            }{' '}
                            {
                                book?.authorId
                                    ?.lastName
                            }
                        </p>
                    </div>

                    <div>
                        <p className='font-semibold'>
                            ISBN Number
                        </p>

                        <p>
                            {
                                book?.contractDetails
                                    ?.isbn
                            }
                        </p>
                    </div>
                </div>

                {/* CONTRACT DETAILS */}

                <div className='border rounded-xl p-6 bg-gray-50 mb-8'>
                    <h2 className='text-2xl font-semibold mb-5'>
                        Contract Details
                    </h2>

                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <p className='font-semibold'>
                                Royalty Percentage
                            </p>

                            <p>
                                {
                                    book?.contractDetails
                                        ?.royalty
                                }
                            </p>
                        </div>

                        <div>
                            <p className='font-semibold'>
                                Contract Duration
                            </p>

                            <p>
                                {
                                    book?.contractDetails
                                        ?.duration
                                }
                            </p>
                        </div>

                        <div>
                            <p className='font-semibold'>
                                Payment Terms
                            </p>

                            <p>
                                {
                                    book?.contractDetails
                                        ?.paymentTerms
                                }
                            </p>
                        </div>

                        <div>
                            <p className='font-semibold'>
                                Contract Status
                            </p>

                            <span
                                className={`px-3 py-1 rounded-full text-sm ${book?.contractStatus ===
                                    'Accepted'
                                    ? 'bg-green-100 text-green-600'
                                    : book?.contractStatus ===
                                        'Rejected'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-yellow-100 text-yellow-600'
                                    }`}
                            >
                                {book?.contractStatus}
                            </span>
                        </div>
                    </div>
                </div>

                {/* TERMS */}

                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-5'>
                        Terms & Conditions
                    </h2>

                    <ul className='list-disc ml-6 space-y-3 text-gray-700 leading-7'>
                        <li>
                            The author confirms
                            that the submitted
                            manuscript is original
                            and does not violate
                            any copyright laws.
                        </li>

                        <li>
                            ZCAD Publication will
                            handle editing,
                            proofreading, layout
                            design, printing,
                            binding, and
                            publishing of the
                            submitted book.
                        </li>

                        <li>
                            The publishing process
                            may take approximately
                            5 to 10 working days
                            depending on workflow
                            and approvals.
                        </li>

                        <li>
                            The author grants
                            publishing and
                            distribution rights to
                            ZCAD Publication
                            during the contract
                            period.
                        </li>

                        <li>
                            Royalty payments will
                            be transferred to the
                            author's registered
                            bank account based on
                            the agreed payment
                            terms.
                        </li>

                        <li>
                            The author can track
                            the complete
                            publishing workflow
                            from the dashboard.
                        </li>

                        <li>
                            Any legal or copyright
                            dispute related to the
                            manuscript will remain
                            the responsibility of
                            the author.
                        </li>

                        <li>
                            ZCAD Publication
                            reserves the right to
                            reject or pause
                            publishing in case of
                            policy or copyright
                            violations.
                        </li>
                    </ul>
                </div>

                {/* SIGNATURE */}

                <div className='grid grid-cols-2 gap-10 mt-16'>
                    <div>
                        <p className='font-semibold mb-10'>
                            Author Signature
                        </p>

                        <div className='border-b'></div>

                        <p className='mt-3 text-sm'>
                            Name:{' '}
                            {
                                book?.authorId
                                    ?.firstName
                            }{' '}
                            {
                                book?.authorId
                                    ?.lastName
                            }
                        </p>
                    </div>

                    <div>
                        <p className='font-semibold mb-10'>
                            Publisher Signature
                        </p>

                        <div className='border-b'></div>

                        <p className='mt-3 text-sm'>
                            ZCAD Publication
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewContract