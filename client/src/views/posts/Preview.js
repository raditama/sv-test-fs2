import React, { useState, useEffect } from 'react';
import {
    CCardHeader,
    CPagination
} from '@coreui/react';
import PostServices from './Services';

const Preview = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState(null)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        PostServices.getList('publish', 1, page - 1).then(res => {
            console.log(res)
            setData(res.data)
        })

        PostServices.getCount('publish').then(res => {
            console.log(res)
            setTotalPage(res.data[0].Count)
        })

        setPage(page)
    }, [page])

    return (
        <div style={{ backgroundColor: '#ffffff', padding: '10px' }}>
            <CCardHeader>
                Preview Article
            </CCardHeader>

            {data != null ?
                <div style={{ padding: '0 60px' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                        <h4>{data[0].Title}</h4>
                    </div>

                    <div style={{ margin: '40px 0', overflow: 'auto' }}>
                        <h6 style={{ marginBottom: '20px' }}>Category: {data[0].Category}</h6>
                        <p>{data[0].Content}</p>
                    </div>
                </div> : null
            }
            <div style={{ backgroundColor: '#676FA3', height: '50px', width: '100%', display: 'flex', padding: '20px', justifyContent: 'flex-end', alignItems: 'center' }} >
                <CPagination
                    style={{ marginTop: '16px' }}
                    activePage={page}
                    pages={totalPage}
                    onActivePageChange={setPage}
                    size="sm"
                />
            </div>
        </div>
    )
}

export default Preview;