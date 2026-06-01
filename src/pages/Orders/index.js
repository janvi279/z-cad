import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { useLoading } from '../../Context/LoadingContext'
import { AiOutlineEye } from 'react-icons/ai'

// Modular component for order detail item
const OrderDetailItem = ({ label, value }) => (
  <div className='grid grid-cols-2 gap-2'>
    <p className='font-semibold'>{label}:</p>
    <div>{value}</div>
  </div>
)

const Orders = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { setLoading } = useLoading()

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch Orders
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axiosAuthInstance.get('shopify/order')
      if (response?.status === 200) {
        setData(response.data.orders)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const filteredData = data.filter((item) =>
    item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startIndex = (page - 1) * perPage
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage)
  const totalSales = data.reduce(
    (acc, order) => acc + Number(order.TotalPrice || 0),
    0,
  )

  // Columns
  const columns = [
    {
      name: 'OrderId',
      selector: (row) => row.orderId || '-',
    },
    { name: 'Customer Name', selector: (row) => row.customer_name },
    { name: 'Email', selector: (row) => row.email },
    {
      name: 'Order Confirm',
      selector: (row) => (row.orderConfirm ? 'Yes' : 'No'),
    },
    { name: 'Items Sold', selector: (row) => row.itemsSold },
    {
      name: 'Product Price',
      selector: (row) =>
        row.products && row.products.length > 0
          ? `₹${row.products.reduce((sum, item) => sum + (item.productPrice || 0), 0)}`
          : '₹0',
    },
    { name: 'Total Price', selector: (row) => row.TotalPrice },
    { name: 'Order No.', selector: (row) => row.orderNo?.replace('#', '') },
    {
      name: 'Action',
      cell: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className='text-blue-500 hover:text-blue-700'
          title='View Details'
        >
          <AiOutlineEye size={22} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  // Open modal and show selected order
  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setShowModal(false)
  }

  return (
    <>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Orders
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex justify-between gap-4 items-center mb-4'>
          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg mr-auto'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className='text-lg font-semibold'>
            Total Sales: ₹{totalSales.toLocaleString()}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={paginatedData}
          pagination
          paginationServer
          paginationTotalRows={filteredData.length}
          paginationPerPage={perPage}
          paginationDefaultPage={page}
          onChangePage={(newPage) => setPage(newPage)}
          onChangeRowsPerPage={(newPerPage) => {
            setPerPage(newPerPage)
            setPage(1)
          }}
        />
      </div>

      {/* ✅ Order Details Modal */}
      {showModal && selectedOrder && (
        <div className='fixed inset-0 bg-white shadow bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto p-6'>
            <h2 className='text-xl font-semibold mb-4 text-primary-600'>
              Order Details — #{selectedOrder.orderNo?.replace('#', '')}
            </h2>

            <div className='mb-4 space-y-1'>
              {[
                { label: 'Customer Name', value: selectedOrder.customer_name },
                { label: 'Email', value: selectedOrder.email },
                { label: 'Total Price', value: `₹${selectedOrder.TotalPrice}` },
                { label: 'Items Sold', value: selectedOrder.itemsSold },
                {
                  label: 'Order Confirm',
                  value: selectedOrder.orderConfirm ? 'Yes' : 'No',
                },
              ].map((field, index) => (
                <OrderDetailItem
                  key={index}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>

            <hr className='my-4' />

            {/* Show products in this order */}
            <h3 className='text-lg font-semibold mb-2'>
              Products in this Order:
            </h3>
            {selectedOrder.products && selectedOrder.products.length > 0 ? (
              <ul className='list-disc pl-5 space-y-1'>
                {selectedOrder.products.map((item, idx) => (
                  <li key={idx}>
                    <div className='grid grid-cols-3 sm:grid-cols-4 items-center text-sm'>
                      <div className='col-span-2'>{item.productName}</div>
                      <div className='text-center'>Qty: {item.quantity}</div>
                      <div className='text-right'>
                        Price: ₹{item.productPrice}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-500'>No products found.</p>
            )}

            <div className='flex justify-end mt-6'>
              <button
                onClick={closeModal}
                className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Orders
