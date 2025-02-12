import React from 'react'
import  {CircleLoader} from 'react-spinners'

function Loader() {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <CircleLoader />
        </div>
    )
}

export default Loader