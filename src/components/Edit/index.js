import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { collection, query,doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { db } from '../../config/firebase';
const EditBtn = (props) => {
    const [show, setShow] = useState(false);
    const [title, settitle] = useState("")
    const [des, setdes] = useState("")
    const [cat, setcat] = useState("Select Category")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const update = () => {
        if (title === "") {
            setmessage("Title Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        } else if (cat === "Select Category") {
            setmessage("Category Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        } else if (des === "") {
            setmessage("Description Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        }
        else {
            const data = {
                Title: title,
                Description: des,
                Category: cat,
            }
            const washingtonRef = doc(db, "Posts", props.id);
            updateDoc(washingtonRef, data).then(() => {
                // settitle("")
                // setdes("")
                // setcat("")
                setShow(false)
            })
        }
    }

    return (
        <>
            <button className="editbtn" variant="primary" onClick={handleShow}><i class='bx bxs-edit'></i></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3 ">
                        <label class="form-label text-black">Title</label>
                        <input type="text" class="form-control" placeholder="Enter Title" value={title} onChange={(e) => settitle(e.target.value)} />
                        <small id="helpId" class="form-text text-muted">0/200</small>
                    </div>

                    <div className='mb-1'>
                        <label class="form-label">Select Category</label>
                        <select class="form-select form-select-lg" value={cat} onChange={(e) => setcat(e.target.value)}>
                            <option selected className='select'>Select Category </option>
                            <option value="Web Development">Web Development</option>
                            <option value="App Development">App Development</option>
                            <option value="WordPress">WordPress</option>
                            <option value="Freelancing">Freelancing</option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">Description</label>
                        <textarea class="form-control" value={des} onChange={(e) => setdes(e.target.value)} rows="2" placeholder='Enter descrption'></textarea>
                        <small id="helpId" class="form-text text-muted">0/2500</small>

                    </div>

                    {/* <form class="d-flex">
                            <div class="mb-3 w-100">
                                <label class="form-label text-black">Title</label>
                                <input type="text" class="form-control w-100" placeholder="" />
                            </div>
                    </form> */}
                    <p style={{ color: messagetype === "error" ? "red" : "green", fontWeight: "bold" }}>{message}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={update}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default EditBtn