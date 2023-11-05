import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
import {genreData} from './genreData';
import './AddPoster.css'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getAuth} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import defaultImg from "../img/default-placeholder.png";

function PosterForm() {
    const userId = getAuth().currentUser.uid
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [context, setContext] = useState('');
    const [isOnline, setIsOnline] = useState(false);
    const [recurring, setRecurring] = useState(false);
    const [moreInfoUrl, setMoreInfoUrl] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a poster object with the image URL
        if (!image){
            setImage(defaultImg)
        }

        const posterImage = image || defaultImg;

        const poster = {
            uuid: userId,
            title: title,
            genre: genre,
            image: posterImage,
            location: isOnline ? "Online" : location,
            startDate: startDate,
            endDate: endDate,
            context: context,
            url: moreInfoUrl,
        };

        if (userId === "") {
            setError('Please sign in to post');
            return;
        }

        let curStartDate = new Date(startDate);
        let curEndDate = new Date(endDate);
        poster.endDate = curEndDate.toISOString();
        poster.startDate = curStartDate.toISOString();


        const uploadData = () => addDoc(collection(db, "users"), poster).then(r => {
            console.log('added to user')
            navigate('/');
        }).catch(e => {
            setError("Whoops Something went wrong \n" + e?.message);
            console.log(e)
        });


        if (!image) {
            uploadData().then(r => {
            });
            return;
        }

        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`);


        // Upload the file
        uploadBytes(storageRef, image).then((snapshot) => {
            // console.log('Uploaded an image');

            // Get the download URL
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                poster.image = downloadURL;
                // Add the poster to Firestore
                const boardColl = collection(db, 'board');
                addDoc(boardColl, poster)
                    .then(response => {
                        console.log(response.id);
                        uploadData().then(r => {
                        });
                    })
                    .catch(error => {
                        setError(error.message);
                        console.log(error.message);
                    });
            });

        }).catch((error) => {
            console.error("Error uploading image: ", error);
        });

    };

    return (
        <form className="addPosterForm" onSubmit={handleSubmit}>
            <label>Add Poster</label>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
            </div>
            <div>
                <label>Url:</label>
                <input
                    type="text"
                    value={moreInfoUrl}
                    onChange={(e) => setMoreInfoUrl(e.target.value)}
                    placeholder="Url"
                />
            </div>
            <div className="form-field">
                <label>Genre:</label>
                <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                    <option value="" disabled hidden>--- Select From Below ---</option>
                    {genreData.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}

                </select>
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        disabled={isOnline}
                        required
                    />
                    <label>
                        <input type="checkbox" checked={isOnline} onChange={() => setIsOnline(!isOnline)}/>
                        Is Online ?
                    </label>
                </div>
            </div>
            <div>
                <label>Description:</label>
                <p></p>
                <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Context"
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Date"
                    required
                />
            </div>
            
           <div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Date"
                    />
                </div>
            </div>
            <button type="submit">Create Poster</button>
        </form>
    );
}

export default PosterForm;
