import React, { useEffect ,useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { Button } from '@mui/material';
import { BASE_URL, postRequest } from '../../../../../utils/axios-service';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

export default function DocumentManagement({ customerDocs ,email}) {
    const [modal, setModal] = useState(false);
    const [doc_path,setDocs] = useState('');
    const [docs,setDocsArray] = useState([]);
    const openPreview = (doc_path) =>{
        setModal(true);
        setDocs(doc_path);
    }

    const sendNotifyEmail = () =>{
        postRequest("/api/uploadDocsEmailNotify",{email}).then((resp) => {
            if(resp.data.status == true){
                toast.success("Email Sent Successfully !");
            }else{
                toast.error(resp.data.message)
            }
        }).catch(err => {
            console.log(err);
            toast.error(err)
        })
    }
  const toggle = () => setModal(!modal);
    useEffect(() => {
        console.log(customerDocs);
        setDocsArray(customerDocs.document || []);
    }, [customerDocs])
    return (
        <>
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between">
                    <h2>Customer Documents</h2>
                </div>
                <div className="card-body">
                   {customerDocs.document && <TableContainer component={Paper} className='table-div'>
                        <Table sx={{ minWidth: '100%' }} stickyHeader aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer's Documents</TableCell>
                                    <TableCell align="start">Uploaded Date</TableCell>
                                    <TableCell align="start">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {docs && docs.map((x)=>(
                                        
                                <TableRow>
                                    <TableCell align="start">{x.doc_type || "N/A"}</TableCell>
                                    <TableCell align="start">{x.uploadedDate || "N/A"}</TableCell>
                                    <TableCell align="start"><Button variant='contained' size='sm' onClick={()=> openPreview(x.doc_path)}>View</Button></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table> 
                    </TableContainer>}
                    {!customerDocs.document &&  <TableContainer component={Paper} className='table-div'>
                        <Table sx={{ minWidth: '100%' }} stickyHeader aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer's Documents</TableCell>
                                    <TableCell align="start">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>                                        
                                <TableRow>
                                    <TableCell align="start">Adhar Card</TableCell>
                                    <TableCell align="start"><Button variant='contained' size='sm'>Upload</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="start">Pan Card</TableCell>
                                    <TableCell align="start"><Button variant='contained' size='sm'>Upload</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table> 
                    </TableContainer>}

                    {docs.length == 0 && <Button variant='contained' className='mt-3' onClick={() => sendNotifyEmail()}>Notify Customer for Upload Documents</Button>}
                </div>

                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Documents</ModalHeader>
                    <ModalBody>
                        <iframe src={`${BASE_URL}/${doc_path}`} height={'500px'} width={'100%'} frameborder="0"></iframe>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" variant='outlined' onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}
