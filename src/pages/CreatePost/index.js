import React, { useState, useEffect } from 'react'
import { Footer, Navbar } from '../../components'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from '../../config/firebase';
import { query,  onSnapshot, addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./create.css"
import moment from 'moment/moment';
import {  onAuthStateChanged } from 'firebase/auth'

const CreatePost = () => {
  const navigate = useNavigate("")
  const [uid, setuid] = useState("")
  const [title, settitle] = useState("")
  const [des, setdes] = useState("")
  const [cat, setcat] = useState("")
  const [imgurl, setimgurl] = useState("")
  const [message, setmessage] = useState("")
  const [messagetype, setmessagetype] = useState("")
  const [progress, setprogress] = useState(false)
  const [progreful, setprogreful] = useState(false)
  const [progressbar, setprogressbar] = useState()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setuid(user.uid)
        } else {
            navigate("/Login")
        }
    })
}, []);

  const imgupload = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, e.target.files[0].name);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var uploadpercentage = Math.round(progress);
        setprogress(true)
        setprogressbar(uploadpercentage)
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL)
          setprogress(false)
          setprogreful(true)
        });
      }
    );

  }


      const Create = () => {
      if (title === "") {
        setmessage("Title Required!")
        setmessagetype("error")
        setTimeout(() => {
          setmessagetype("")
        }, 2000);
      } else if (cat === "") {
        setmessage("Category Required!")
        setmessagetype("error")
        setTimeout(() => {
          setmessagetype("")
        }, 2000);
      } else if (des === "") {
        setmessage("Description Required!")
        setmessagetype("error")
        setTimeout(() => {
          setmessagetype("")
        }, 2000);
      } else if (imgurl === "") {
        setmessage("Uploud File Required!")
        setmessagetype("error")
        setTimeout(() => {
          setmessagetype("")
        }, 2000);
      } else {
        addDoc(collection(db, "Posts"), {
          Title: title,
          Description: des,
          Category: cat,
          ImageUrl: imgurl,
          Uid: uid,
          Status: "Pending",
          Date: moment(new Date).format('LLL')
      }).then((res) => {
          const washingtonRef = doc(db, "Posts", res.id);
          updateDoc(washingtonRef, {
              id: res.id
          }).then(() => {
              navigate("/")
          })
      })
      setmessage("Success")
      setmessagetype("Success")
      }
    }
 

  return (
    <div>
      <Navbar CreatePost="active" />
      <div>
        <div className='create-post-div p-5 '>
          <div className='create-div-1 col-lg-7 p-4'>

            <div class="mb-3 ">
              <label class="form-label color-white">Title</label>
              <input type="text" class="form-control" placeholder="Enter Title" value={title} onChange={(e) => settitle(e.target.value)} />
              <small id="helpId" class="form-text text-muted">0/200</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Select Category</label>
              <select class="form-select form-select-lg" value={cat} onChange={(e) => setcat(e.target.value)}>
                <option selected className='select'>Select Category </option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="WordPress">WordPress</option>
                <option value="Freelancing">Freelancing</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" value={des} onChange={(e) => setdes(e.target.value)} rows="4" placeholder='Enter descrption'></textarea>
              <small id="helpId" class="form-text text-muted">0/2500</small>
           
            </div>

            <div class="mb-3">
              <label class="form-label">Uploud File</label>
              <label for="file" class="form-label w-100 file">Upload File
                {progreful &&
                  <i class='bx bxs-check-circle'></i>
                }

              </label>
              <input type="file" onChange={(e) => imgupload(e)} class="form-control" id="file" placeholder="" aria-describedby="fileHelpId" />
            </div>

            {progress &&
              <div className="progress" role="progressbar" aria-label="Warning striped example" >
                <div className="progress-bar progress-bar-striped " style={{ width: progressbar + "%"}}>{progressbar + "%"}</div>
              </div>}

            {messagetype !== "" && <div className='alert-div'>
              <div class={messagetype === "error" ? "alert alert-danger" : "alert alert-success"} role="alert">
                {message}
              </div>
            </div>}

            <div class="d-grid gap-2">
              <button type="button" class="btn btn-primary mt-3" onClick={Create}>Create Post</button>
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreatePost