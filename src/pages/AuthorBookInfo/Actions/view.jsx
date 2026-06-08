import React, { useEffect, useState } from 'react'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { useParams } from 'react-router-dom'

const BookView = () => {
  const { id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosAuthInstance.get(`/book/get-book/${id}`)

        if (response.status === 200) {
          setData(response.data.result)
        }
      } catch (error) {
        console.log('Error fetching book details', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No Book Found.</div>
  }

  return (
    <div className='p-4'>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-semibold mb-5 text-primary-500'>
          Book Detail
        </h2>

        <div className='overflow-x-auto'>
          <table className='table-auto w-full border-collapse'>
            <tbody>
              <tr>
                <td className='border-b px-4 py-3 font-medium'>Cover Image</td>

                <td className='border-b px-4 py-3'>
                  {data.coverImage ? (
                    <img
                      src={data.coverImage}
                      alt='cover'
                      className='w-32 h-40 object-cover rounded'
                    />
                  ) : (
                    <span>No Cover Image</span>
                  )}
                </td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Title</td>

                <td className='border-b px-4 py-3'>{data.title}</td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Description</td>

                <td className='border-b px-4 py-3'>{data.description}</td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Category</td>

                <td className='border-b px-4 py-3'>{data.category}</td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>PDF</td>

                <td className='border-b px-4 py-3'>
                  {data.pdf ? (
                    <a
                      href={data.pdf}
                      target='_blank'
                      rel='noreferrer'
                      className='text-blue-500 underline'
                    >
                      View PDF
                    </a>
                  ) : (
                    <span>No PDF Available</span>
                  )}
                </td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Author Name</td>

                <td className='border-b px-4 py-3'>
                  {data.authorId?.firstName} {data.authorId?.lastName}
                </td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Status</td>

                <td className='border-b px-4 py-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${data.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : data.status === 'Rejected'
                          ? 'bg-red-100 text-red-600'
                          : data.status === 'Published'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-yellow-100 text-yellow-600'
                      }`}
                  >
                    {data.status}
                  </span>
                </td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Admin Note</td>

                <td className='border-b px-4 py-3'>
                  {data.adminNote || 'No Note'}
                </td>
              </tr>

              <tr>
                <td className='border-b px-4 py-3 font-medium'>Created At</td>

                <td className='border-b px-4 py-3'>
                  {new Date(data.createdAt).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookView
