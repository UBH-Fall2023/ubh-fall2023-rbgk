import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


function BulletinBoard()
{
    const [posters, setPosters] = useState([]);

    const navigate = useNavigate();
    const redirectToPostPage = () =>
    {
        navigate('/addposter'); // Use the path to your add post page
    };

    useEffect(() =>
    {
        const fetchPosters = async () =>
        {
            try
            {
                const postersCollection = collection(db, 'board');
                const posterSnapshot = await getDocs(postersCollection);
                console.log("Snapshot docs:", posterSnapshot.docs);
                const posterList = posterSnapshot.docs.map(doc =>
                {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });

                setPosters(posterList);
                console.log("Poster list:", posterList);
            } catch (error)
            {
                console.error("Error fetching posters:", error);
            }
        };

        fetchPosters();
    }, []);

    return (
        <>
            <div>
                <h1>Welcome to the Bulletin Board</h1>
                <button onClick={redirectToPostPage}>Add New Post</button>
            </div>
            <div className="bulletin-board">
                {posters.map((poster) => (
                    <div key={poster.id} className="poster">
                        <img src={poster.image} alt={poster.title} />
                        <h2>{poster.title}</h2>
                        <p>Genre: {poster.genre}</p>
                        <p>Location: {poster.location}</p>
                        <p>Start Date: {poster.startDate}</p>
                        <p>End Date: {poster.endDate}</p>
                        <p>Description: {poster.context}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BulletinBoard;
