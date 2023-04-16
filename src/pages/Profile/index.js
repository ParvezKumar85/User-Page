import React, { useState, useEffect } from 'react'
import { Footer, Navbar } from '../../components'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from '../../config/firebase';
import { collection, query, where, onSnapshot, getDocs, doc, collectionGroup, addDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
import "./profile.css"

const Profile = () => {
  const navigate = useNavigate("")
  const [uid, setuid] = useState("")
  const [imgurl, setimgurl] = useState("")
  const [message, setmessage] = useState("")
  const [messagetype, setmessagetype] = useState("")
  const [progress, setprogress] = useState(false)
  const [progreful, setprogreful] = useState(false)
  const [progressbar, setprogressbar] = useState()
  const [user, setuser] = useState()
  const [loader, setloader] = useState(true)
  const [name, setname] = useState("")
  const [num, setnum] = useState("")


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
          const washingtonRef = doc(db, "users", uid);
          updateDoc(washingtonRef, {
            Profile: downloadURL,
          }).then((res) => {
            console.log(res)
          })
        });
      }
    );
  }


  const postuser = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = getDocs(postuser);
  const b = onSnapshot(postuser, (querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      user.push(doc.data());
      setuser(user)
      setloader(false)
    });
  })

  const UpdateProfile = () => {
    if (name === "") {
      setname(user[0].FullName)
    } else if (num === "") {
      setnum(user[0].Mobilenmber)
    } else {
      const data = {
        FullName: name,
        Mobilenumber: num,
      }
      const washingtonRef = doc(db, "users", uid);
      updateDoc(washingtonRef, data).then((res) => {
        console.log(res)
      })
    }
  }

  return (
    <>
      <Navbar Profile="active" />

      {loader ? "Loading" :
        <div className='profilemaindiv'>

          <div className='div-profile-1'>

            <div className='profile-div-2'>
              <img src={user[0].Profile} className="Profile"/>
              <label htmlFor="profile">
                <i class='bx bxs-cloud-upload bx-md' ></i>
              </label>
              <input type="file" id='profile' onChange={(e) => imgupload(e)} />
            </div>

            {progress &&
              <div className="progress progresscolor w-100 " role="progressbar" aria-label="Warning striped example" >
                <div className="progress-bar barcolorprofile progress-bar-striped " style={{ width: progressbar + "%" }}>{progressbar + "%"}</div>
              </div>
            }

            <div className="mt-2 w-100 algincenter">

              <div class="mb-3 alginleft">
                <label for="" class="form-label">Full Name</label>
                <input type="text" class="form-control" value={name} placeholder={user[0].FullName} onChange={(e) => setname(e.target.value)} />
              </div>

              <div class="mb-3 alginleft">
                <label for="" class="form-label">Contact Number</label>
                <input type="text" class="form-control" value={num} placeholder={user[0].Mobilenumber} onChange={(e) => setnum(e.target.value)} />
              </div>

              <div class="mb-3 alginleft">
                <label for="" class="form-label">Email Address</label>
                <input type="text" class="form-control" disabled value={"manojmissrani54@gjmsil.com"} />
              </div>

              <button onClick={UpdateProfile} className='profileupdatebtn'>Update</button>

            </div>
          </div>
        </div>
      }

      <Footer />
    </>
  )
}

export default Profile