import React from 'react'
import { Button } from '../ui/button'
import { IoMdLogOut } from 'react-icons/io'
import { doLogOut } from '@/lib/actions'

const Logout = () => {
  return (
    <form action={doLogOut}>
        <Button className='bg-slate-900 text-white rounded-2xl p-1 m-1 hover:bg-slate-50 hover:text-black text-lg' type='submit' >
        <IoMdLogOut /> Logout
        </Button>
    </form>
  )
}

export default Logout