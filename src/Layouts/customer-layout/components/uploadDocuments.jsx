import React, { useEffect, useState } from 'react';
import "../../Public-Layout/public.scss";
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import logo from "../../../assets/swastik_logo.png"
import { Label, Spinner, ToastHeader } from 'reactstrap';
import { postRequest } from '../../../utils/axios-service';
import { toast } from 'react-toastify';

export default function UploadDocuments() {
    const [doc_type, setDoctype] = useState("adharcard");
    const { id} = useParams();
    const token = JSON.parse(sessionStorage.getItem("userToken")); 
    const [queryParams, setQueryParams] = useState(id);
    const [adharUploaded, setAdharState] = useState(false);
    const [panUploaded, setPanState] = useState(false);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const navigate = useNavigate();
    const [imgUrl1, setUrl1] = useState();
    const [imgUrl2, setUrl2] = useState();
    const [loading, setLoading] = useState(false)

    const [fieldName, setField] = useState("file1");

    useEffect(() => {
        console.log(queryParams);
    }, []);
    const uploadFile = (id) => {
        let input = document.getElementById(id);
        if (input !== null) {
            input.click();
        }
    }

    const getFile1 = (e) => {
        setFile1(e.target.files[0]);
        let size = e.target.files[0].size / 1024;
        console.log(size)
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setUrl1(e.target.result);
        }
    }

    const getFile2 = (e) => {
        setFile2(e.target.files[0]);
        let size = e.target.files[0].size / 1024;
        console.log(size)
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setUrl2(e.target.result);
        }
    }

    function handleUpload(e) {
        e.preventDefault();
        console.log(token)
        if (file1 && file2) {
            setLoading(true);
            let formData = new FormData();
            formData.append("file1", file1);
            formData.append("file2", file2);
            postRequest(`/api/upload/${id}`, formData, { 'Authorization': token }).then((resp) => {
                if (resp.data.status == true) {
                    toast.success(resp.data.message);
                    navigate("/user/dashboard");
                } else {
                    toast.error(resp.data.message);
                }
            }).catch(err => {
                console.log(err);
                toast.error(err);
            });
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }
    return (
        <>
            <div id='uploadDocsPage'>
                <div className="container px-0">
                    <div className='main-div'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img src={logo} width={100} alt="" />
                        </div>
                        <div className="card">
                            <h3 className='mb-3 mt-3'>Upload Documents </h3>
                            <form action="" encType='multipart/form-data' onSubmit={(e) => handleUpload(e)}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Label>Upload Adhar Card</Label>
                                        {!file1 && <div className="drop_box">
                                            <header>
                                                <h4>Select File here</h4>
                                            </header>
                                            <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
                                            <input
                                                type="file"
                                                hidden=""
                                                accept=".pdf"
                                                id="file1"
                                                name='file1'
                                                onChange={(e) => getFile1(e)}
                                                style={{ display: "none" }}
                                            />

                                            <Button variant='contained' size='large' className='btn1' onClick={() => uploadFile('file1')}>Choose File</Button>
                                        </div>}
                                        {file1 && <div className='preview-div mt-4 mb-4'>
                                            <iframe src={imgUrl1} frameborder="0" style={{ width: '100%' }}></iframe>

                                        </div>}

                                        {file1 && <Button variant='outlined' color='warning' size='large' className='mt-1 mb-1 mx-1' onClick={() => { setFile1(""); setUrl1("") }}>Reupload Adhar Card</Button>}
                                    </div>
                                    <div className='col-md-6'>
                                        <Label>Upload Pan Card</Label>
                                        {!file2 && <div className="drop_box">
                                            <header>
                                                <h4>Select File here</h4>
                                            </header>
                                            <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
                                            <input
                                                type="file"
                                                hidden=""
                                                accept=".pdf"
                                                id="file2"
                                                name='file2'
                                                onChange={(e) => getFile2(e)}
                                                style={{ display: "none" }}
                                            />

                                            <Button variant='contained' size='large' className='btn1' onClick={() => uploadFile('file2')}>Choose File</Button>
                                        </div>}
                                        {file2 && <div className='preview-div mt-4 mb-4'>
                                            <iframe src={imgUrl2} frameborder="0" style={{ width: '100%' }}></iframe>
                                        </div>}

                                        {file2 && <Button variant='outlined' color='warning' size='large' className='mt-1 mb-1 mx-1' onClick={() => { setFile2(""); setUrl2("") }}>Reupload Pan Card</Button>}
                                    </div>
                                    {file1 && file2 && <div className="col-md-12">
                                        {!loading && <Button variant='contained' type='submit' size='large' className='mt-4' fullWidth color='success'>
                                            Upload Documents
                                        </Button>}
                                        {loading && <Button variant='contained' disabled size='large' className='mt-4' fullWidth color='success'>
                                            <Spinner color="light">
                                                Loading...
                                            </Spinner>
                                            Please Wait...
                                        </Button>}
                                    </div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
