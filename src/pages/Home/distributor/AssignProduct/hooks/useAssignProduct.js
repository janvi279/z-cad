import { useEffect, useState } from 'react'

import {
    getBooks,
    getDistributors,
    getAssignedProducts,
} from '../services/assignProductService'

export const useAssignProduct = (
  search
) => {
  console.log("🚀 ~ useAssignProduct ~ search:", search)
  const [books, setBooks] = useState([])

  const [distributors, setDistributors] = useState([])
  const [assignedProducts, setAssignedProducts] = useState([])

  const fetchData = async () => {
    try {
     const [booksRes, assignproductres, distributerRes] =
  await Promise.all([
    getBooks(),
    getAssignedProducts(search),
    getDistributors(),
  ]);
      console.log("🚀 ~ fetchData ~ distributerRes:", distributerRes)

      setBooks(booksRes.data.result.docs)

      setAssignedProducts(assignproductres.data?.products || [])
      setDistributors(distributerRes.data?.result?.docs || [])
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {
  const timer = setTimeout(() => {
    fetchData();
  }, 500);

  return () =>
    clearTimeout(timer);
}, [search]);

  return {
    books,
    assignedProducts,
    setAssignedProducts,
    distributors,
    
    fetchData,
  }
}
