'use client'
import React from 'react'
import Editblog from '../../components/Editblog'
import { useParams } from 'next/navigation'

function EditPage() {
  const params = useParams()
  const blogId = params.id

  return (
    <div className="min-h-screen bg-gray-50">
      <Editblog />
    </div>
  )
}

export default EditPage