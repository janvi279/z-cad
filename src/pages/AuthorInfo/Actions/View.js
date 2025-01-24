import React, { useEffect, useState } from 'react'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { useParams } from 'react-router-dom'
import { formatTimeWithAmPm } from '../../../utils/helper'

const View = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchAuthorInfoData = async () => {
        try {
            const response = await axiosAuthInstance.get(`author/get-user/${id}`)
            if (response.status === 200) {
                setData(response.data.result);
            }
        } catch (error) {
            console.error('Error fetching author info', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAuthorInfoData()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>No Author Info found.</div>
    }


    return (
        <div className='p-4'>
            <div className='bg-white text-black shadow-md rounded-lg p-6'>

                <h2 className='text-xl font-semibold mb-2 text-primary-500'>Author Detail</h2>
                <div className='overflow-x-auto'>
                    <table className='table-auto w-full border-collapse'>
                        <tbody>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Avtar</td>
                                <td className='border-b px-4 py-2'>{data.avtar ? (
                                    <img
                                        src={data.avtar}
                                        alt='avtar'
                                        className='my-2 w-24 h-24 sm:w-32 sm:h-32 object-contain'
                                    />
                                ) : (
                                    <span> No Photo available </span>
                                )}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Full Name</td>
                                <td className='border-b px-4 py-2'>{data.firstName}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Last Name</td>
                                <td className='border-b px-4 py-2'>{data.lastName}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Email</td>
                                <td className='border-b px-4 py-2'>{data.email}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Mobile No.</td>
                                <td className='border-b px-4 py-2'>{data.phone}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Author Status</td>
                                <td
                                    className={`border-b px-4 py-2 font-bold ${data.status === 1 ? 'text-red-500' : 'text-green-500'
                                        }`}
                                >
                                    {data.status === 1 ? 'Not Approved' : 'Approved'}
                                </td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>about</td>
                                <td className='border-b px-4 py-2'>{data.about}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Twitter</td>
                                <td className='border-b px-4 py-2'>{data.twitter}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Facebook</td>
                                <td className='border-b px-4 py-2'>{data.facebook}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Instagram</td>
                                <td className='border-b px-4 py-2'>{data.instagram}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Youtube</td>
                                <td className='border-b px-4 py-2'>{data.youtube}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>LinkedIn</td>
                                <td className='border-b px-4 py-2'>{data.linkedin}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Google Plus</td>
                                <td className='border-b px-4 py-2'>{data.googlePlus}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Snapchat</td>
                                <td className='border-b px-4 py-2'>{data.snapchat}</td>
                            </tr>
                            <tr>
                                <td className='border-b px-4 py-2 font-medium'>Pinterest</td>
                                <td className='border-b px-4 py-2'>{data.pinterest}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {data.address && (
                    <>
                        <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Address Detail</h2>
                        <div className='overflow-x-auto'>
                            <table className='table-auto w-full border-collapse'>
                                <tbody>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>First Name</td>
                                        <td className='border-b px-4 py-2'>{data.address.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Last Name</td>
                                        <td className='border-b px-4 py-2'>{data.address.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Address</td>
                                        <td className='border-b px-4 py-2'>{data.address.address}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Address 2</td>
                                        <td className='border-b px-4 py-2'>{data.address.address2}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Country</td>
                                        <td className='border-b px-4 py-2'>{data.address.country}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>State</td>
                                        <td className='border-b px-4 py-2'>{data.address.state}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>City</td>
                                        <td className='border-b px-4 py-2'>{data.address.city}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Post Code</td>
                                        <td className='border-b px-4 py-2'>{data.address.postCode}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Frist Name</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingFirstName}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Last Name</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippinglastName}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Address</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingAddress}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Address 2</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingAddress2}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Country</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingcountry}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping State</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingstate}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping City</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingcity}</td>
                                    </tr>
                                    <tr>
                                        <td className='border-b px-4 py-2 font-medium'>Shipping Post Code</td>
                                        <td className='border-b px-4 py-2'>{data.address.shippingPostCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )
                }
                {
                    data.settingStore && (
                        <>
                            <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Setting Store Detail</h2>
                            <div className='overflow-x-auto'>
                                <table className='table-auto w-full border-collapse'>
                                    <tbody>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Email</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.email}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Mobile No.</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.phone}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Logo</td>
                                            <td className='border-b px-4 py-2'>
                                                {data.settingStore.logo ? (
                                                    <img src={data.settingStore.logo} alt='Logo' className='w-24 h-24 sm:w-32 sm:h-32 object-contain' />
                                                ) : (
                                                    <span>No Logo available</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Banner Type</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.bannerType}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Store Banner</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.storeBanner ? (
                                                <img src={data.settingStore.storeBanner} alt='Logo' className='w-24 h-24 sm:w-32 sm:h-32 object-contain' />
                                            ) : (
                                                <span>No Logo available</span>
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Mobile Banner</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.mobileBanner ?
                                                (
                                                    <img src={data.settingStore.mobileBanner} alt='Logo' className='w-24 h-24 sm:w-32 sm:h-32 object-contain' />
                                                ) : (
                                                    <span>No Logo available</span>
                                                )}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Video Banner</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.videoBanner ? (
                                                <video
                                                    src={data.settingStore.videoBanner}
                                                    controls
                                                    className='w-32 h-32 sm:w-48 sm:h-48 object-contain'
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <span>No Video available</span>
                                            )
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Slider Banner Link</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.silderBannerLink}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Store List Banner Type</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.storeListBannerType}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Store List Banner</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.storeListBanner ? (
                                                <img src={data.settingStore.storeListBanner} alt='Logo' className='w-24 h-24 sm:w-32 sm:h-32 object-contain' />
                                            ) : (
                                                <span>No Logo available</span>
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Store List Video Banner</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.storeListVideoBanner ? (
                                                <video
                                                    src={data.settingStore.videoBanner}
                                                    controls
                                                    className='w-32 h-32 sm:w-48 sm:h-48 object-contain'
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (<span>No Video available</span>)}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Shop Description</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.shopDescription}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Author Name Position</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.authorNamePosition}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Product Per Page</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.productPerPage}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Hide Email</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.hideEmail ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Hide Mobile</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.hideMobile ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Hide Address</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.hideAddress ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Hide Map</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.hideMap ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td className='border-b px-4 py-2 font-medium'>Hide About</td>
                                            <td className='border-b px-4 py-2'>{data.settingStore.hideAbout ? 'Yes' : 'No'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }

                {data.settingLocation && (<>
                    <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Setting Location Detail</h2>
                    <div className='overflow-x-auto'>
                        <table className='table-auto w-full border-collapse'>
                            <tbody>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Street</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.street}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Street 2</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.street2}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>City</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.city}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>ZIP Code</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.zip}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>State</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.state}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Country</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.country}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Location</td>
                                    <td className='border-b px-4 py-2'>{data.settingLocation.location}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>)}

                {data.settingPayment && (<>
                    <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Setting Payment Detail</h2>
                    <div className='overflow-x-auto'>
                        <table className='table-auto w-full border-collapse'>
                            <tbody>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Payment Method</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Paypal Email</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.paypalEmail}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Account Name</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.accountName}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Account Number</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Bank Name</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.bankName}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Bank Address</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.bankAddress}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Routing Number</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.routingNumber}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>IBAN</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.iban}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>SWIFT Code</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.swiftCode}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>IFSC Code</td>
                                    <td className='border-b px-4 py-2'>{data.settingPayment.ifscCode}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>)}

                {data.settingSeo && (<>
                    <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Setting SEO Detail</h2>
                    <div className='overflow-x-auto'>
                        <table className='table-auto w-full border-collapse'>
                            <tbody>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>SEO Title</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.seoTitle}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Meta Description</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.metaDescription}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Meta Keywords</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.metaKeyword}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Facebook Title</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.facebookTitle}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Facebook Description</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.facebookDescription}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Facebook Image</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.facebookImage ? (
                                        <img
                                            src={data.settingSeo.facebookImage}
                                            alt="Facebook Image"
                                            className='my-2 w-24 h-24 sm:w-32 sm:h-32 object-contain'
                                        />
                                    ) : 'No image available'}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Twitter Title</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.twitterTitle}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Twitter Description</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.twitterDescription}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Twitter Image</td>
                                    <td className='border-b px-4 py-2'>{data.settingSeo.twitterImage ? (
                                        <img
                                            src={data.settingSeo.twitterImage}
                                            alt="Twitter Image"
                                            className='my-2 w-24 h-24 sm:w-32 sm:h-32 object-contain'
                                        />
                                    ) : 'No image available'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>)}
                {data.settingStoreHours && (<>
                    <h2 className='text-xl font-semibold text-primary-500 mb-2 mt-5'>Setting Store Hours Detail</h2>
                    <div className='overflow-x-auto'>
                        <table className='table-auto w-full border-collapse'>
                            <tbody>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Enable Store</td>
                                    <td className='border-b px-4 py-2'>{data.settingStoreHours.enableStore ? 'Yes' : 'No'}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Disable Purchase Off Time</td>
                                    <td className='border-b px-4 py-2'>{data?.settingStoreHours?.disablePurchaseOffTime ? 'Yes' : 'No'}</td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Set Week Off</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.setWeekOff) && data.settingStoreHours.setWeekOff.length > 0
                                            ? data.settingStoreHours.setWeekOff.join(', ')
                                            : 'N/A'}
                                    </td>
                                </tr>


                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Monday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.mondayOpeningTime) && data?.settingStoreHours?.mondayOpeningTime.length > 0
                                            ? data.settingStoreHours.mondayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Monday Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.mondayClosingTime) && data?.settingStoreHours?.mondayClosingTime.length > 0
                                            ? data.settingStoreHours.mondayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Tuesday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.tuesdayOpeningTime) && data?.settingStoreHours?.tuesdayOpeningTime.length > 0
                                            ? data.settingStoreHours.tuesdayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Tuesday Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.tuesdayClosingTime) && data?.settingStoreHours?.tuesdayClosingTime.length > 0
                                            ? data.settingStoreHours.tuesdayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Wednesday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.wednesdayOpeningTime) && data?.settingStoreHours?.wednesdayOpeningTime.length > 0
                                            ? data.settingStoreHours.wednesdayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>WednesDay Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.wednesdayClosingTime) && data?.settingStoreHours?.wednesdayClosingTime.length > 0
                                            ? data.settingStoreHours.wednesdayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Thursday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.thursdayOpeningTime) && data?.settingStoreHours?.thursdayOpeningTime.length > 0
                                            ? data.settingStoreHours.thursdayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>ThursDay Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.thursdayClosingTime) && data?.settingStoreHours?.thursdayClosingTime.length > 0
                                            ? data.settingStoreHours.thursdayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Friday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.fridayOpeningTime) && data?.settingStoreHours?.fridayOpeningTime.length > 0
                                            ? data.settingStoreHours.fridayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Friday Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.fridayClosingTime) && data?.settingStoreHours?.fridayClosingTime.length > 0
                                            ? data.settingStoreHours.fridayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Saturday Opening Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.saturdayOpeningTime) && data?.settingStoreHours?.saturdayOpeningTime.length > 0
                                            ? data.settingStoreHours.saturdayOpeningTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-b px-4 py-2 font-medium'>Saturday Closing Time</td>
                                    <td className='border-b px-4 py-2'>
                                        {Array.isArray(data?.settingStoreHours?.saturdayClosingTime) && data?.settingStoreHours?.saturdayClosingTime.length > 0
                                            ? data.settingStoreHours.saturdayClosingTime.map((time, index) => {
                                                return (
                                                    <div key={index}>
                                                        {time?.time ? formatTimeWithAmPm(time.time) : 'No time set'}
                                                    </div>
                                                );
                                            })
                                            : 'No time set'}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </>)}
            </div>
        </div>
    )
}

export default View