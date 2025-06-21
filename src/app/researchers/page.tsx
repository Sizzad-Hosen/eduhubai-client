import ProtectedRoute from '@/components/ProtectedRoute'
import ResearchersDataPage from '@/pages/userManagement/ResearchersData'
import React from 'react'

const ResearchersData = () => {
  return (
    <ProtectedRoute>
 <ResearchersDataPage></ResearchersDataPage>
 </ProtectedRoute>

  )
}

export default ResearchersData