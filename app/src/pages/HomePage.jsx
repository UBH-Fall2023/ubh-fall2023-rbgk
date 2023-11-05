import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import PinImage from '../img/pushpin.svg';
import { MdOutlineAddBox } from 'react-icons/md';

function BulletinBoard()
{
    const [posters, setPosters] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const auth = getAuth();
    useEffect(() =>
    {
        const listen = onAuthStateChanged(auth, (user) =>
        {
            if (user)
            {
                console.log("User is signed in.");
                setIsSignedIn(true);
            } else
            {
                console.log("User is not signed in.");
                setIsSignedIn(false);
            }
        });
        return () =>
        {
            listen();
        };
    }, []);

    function redirectToSignIn()
    {
        navigate('/signin');
    }

    function appSignOut()
    {
        signOut(auth).then(() =>
        {
            console.log("User signed out.");
        }).catch((error) =>
        {
            console.log("Error signing out:", error);
        });
        // sign out regardless of whether the sign out was successful
        setIsSignedIn(false);
    }

    const navigate = useNavigate();
    const redirectToPostPage = () =>
    {
        navigate('/addposter'); // Use the path to your add post page
    };

    const curDate = new Date();
    const q = query(collection(db, "users"));

    useEffect(() =>
    {
        const unsubscribe = onSnapshot(q, (querySnapshot) =>
        {
            const dataList = [];
            querySnapshot.forEach((doc) =>
            {
                const data = doc.data();
                data.docid = doc.id;
                dataList.push(data)
            });
            dataList.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            setPosters(dataList);
            console.log('whoa');
            console.log(dataList);
            posters.map((poster) =>
            {
                console.log(poster);
            })
        });

        return () =>
        {
            // Unsubscribe when the component unmounts
            unsubscribe();
        };
    }, []);
    function deletePost(docId)
    {
        deleteDoc(doc(db, "users", docId)).then(() =>
        {
            console.log("Document successfully deleted!");
        }).catch((error) =>
        {
            console.error("Error removing document: ", error);
        });
    }

    return (<>
        <h1>UB Bulletin Board</h1>
        <div className='board'>
            <div>
                {isSignedIn ? (<div>
                    <button className='addbutton' onClick={redirectToPostPage}>
                        <MdOutlineAddBox size={40} color='white' />
                    </button>
                    <button onClick={appSignOut}>Sign Out</button>
                </div>) : (<div>
                    <button className='addbutton' onClick={redirectToSignIn}>
                        <MdOutlineAddBox size={40} color='white' />
                    </button>
                </div>)}
            </div>
            <div className="bulletin-board">
                {posters.filter(value => {return curDate < new Date(value.endDate)}).map((poster) =>  (<div key={poster.docid} className="grid">
                    <img src={PinImage} className="pin" alt="Pin" />
                    <div className='poster'>
                        {poster.image !== null && (<img src={poster.image} alt={poster.title} />)}
                        <div class='textbox'>
                            <h2>{poster.title}</h2>
                            <div class="date-location">
                                <span class="date">{new Date(poster.startDate).getMonth()+1}/{new Date(poster.startDate).getDate()}</span>
                                <span class="location">{poster.location}</span>
                            </div>
                        </div>
                    </div>
                    {/* <p>Genre: {poster.genre}</p>
                <p>Location: {poster.location}</p>
                <p>Start Date: {new Date(poster.startDate).toDateString()}</p>
                <p>End Date: {(new Date(poster.endDate).toDateString())}</p>
                {poster.url !== '' && (<p>Url: {poster.url}</p>)}
                {poster.context !== '' && (<p>Description: {poster.context}</p>)} */}
                    {/* {(isSignedIn && poster.uuid === getAuth().currentUser?.uid) ? (
                    <button onClick={() => deletePost(poster.docid)}>Delete</button>) : (<></>)} */}
                </div>))}
            </div>
        </div>
    </>);
}

export default BulletinBoard;
