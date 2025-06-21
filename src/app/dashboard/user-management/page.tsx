"use client"

import ProtectedRoute from '@/components/ProtectedRoute'
import UserManagementPage from '@/pages/userManagement/UserManagement'
import React from 'react'

const UserManagement = () => {
  return (
  <ProtectedRoute allowedRoles={["admin"]}>
  <UserManagementPage />
</ProtectedRoute>
  )
}

export default UserManagement