import React from 'react'
import Banner from '../banner'
import ReviewPage from '../Review'
import FilterData from '../filterData'
import About from '@/pages/about/About'


const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <FilterData></FilterData>
      <ReviewPage></ReviewPage>
      <About></About>
    </>
  )
}

export default HomePage