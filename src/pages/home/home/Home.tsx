import React from 'react'
import Banner from '../banner'
import ReviewPage from '../Review'
import FilterData from '../filterData'


const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <FilterData></FilterData>
      <ReviewPage></ReviewPage>
    </>
  )
}

export default HomePage