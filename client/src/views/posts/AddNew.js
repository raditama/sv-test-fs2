import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCardGroup,
    CAlert,
    CFormText,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PostServices from './Services';

const AddNew = () => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [isButton, setIsButton] = useState(true);
    const [showSuccess, setShowSuccess] = useState(0);
    const [showError, setShowError] = useState(0);

    useEffect(() => {
        if (inputTitle.length >= 20 && inputContent.length >= 200 && inputCategory.length >= 3) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }
    }, [inputTitle, inputContent, inputCategory])

    const submitPost = (postType) => {
        const body = {
            Title: inputTitle,
            Content: inputContent,
            Category: inputCategory,
            Status: postType,
        }

        PostServices.createData(body).then(res => {
            console.log(res);
            if (res.data.Code === 200) {
                setShowSuccess(1);
                resetInput();
            } else {
                setShowError(1);
            }
        })
    }

    const resetInput = () => {
        setInputTitle("");
        setInputContent("");
        setInputCategory("");
    }

    return (
        <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
            <CAlert
                color="success"
                show={showSuccess}
                closeButton
                onShowChange={setShowSuccess}
            >
                Add post success!
            </CAlert>
            <CAlert
                color="danger"
                show={showError}
                closeButton
                onShowChange={setShowError}
            >
                Add post error!
            </CAlert>

            <CFormGroup>
                <CLabel>Title</CLabel>
                <CInput onChange={(e) => setInputTitle(e.target.value)} placeholder="Enter your title" value={inputTitle} />
                <CFormText>
                    Title min 20 character! {inputTitle.length}/20 {inputTitle.length >= 20 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                </CFormText>
            </CFormGroup>

            <CFormGroup>
                <CLabel>Content</CLabel>
                <CTextarea
                    name="textarea-input"
                    rows="8"
                    placeholder="Content..."
                    onChange={(e) => setInputContent(e.target.value)}
                    value={inputContent}
                />
                <CFormText>
                    Content min 200 character! {inputContent.length}/200 {inputContent.length >= 200 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                </CFormText>
            </CFormGroup>

            <CFormGroup>
                <CLabel>Category</CLabel>
                <CInput onChange={(e) => setInputCategory(e.target.value)} placeholder="Enter your category" value={inputCategory} />
                <CFormText>
                    Category min 3 character! {inputCategory.length}/3 {inputCategory.length >= 3 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                </CFormText>
            </CFormGroup>

            <CCardGroup>
                <CButton
                    color="success"
                    disabled={isButton}
                    onClick={() => submitPost('publish')}
                >
                    Publish
                </CButton>
                <CButton
                    color="warning"
                    style={{ marginLeft: '10px' }}
                    disabled={isButton}
                    onClick={() => submitPost('draft')}
                >
                    Draft
                </CButton>
            </CCardGroup>
        </div>
    )
}

export default AddNew;