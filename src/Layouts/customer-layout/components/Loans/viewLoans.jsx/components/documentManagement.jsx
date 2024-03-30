import { Button, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { BASE_URL, postRequest } from '../../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import reviewForm from "../../../../../../assets/exclamation-gif.gif"
import { defaultList } from './defaultDocumentList';

export default function LoanDocumentManagement(props) {

    const [openDropFileModal, setModal] = useState(false);
    const [openPreviewFileModal, setPreviewModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const { loanId } = useParams();
    const [blobUrl, setBlobUrl] = useState();
    const [isUploadStart, setUploadStart] = useState(false);
    const [previewDoc, setPreviewDoc] = useState();
    const [isAllUploladed, setAllDocsAdded] = useState(false);
    const [openReviewFileModal, setReviewModal] = useState(false);
    const [isReviewd, setIsReviewd] = useState(false);
    const [isDraft, setIsDraft] = useState(JSON.parse(localStorage.getItem(loanId + "0")) || false);
    const [documentList, setDocsList] = useState(props.documentsList.length == 0 ? defaultList : props.documentsList)
    const [file, uploadedFile] = useState();

    useEffect(() => {
        console.log(documentList)
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            const message = 'Your changes are not saved!';
            alert(message);
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, []);

    useEffect(()=>{
        setDocsList(props.documentsList.length == 0 ? defaultList : props.documentsList);
    },[props.documentsList])

    const dropZoneStyle = {
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '20px auto',
        width: '80%'
    };
    const onDrop = useCallback(acceptedFiles => {
        // Check if at least one file is dropped
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]; // Get the first dropped file

            // Check if the file type is PDF
            if (file.type === 'application/pdf') {
                // File is a PDF, proceed with creating blob URL
                let blobUrl = URL.createObjectURL(file);
                setBlobUrl(blobUrl);
                uploadedFile(acceptedFiles);
            } else {
                // File is not a PDF, show an error message or handle accordingly
                toast.error("Please upload only PDF docuemnt File.")
            }
        } else {
            // No file dropped, show an error message or handle accordingly
            toast.error("Please upload PDF File.")
        }
    }, []);


    const uploadDocuments = () => {
        let formData = new FormData();
        formData.append("loandocs", file[0]);
        postRequest(`/api/uploadloanDocs/${loanId}/${selectedDoc.document}`, formData, { 'Authorization': token }).then((response) => {
            if (response.data.status) {
                toast.success("Document Uploaded Successfully !");
            } else {
                toast.error(response.data.message)
            }
        })
    }

    const handlePreview = (item) => {
        setPreviewModal(true);
        setBlobUrl(item?.uploadedFileURL ? item?.uploadedFileURL : BASE_URL + "/" + item?.doc_path);
        setPreviewDoc(item.document);
    }

    const addDocumentToDraft = () => {
        if (file) {
            console.log(selectedDoc)
            let arr = documentList;
            let index = documentList.findIndex((x) => x.id == selectedDoc.id);
            selectedDoc["selectedFile"] = file[0]
            selectedDoc["uploadStatus"] = true
            selectedDoc["uploadedFileURL"] = blobUrl
            arr[index] = selectedDoc;
            if (index === documentList.length - 1) {
                setAllDocsAdded(true);
            }
            setUploadStart(true)
            uploadedFile(null);
            setDocsList(arr);
            setModal(!openDropFileModal);
            setSelectedDoc(null);
        } else {
            toast.error("Please Upload a File..")
        }
    }

    const reUploadfromPreview = () => {
        setBlobUrl("");
        uploadedFile(null);
    }

    const handleFileUploads = () => {
        if (!isReviewd) {
            setReviewModal(true);
            setIsReviewd(true);
        } else {
            let formData = new FormData();
            documentList.map((x) => {
                formData.append(`file${x.id}`, x.selectedFile);
            });
            postRequest(`/api/uploadloanDocs/${loanId}`, formData, { 'Authorization': token }).then((response) => {
                console.log(response);
                if(response.data.status == true){
                    toast.success("Document Upload Successfully !!");
                }else{
                    toast.error("Something Went Wrong !!")
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    // const saveAsaDraft = () => {
    //     if(!isDraft){
    //         setIsDraft(true);
    //         localStorage.setItem(loanId,JSON.stringify(documentList));
    //         localStorage.setItem(loanId+"0",JSON.stringify(true));
    //     }
    // }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div className='container-fluid'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Borrower's Documents</TableCell>
                                {props.documentsList.length != 0 && <TableCell>Uploaded Date</TableCell>}
                                {props.documentsList.length != 0 && <TableCell>Status</TableCell>}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documentList && documentList.map((x, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {x.document ? x.document : x.doc_type}
                                    </TableCell>
                                    {props.documentsList.length != 0 && <TableCell>
                                        {x.uploadedDate}
                                    </TableCell>}
                                    {props.documentsList.length != 0 && <TableCell>
                                        {x.verified ? 'Verified' : 'Pending'}
                                    </TableCell>}
                                    <TableCell>
                                        <div className='d-flex'>
                                            {!x.uploadStatus && <Button className='mx-2' variant='contained' onClick={() => { setModal(!openDropFileModal); setSelectedDoc(x) }}>
                                                Upload
                                            </Button>}
                                            {x.uploadStatus && <Button className='mx-2' variant='contained' onClick={() => handlePreview(x)} color='secondary'>
                                                Preview
                                            </Button>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {isAllUploladed && <div className=' mt-4 w-100 text-end'>
                    {/* {isDraft && <Button variant='contained' size='large' className='mx-2' color='success' onClick={saveAsaDraft}>Save As a Draft</Button>} */}
                    <Button variant='contained' size='large' className='mx-2' color='success' onClick={handleFileUploads}>Upload All Documents</Button>
                </div>}
                <Modal isOpen={openDropFileModal} >
                    <ModalHeader>Upload {selectedDoc?.document}</ModalHeader>
                    <ModalBody>
                        {!file && <div {...getRootProps()} style={dropZoneStyle}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>}
                        {file && <div>
                            <iframe src={blobUrl} width={'100%'} height={'500px'} frameborder="0"></iframe>
                        </div>}
                    </ModalBody>
                    <ModalFooter>
                        {file && <Button color="primary" variant='outlined' onClick={() => reUploadfromPreview()}>
                            Reupload
                        </Button>}
                        <Button color="primary" onClick={() => { setModal(!openDropFileModal); reUploadfromPreview() }}>
                            Cancle
                        </Button>
                        <Button color="primary" onClick={() => addDocumentToDraft()}>
                            Upload Document
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openPreviewFileModal}  >
                    <ModalHeader>{previewDoc}</ModalHeader>
                    <ModalBody>
                        <div>
                            <iframe src={blobUrl} width={'100%'} height={'500px'} frameborder="0"></iframe>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { setPreviewModal(false); reUploadfromPreview() }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openReviewFileModal}  >
                    <ModalHeader>Review Alert</ModalHeader>
                    <ModalBody>
                        <div className='text-center'>
                            <img src={reviewForm} alt="" width={200} />
                        </div>
                        <div className='text-center'>
                            <p>Plaese Review Your Application Details Before doing further process.</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { setReviewModal(false) }}>
                            Okay
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}
