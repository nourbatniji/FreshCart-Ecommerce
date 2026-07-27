import React from 'react'

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm h-[430px] flex flex-col p-4 animate-pulse">
      <div className="h-52 rounded-xl bg-gray-150 mb-3" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-gray-150" />
          <div className="h-4 w-full rounded bg-gray-150" />
          <div className="h-4 w-2/3 rounded bg-gray-150" />
        </div>
        <div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-5 w-16 rounded bg-gray-150" />
            <div className="h-5 w-10 rounded bg-gray-150" />
          </div>
          <div className="h-10 w-full rounded-xl bg-gray-150 mt-4" />
        </div>
      </div>
    </div>
  )
}
