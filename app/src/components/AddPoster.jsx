import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { genreData } from './genreData';
import './AddPoster.css'
function PosterForm()
{
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [context, setContext] = useState('');

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const boardColl = collection(db, 'board')

        const poster = {
            title,
            genre,
            image,
            location,
            startDate,
            endDate,
            context,
        };
        addDoc(boardColl, { poster })
            .then(response =>
            {
                console.log(response.id)
                navigate('/')
            })
            .catch(error =>
            {
                console.log(error.message)
            })
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
                <select name="genre" value={genre} onChange={(e) => setGenre(e.target.genre)}>
                    <option value="" disabled hidden>--- Select From Below ---</option>
                    {genreData.map((item, _) => (
                        <option value={item}>{item}</option>
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
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                />
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
            <button type="submit">Create Poster</button>
        </form>
    );
}

export default PosterForm;
