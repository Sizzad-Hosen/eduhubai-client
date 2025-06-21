import ProtectedRoute from '@/components/ProtectedRoute'
import TeachersDataPage from '@/pages/userManagement/TeachersData'
import React from 'react'

const TeachersData = () => {
  return (

  
    <ProtectedRoute>
   <TeachersDataPage></TeachersDataPage>
 </ProtectedRoute>
  )
}

export default TeachersData