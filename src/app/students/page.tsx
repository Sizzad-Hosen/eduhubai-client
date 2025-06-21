import ProtectedRoute from '@/components/ProtectedRoute'
import StudentsDataPage from '@/pages/userManagement/StudentData'
import React from 'react'

const StudentsData = () => {
  return (


    <ProtectedRoute>
  <StudentsDataPage></StudentsDataPage>
 </ProtectedRoute>
  )
}

export default StudentsData