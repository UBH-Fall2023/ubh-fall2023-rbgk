import React, { useState } from 'react';
import { collection } from 'firebase/firestore'

function PosterForm({ onSubmit })
{
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [context, setContext] = useState('');

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        const poster = {
            title,
            genre,
            image,
            location,
            date,
            time,
            context,
        };
        onSubmit(poster);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                {errors.title && <p className="error">{errors.title}</p>}
            </div>
            <div>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                />
                {errors.genre && <p className="error">{errors.genre}</p>}
            </div>
            <div>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {errors.image && <p className="error">{errors.image}</p>}
            </div>
            <div>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                />
                {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                />
                {errors.date && <p className="error">{errors.date}</p>}
            </div>
            <div>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Time"
                />
                {errors.time && <p className="error">{errors.time}</p>}
            </div>
            <div>
                <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Context"
                />
                {errors.context && <p className="error">{errors.context}</p>}
            </div>
            <button type="submit">Create Poster</button>
        </form>
    );
}

export default PosterForm;
