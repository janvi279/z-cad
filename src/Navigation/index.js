import Home from '../pages/Home'
import BookSubmit from '../pages/BookSubmit'
import Media from '../pages/Media'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import Refund from '../pages/Refund'
import Settings from '../pages/Settings'
import Payments from '../pages/Payments'
import LedgerBook from '../pages/LedgerBook'
import Reviews from '../pages/Reviews'
import Notifications from '../pages/Notifications'
import Profile from '../pages/Profile'
import AuthorInfo from '../pages/AuthorInfo/index'
import ViewAuthorInfo from '../pages/AuthorInfo/Actions/View'
import AuthorRequest from '../pages/AuthorRequest/index'
import AuthorBooks from '../pages/AuthorBookRequest'
import AuthorBookInfo from '../pages/AuthorBookInfo'
import BookView from '../pages/AuthorBookInfo/Actions/view'
import MyBook from '../pages/MyBook'
import EditBook from '../pages/MyBook/edit'
import ViewContract from '../pages/AuthorBookInfo/Actions/viewContract'
import InventoryAnalytics from '../pages/MyBook/InventoryAnalytics'

const AllRoute = [
  { path: '/', element: <Home />, permission: { read: true } },
  { path: '/submit-book', element: <BookSubmit />, permission: { read: true } },
  { path: '/media', element: <Media />, permission: { read: true } },
  { path: '/products', element: <Products />, permission: { read: true } },
  { path: '/orders', element: <Orders />, permission: { read: true } },
  { path: '/refund', element: <Refund />, permission: { read: true } },
  { path: '/settings', element: <Settings />, permission: { read: true } },
  { path: '/payments', element: <Payments />, permission: { read: true } },
  { path: '/ledger-book', element: <LedgerBook />, permission: { read: true } },
  { path: '/reviews', element: <Reviews />, permission: { read: true } },
  {
    path: '/notifications',
    element: <Notifications />,
    permission: { read: true },
  },
  { path: '/profile', element: <Profile />, permission: { read: true } },

  { path: '/author-info', element: <AuthorInfo />, permission: { read: true } },
  {
    path: '/author-info/view/:id',
    element: <ViewAuthorInfo />,
    permission: { read: true },
  },
  {
    path: '/author-request',
    element: <AuthorRequest />,
    permission: { read: true },
  },
  {
    path: '/author-book-info',
    element: <AuthorBookInfo />,
    permission: { read: true },
  },
    {
    path: '/author-book-info/view/:id',
    element: <ViewContract />,
    permission: { read: true },
  },
      {
    path: '/my-contract/view/:id',
    element: <ViewContract />,
    permission: { read: true },
  },
  {
    path: '/author-book-info/view/:id',
    element: <BookView />,
    permission: { read: true },
  },
  {
    path: '/author-book-request/view/:id',
    element: <BookView />,
    permission: { read: true },
  },
  {
    path: '/my-books/view/:id',
    element: <BookView />,
    permission: { read: true },
  },
  
  {
    path: '/author-book-request',
    element: <AuthorBooks />,
    permission: { read: true },
  },
  {
    path: '/my-books',
    element: <MyBook />,
    permission: { read: true },
  },
  {
    path: '/my-books/edit/:id',
    element: <EditBook />,
    permission: { read: true },
  },

  {
    path: '/my-books/analytics/:id',
    element: <InventoryAnalytics />,
    permission: { read: true },
  }
]

export default AllRoute
