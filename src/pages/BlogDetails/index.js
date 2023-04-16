import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Navbar, EditBtn, Footer } from '../../components'
import swal from 'sweetalert';
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from "../../config/firebase";
import "./PostDetails.css"
const BlogDetails = () => {
  const navigate = useNavigate()
  const params = useParams();
  const [Blog, setBlog] = useState([])
  const [Loader, setloader] = useState(true)


  useEffect(() => {
    const q = query(collection(db, "Posts"), where("id", "==", params.id));
    const querySnapshot = getDocs(q);
    const a = onSnapshot(q, (querySnapshot) => {
      const Blogs = [];
      querySnapshot.forEach((doc) => {
        Blogs.push(doc.data());
        setBlog(Blogs)
        setloader(false)
      });
    })
  }, [])

  const deletebutton = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to permanently delete this post.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteDoc(doc(db, "Posts", Blog[0].id));
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          setTimeout(() => {
            navigate("/")
          }, 1000);

        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  return (
    <div>
      <Navbar />

      {Loader ? "Loading ..." :
        <>
          <div className="w-100 flex-al-ce-j-c ">
            <div className="bg-blue p-3 mt-4 mb-4">
              <img src={Blog[0].ImageUrl} className="img-post object-cover object-center " />

              <div className="category-div mt-3">
                <h3>Status </h3>
                {Blog[0].Status === "Approved" && <h3 className="tracking-widest align-right text-xs  Approved">{Blog[0].Status}</h3>}
                {Blog[0].Status === "Rejected" && <h3 className="tracking-widest align-right text-xs  Rejected">{Blog[0].Status}</h3>}
                {Blog[0].Status === "Pending" && <h3 className="tracking-widest align-right text-xs  Pending">{Blog[0].Status}</h3>}
              </div>

              <div className="category-div mt-3">
                <h3>Selected Category </h3>
                <h3>{Blog[0].Category}</h3>
              </div>

              <div className="edit-delete-btn mt-2 mb-2">
                <EditBtn id={Blog[0].id} />
                <button className="deletebtn" onClick={deletebutton}><i class='bx bx-message-x' ></i></button>
              </div>

              <div className="mt-3 title-des">
                <h1 className="title-des-title mb-2">{Blog[0].Title}</h1>
                <h3>{Blog[0].Description}</h3>
              </div>

            </div>
          </div>

          <Footer />
        </>
      }

    </div>
  )
}

export default BlogDetails