import React, { useEffect, useState } from 'react'
import { Navbar, Card, Footer } from '../../components'
import { collection, query, where, onSnapshot, getDocs, collectionGroup, } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../../config/firebase'
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const [uid, Setuid] = useState("")
    const [Post, SetPost] = useState("")
    const [loader, Setloader] = useState(true)


    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                navigate("/")
                Setuid(user.uid)
            } else {
                console.log(user.email)
            }
        } else {
            navigate("/Login")
        }
    })
    // console.log(uid)

    const postuser = query(collection(db, "Posts"), where("Uid", "==", uid));
    const querySnapshot = getDocs(postuser);
    const b = onSnapshot(postuser, (querySnapshot) => {
        const Posts = [];
        querySnapshot.forEach((doc) => {
            Posts.push(doc.data());
            SetPost(Posts)
            Setloader(false)
        });
    })

    return (
        <>
            <Navbar Home="active" />
            {loader ? "Loading ..." :
                <section class="text-gray-600 body-font">
                    <div class="container px-2 py-10 mx-auto">
                        <div class="d-flex flex-wrap my-4">
                            {Post.map((v, i) => {
                                return (<Card id={v.id} img={v.ImageUrl} des={v.Description} cat={v.Category} title={v.Title} status={v.Status} />)
                            })}
                        </div>
                    </div>
                </section>}
            <Footer />
        </>
    )
}

export default Home