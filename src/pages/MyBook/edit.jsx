import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const EditBook = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  })

  const [pdf, setPdf] = useState(null)

  const [coverImage, setCoverImage] = useState(null)

  const [previewImage, setPreviewImage] = useState('')

  // =========================================
  // FETCH SINGLE BOOK
  // =========================================

  const fetchBook = async () => {
    try {
      setLoading(true)

      const response = await axiosAuthInstance.get(
        `/book/get-book/${id}`,
      )

      const book = response.data.result

      setFormData({
        title: book.title || '',
        description: book.description || '',
        category: book.category || '',
      })

      setPreviewImage(book.coverImage)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // =========================================
  // HANDLE IMAGE
  // =========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setCoverImage(file)

      setPreviewImage(URL.createObjectURL(file))
    }
  }

  // =========================================
  // HANDLE PDF
  // =========================================

  const handlePdfChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setPdf(file)
    }
  }

  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const submitData = new FormData()

      submitData.append('title', formData.title)

      submitData.append(
        'description',
        formData.description,
      )

      submitData.append(
        'category',
        formData.category,
      )

      if (pdf) {
        submitData.append('pdf', pdf)
      }

      if (coverImage) {
        submitData.append(
          'coverImage',
          coverImage,
        )
      }

      const response =
        await axiosAuthInstance.put(
          `/book/update-book/${id}`,
          submitData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          },
        )

      if (response.data.success) {
        navigate('/my-books')
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
    fetchBook()
  }, [])

  return (
    <div className='p-4'>
      <div className='bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-6'>
          Edit Book
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          {/* TITLE */}

          <div>
            <label className='block mb-2 font-medium'>
              Book Title
            </label>

            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2'
              placeholder='Enter book title'
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className='block mb-2 font-medium'>
              Category
            </label>

            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2'
              placeholder='Enter category'
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className='block mb-2 font-medium'>
              Description
            </label>

            <textarea
              name='description'
              rows='5'
              value={formData.description}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-2'
              placeholder='Enter description'
            />
          </div>

          {/* COVER IMAGE */}

          <div>
            <label className='block mb-2 font-medium'>
              Cover Image
            </label>

            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />

            {previewImage && (
              <img
                src={previewImage}
                alt='preview'
                className='w-32 h-40 object-cover rounded mt-3 border'
              />
            )}
          </div>

          {/* PDF */}

          <div>
            <label className='block mb-2 font-medium'>
              PDF File
            </label>

            <input
              type='file'
              accept='.pdf'
              onChange={handlePdfChange}
            />

            {pdf && (
              <p className='text-sm mt-2 text-gray-600'>
                {pdf.name}
              </p>
            )}
          </div>

          {/* BUTTON */}

          <button
            type='submit'
            disabled={loading}
            className='text-primary-50 bg-primary-600 px-6 py-2 rounded-lg mx-auto block'
          >
            {loading
              ? 'Updating...'
              : 'Update Book'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditBook