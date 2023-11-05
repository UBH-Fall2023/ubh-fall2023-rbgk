import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
import {genreData} from './genreData';
import './AddPoster.css'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getAuth} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userId === "") {
            setError('Please sign in to post');
            return;
        }

        // required data
        if (!title || !genre || (!isOnline && !location) || !startDate) {
            setError('Please enter at least a title, genre, location, and start date');
            return;
        }

        // if recurring is set
        if (recurring && !endDate) {
            setError('Please enter an end date');
            return;
        }

        // Create a poster object with the image URL
        const poster = {
            uuid: userId,
            title: title,
            genre: genre,
            image: null,
            location: isOnline ? "Online" : location,
            startDate: startDate,
            endDate: endDate,
            context: context,
        };

        const uploadData = () => setDoc(doc(db, "users", userId), poster).then(r => {
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

    const clearError = () => {
        setError(null);
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
                />
            </div>
            <div className="form-field">
                <label>Genre:</label>
                <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
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
                    />
                    <label>
                        <input type="checkbox" checked={isOnline} onChange={() => setIsOnline(!isOnline)}/>
                        Is Online ?
                    </label>
                </div>
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Date"
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={() => setRecurring(!recurring)}
                    />
                    Is recurring?
                </label>
            </div>
            {recurring && (<div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Date"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Context"
                    />
                </div>
            </div>)}
            <button type="submit">Create Poster</button>
            {error && (
                <div className="error-box">
                    <p>Error: {error}</p>
                    <button onClick={clearError}>Dismiss</button>
                </div>
            )}
        </form>
    );
}

export default PosterForm;
