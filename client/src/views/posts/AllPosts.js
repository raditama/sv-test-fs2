import React, { useState, useEffect } from 'react';
import {
    CButton,
    CNav,
    CNavItem,
    CNavLink,
    CCard,
    CCardBody,
    CTabs,
    CTabContent,
    CPagination,
    CCol,
    CAlert,
    CFormGroup,
    CInput,
    CFormText,
    CTextarea,
    CCardGroup,
    CCardHeader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PostServices from './Services';

const AllPosts = () => {
    const [tab, setTab] = useState(1)
    const [listData, setListData] = useState([])
    const [page, setPage] = useState(1)
    const [totalData, setTotalData] = useState({ publish: 0, draft: 0, thrash: 0 })
    const [totalPage, setTotalPage] = useState(0)
    const [isEdit, setIsEdit] = useState(false)

    const [successTrashed, setSuccessTrashed] = useState(0)
    const [successEdit, setSuccessEdit] = useState(0)

    const [editId, setEditId] = useState(null)
    const [inputTitle, setInputTitle] = useState('')
    const [inputContent, setInputContent] = useState('')
    const [inputCategory, setInputCategory] = useState('')
    const [isButton, setIsButton] = useState(true)

    useEffect(() => {
        if (inputTitle.length >= 20 && inputContent.length >= 200 && inputCategory.length >= 3) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }
    }, [inputTitle, inputContent, inputCategory])

    useEffect(() => {
        var status = ''
        var offset = (page - 1) * 5
        if (tab === 1) { status = 'publish' }
        if (tab === 2) { status = 'draft' }
        if (tab === 3) { status = 'thrash' }

        PostServices.getList(status, 5, offset).then(res => {
            console.log(res)
            setListData(res.data)
        })

    }, [tab, page, successTrashed, successEdit])

    useEffect(() => {
        async function getCount() {
            var totalPublish = 0;
            var totalDraft = 0;
            var totalThrash = 0;

            await PostServices.getCount('publish').then(res => {
                totalPublish = res.data[0].Count
            })
            await PostServices.getCount('draft').then(res => {
                totalDraft = res.data[0].Count
            })
            await PostServices.getCount('thrash').then(res => {
                totalThrash = res.data[0].Count
            })

            setTotalData({ publish: totalPublish, draft: totalDraft, thrash: totalThrash });
        }
        getCount();
    }, [successTrashed, successEdit])

    useEffect(() => {
        var temp = 0

        if (tab === 1) { (totalData.publish % 5 > 0) ? temp = parseInt(totalData.publish / 5 + 1) : temp = parseInt(totalData.publish / 5) }
        if (tab === 2) { (totalData.draft % 5 > 0) ? temp = parseInt(totalData.draft / 5 + 1) : temp = parseInt(totalData.draft / 5) }
        if (tab === 3) { (totalData.thrash % 5 > 0) ? temp = parseInt(totalData.thrash / 5 + 1) : temp = parseInt(totalData.thrash / 5) }

        setTotalPage(temp)
    }, [tab, listData, totalData])

    useEffect(() => {
        setPage(1)
    }, [tab])

    const chrashAction = (e) => {
        const body = {
            Title: e.Title,
            Content: e.Content,
            Category: e.Category,
            Status: 'thrash'
        }

        PostServices.updateData(e.Id, body).then(res => {
            console.log(res)
            if (res.data.Code === 200) {
                setSuccessTrashed(1)
            }
        })
    }

    const submitEdit = (postType) => {
        const body = {
            Title: inputTitle,
            Content: inputContent,
            Category: inputCategory,
            Status: postType
        }

        PostServices.updateData(editId, body).then(res => {
            console.log(res)
            if (res.data.Code === 200) {
                setSuccessEdit(1)
                setIsEdit(false)
                setInputTitle('')
                setInputContent('')
                setInputCategory('')
            }
        })
    }

    const editAction = (data) => {
        setIsEdit(true)
        setEditId(data.Id)
        setInputTitle(data.Title)
        setInputContent(data.Content)
        setInputCategory(data.Category)
    }

    const backEditAction = () => {
        setIsEdit(false)
        setEditId(null)
        setInputTitle('')
        setInputContent('')
        setInputCategory('')
    }

    const tableComponent = () => {
        return (
            <CCol xs="12" md="12" className="mb-4">
                <CCard>
                    <CCardBody>
                        <CTabs>
                            <CNav variant="tabs" style={{ marginBottom: '20px' }}>
                                <CNavItem onClick={() => setTab(1)}>
                                    <CNavLink>
                                        Published ({totalData.publish})
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem onClick={() => setTab(2)}>
                                    <CNavLink>
                                        Drafts ({totalData.draft})
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem onClick={() => setTab(3)}>
                                    <CNavLink>
                                        Trashed ({totalData.thrash})
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent>
                                <div style={{ backgroundColor: '#676FA3', height: '50px', width: '100%', display: 'flex' }}>
                                    <div style={{ width: '35%', marginLeft: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Title</text>
                                    </div>
                                    <div style={{ width: '35%', marginLeft: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Category</text>
                                    </div>
                                    <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Action</text>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: '#ffffff', minHeight: '50px', width: '100%', display: 'flex', flexDirection: 'column', padding: '3px 0' }}>
                                    {listData?.map((value, key) => {
                                        return (
                                            <div style={{ backgroundColor: '#EEF2FF', minHeight: '50px', width: '100%', display: 'flex', margin: '3px 0' }}>
                                                <div style={{ width: '35%', display: 'flex', justifyContent: 'flex-start', padding: '20px', alignItems: 'center' }}>
                                                    <text style={{ fontSize: '12px', color: '#4f5d73' }}>{value.Title}</text>
                                                </div>
                                                <div style={{ width: '35%', display: 'flex', justifyContent: 'flex-start', padding: '20px', alignItems: 'center' }}>
                                                    <text style={{ fontSize: '12px', color: '#4f5d73' }}>{value.Category}</text>
                                                </div>
                                                <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CButton variant="ghost" color="info" size="sm" style={{ margin: '0 5px' }}>
                                                        <CIcon onClick={() => editAction(value)} name="cil-pencil" />
                                                    </CButton>
                                                    <CButton onClick={() => chrashAction(value)} variant="ghost" color="danger" size="sm" style={{ margin: '0 5px' }}>
                                                        <CIcon name="cil-trash" />
                                                    </CButton>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div style={{ backgroundColor: '#676FA3', height: '50px', width: '100%', display: 'flex', padding: '20px', justifyContent: 'flex-end', alignItems: 'center' }} >
                                    <CPagination
                                        style={{ marginTop: '16px' }}
                                        activePage={page}
                                        pages={totalPage}
                                        onActivePageChange={setPage}
                                        size="sm"
                                    />
                                </div>
                            </CTabContent>
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }

    const editComponent = () => {
        return (
            <CCol xs="12" md="12" className="mb-4">
                <CCard>
                    <CCardHeader>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CButton style={{ position: 'absolute', left: '10px', marginBottom: '0px' }} variant="ghost" color="primary" size="sm" onClick={() => backEditAction()}>
                                {'<'} Back
                            </CButton>
                            Edit Article
                        </div>

                    </CCardHeader>
                    <CCardBody>
                        <CTabs>
                            <CFormGroup>
                                <CInput onChange={(e) => setInputTitle(e.target.value)} placeholder="Enter your title" defaultValue={inputTitle} />
                                <CFormText>
                                    Title min 20 character! {inputTitle.length}/20 {inputTitle.length >= 20 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                </CFormText>
                            </CFormGroup>

                            <CFormGroup>
                                <CTextarea
                                    name="textarea-input"
                                    rows="8"
                                    placeholder="Content..."
                                    onChange={(e) => setInputContent(e.target.value)}
                                    defaultValue={inputContent}
                                />
                                <CFormText>
                                    Content min 200 character! {inputContent.length}/200 {inputContent.length >= 200 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                </CFormText>
                            </CFormGroup>

                            <CFormGroup>
                                <CInput onChange={(e) => setInputCategory(e.target.value)} placeholder="Enter your category" defaultValue={inputCategory} />
                                <CFormText>
                                    Category min 3 character! {inputCategory.length}/3 {inputCategory.length >= 3 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                </CFormText>
                            </CFormGroup>

                            <CCardGroup>
                                <CButton color="success" disabled={isButton} onClick={() => submitEdit('publish')}>
                                    Publish
                                </CButton>
                                <CButton color="warning" style={{ marginLeft: '10px' }} disabled={isButton} onClick={() => submitEdit('draft')}>
                                    Draft
                                </CButton>
                            </CCardGroup>
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }

    return (
        <div>
            <CAlert
                color="success"
                show={successTrashed}
                closeButton
                onShowChange={setSuccessTrashed}
            >
                Trashed article success!
            </CAlert>
            <CAlert
                color="success"
                show={successEdit}
                closeButton
                onShowChange={setSuccessEdit}
            >
                Edit article success!
            </CAlert>
            {isEdit ? editComponent() : tableComponent()}
        </div>
    )
}

export default AllPosts;