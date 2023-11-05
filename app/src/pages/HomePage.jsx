import React, {useState, useEffect} from 'react';
import {auth, db} from '../firebase';
import './HomePage.css';
import {useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import {doc, deleteDoc} from "firebase/firestore";

function BulletinBoard() {
    const [posters, setPosters] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const auth = getAuth();
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in.");
                setIsSignedIn(true);
            } else {
                console.log("User is not signed in.");
                setIsSignedIn(false);
            }
        });
        return () => {
            listen();
        };
    }, []);

    function redirectToSignIn() {
        navigate('/signin');
    }

    function appSignOut() {
        signOut(auth).then(() => {
            console.log("User signed out.");
        }).catch((error) => {
            console.log("Error signing out:", error);
        });
        // sign out regardless of whether the sign out was successful
        setIsSignedIn(false);
    }

    const navigate = useNavigate();
    const redirectToPostPage = () => {
        navigate('/addposter'); // Use the path to your add post page
    };

    const curDate = new Date();
    const q = query(collection(db, "users"));

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dataList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.docid = doc.id;
                dataList.push(data)
            });
            setPosters(dataList);
            console.log('whoa');
            console.log(dataList);
            posters.map((poster) => {
                console.log(poster);
            })
        });

        return () => {
            // Unsubscribe when the component unmounts
            unsubscribe();
        };
    }, []);


    function deletePost(docId) {
        deleteDoc(doc(db, "users", docId)).then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (<>
        <div>
            <h1>Welcome to the Bulletin Board</h1>
            {isSignedIn ? (<div>
                <button onClick={redirectToPostPage}>Add New Post</button>
                <button onClick={appSignOut}>Sign Out</button>
            </div>) : (<div>
                <button onClick={redirectToSignIn}>Sign In to Add New Post</button>
            </div>)}
        </div>
        <div className="bulletin-board">
            {posters.map((poster) => (<div key={poster.docid} className="poster">
                {poster.image !== null && (<img src={poster.image} alt={poster.title}/>)}
                <h2>{poster.title}</h2>
                <p>Genre: {poster.genre}</p>
                <p>Location: {poster.location}</p>
                <p>Start Date: {new Date(poster.startDate).toDateString()}</p>
                <p>End Date: {(new Date(poster.endDate).toDateString())}</p>
                {poster.url !== '' && (<p>Url: {poster.url}</p>)}
                {poster.context !== '' && (<p>Description: {poster.context}</p>)}
                {(isSignedIn && poster.uuid === getAuth().currentUser?.uid) ? (
                    <button onClick={() => deletePost(poster.docid)}>Delete</button>) : (<></>)}
            </div>))}
        </div>
    </>);
}

export default BulletinBoard;
