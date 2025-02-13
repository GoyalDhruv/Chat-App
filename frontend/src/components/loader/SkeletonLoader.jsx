import { Skeleton } from '@mui/material'
import React from 'react'

function SkeletonLoader({ number }) {
    return (
        <>
            {Array.from({ length: number }, (_, index) => (
                <Skeleton key={index} height={40} />
            ))}
        </>
    )
}

export default SkeletonLoader