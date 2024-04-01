import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { postRequest, BASE_URL } from '../../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


export default function LoanDocumentManagement(props) {

    const [openDropFileModal, setModal] = useState(false);
    const [openPreviewFileModal, setPreviewModal] = useState(false);
    const [blobUrl, setBlobUrl] = useState();
    const [previewDoc, setPreviewDoc] = useState();
    const [selectedDoc, setSelectedDoc] = useState(null);
    const token = JSON.parse(sessionStorage.getItem("AdminAuth"));
    const [documentList, setDocumentList] = useState([]);
    const [docStatus, setDocStatus] = useState("");

    const { loanId } = useParams();

    const [file, uploadedFile] = useState();
    const dropZoneStyle = {
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '20px auto',
        width: '80%'
    };

    useEffect(() => {
        setDocumentList(props?.documentList)
    }, [props?.documentList]);

    const handlePreview = (item) => {
        setPreviewModal(true);
        setBlobUrl(item?.uploadedFileURL ? item?.uploadedFileURL : BASE_URL + "/" + item?.doc_path);
        setPreviewDoc(item.document);
    }

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
        uploadedFile(acceptedFiles);
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

    const reUploadfromPreview = () => {
        setBlobUrl("");
        uploadedFile(null);
    }

    const ChangeLoanStatus = (item, status) => {
        setDocStatus(status);

        try {
            const payload = {
                "doc_id": item._id,
                loan_id: loanId,
                status: status
            }
            postRequest("/api/verifydocuments",payload,{'Authorization':token}).then((response) =>{
                if(response.data.status === true){
                    toast.success(response.data.message);
                    props.loadData();
                }else{
                    props.loadData();
                    toast.error(response.data.message);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }



    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div className='container-fluid'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Borrower's Documents</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documentList && documentList.map((x, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {x.document ? x.document : x.doc_type}
                                    </TableCell>
                                    <TableCell>
                                        <div className='d-flex'>
                                            {!x.uploadStatus && <Button className='mx-2' variant='contained' onClick={() => { setModal(!openDropFileModal); setSelectedDoc(x) }}>
                                                Upload
                                            </Button>}
                                            {x.uploadStatus && <Button className='mx-2' variant='contained' onClick={() => handlePreview(x)} color='secondary'>
                                                Preview
                                            </Button>}
                                            {x.uploadStatus && <div className="dropdown">
                                                <Button className='mx-2' variant='contained' onClick={() => ChangeLoanStatus(x, true)} color='success'>
                                                    {x.verified ? 'Verified' : 'Verify Document'}
                                                </Button>
                                            </div>}
                                            {x.uploadStatus && <div className="dropdown">
                                                <Button className='mx-2' variant='contained' onClick={() => ChangeLoanStatus(x, false)} color='warning'>
                                                    {!x.verified ? 'PENDING' : 'Reject Document'}
                                                </Button>
                                            </div>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {documentList.length == 0 && <TableRow>
                                <TableCell rowSpan={3}>
                                    <div className='text-center'>
                                        <h4>No Documents Uploaded !!</h4>
                                    </div>
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal isOpen={openDropFileModal} >
                    <ModalHeader>Upload {selectedDoc?.document}</ModalHeader>
                    <ModalBody>
                        <div {...getRootProps()} style={dropZoneStyle}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => setModal(!openDropFileModal)}>
                            Cancle
                        </Button>
                        <Button color="primary" onClick={uploadDocuments}>
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
            </div>
        </>
    )
}
