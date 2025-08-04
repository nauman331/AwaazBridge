import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentLayout: React.FC = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Outlet />
    </div>
  )
}

export default StudentLayout