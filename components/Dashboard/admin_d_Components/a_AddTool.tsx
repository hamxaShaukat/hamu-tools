import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const AddToolAdmin = (props: Props) => {
  return (
    <>
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Tools Inventory</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no tools
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a tool and that tool get approved.
              </p>
              <Button className="mt-4 items-center gap-x-3">
              <PlusCircle className="h-3.5 w-3.5" />
              Add tool</Button>
            </div>
          </div>
        </main>
    </>
  )
}

export default AddToolAdmin