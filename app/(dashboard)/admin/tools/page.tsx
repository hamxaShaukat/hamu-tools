import ToolListAdmin from '@/components/Dashboard/admin_d_Components/a_ToolList'
import React from 'react'

type Props = {}

const ToolPageAdmin = (props: Props) => {
  let toolsnum=10;
  return (
    <div>
      <ToolListAdmin key="/admin/tools" />
    </div>
  )
}

export default ToolPageAdmin