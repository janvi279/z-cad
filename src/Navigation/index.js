import Home from '../pages/Home'
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


const AllRoute = [
  { path: '/', element: <Home />, permission: { read: true } },
  { path: '/media', element: <Media />, permission: { read: true } },
  { path: '/products', element: <Products />, permission: { read: true } },
  { path: '/orders', element: <Orders />, permission: { read: true } },
  { path: '/refund', element: <Refund />, permission: { read: true } },
  { path: '/settings', element: <Settings />, permission: { read: true } },
  { path: '/payments', element: <Payments />, permission: { read: true } },
  { path: '/ledger-book', element: <LedgerBook />, permission: { read: true } },
  { path: '/reviews', element: <Reviews />, permission: { read: true } },
  { path: '/notifications', element: <Notifications />, permission: { read: true } },
  { path: '/profile', element: <Profile />, permission: { read: true } },

  { path: '/author-info', element: <AuthorInfo />, permission: {read: true}},
  { path: '/author-info/view/:id', element: <ViewAuthorInfo />, permission:{read:true}},
  { path: '/author-request', element: <AuthorRequest/>, permission:{read:true}},
]

export default AllRoute
