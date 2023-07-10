import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCreator } from "../client";

function AddCreator({ saveCreator }) {

    const [creator, setCreator] = useState(
        {
            name: "",
            imageURL: "",
            description: "",
            twitter: "",
            youtube: "",
            facebook: ""
        }
    )
    const navigate = useNavigate();


    const handleChange = (e) => {
        setCreator({ ...creator, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await addCreator(creator);
        if (!error)
            saveCreator(data);
        navigate('/');
    }

    return <section className="section">
        <form onSubmit={handleSubmit}>
            <div className="container">
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        name="name"
                        placeholder="Creator Name"
                        onChange={handleChange}
                        value={creator.name}
                        required
                    />
                </label>
                <label htmlFor="imageURL">
                    Image:
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="Provide a link to an image of your creator."
                        onChange={handleChange}
                        value={creator.imageURL}
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <input
                        type="text"
                        name="description"
                        placeholder="Provide a description of the creator."
                        onChange={handleChange}
                        value={creator.description}
                        required
                    />
                </label>
                <h4>SOCIAL MEDIA LINKS</h4>
                <label htmlFor="youtube">
                    YouTube:
                    <input
                        type="text"
                        name="youtube"
                        placeholder="(without the @)"
                        onChange={handleChange}
                        value={creator.youtube}
                    />
                </label>
                <label htmlFor="twitter">
                    Twitter:
                    <input
                        type="text"
                        name="twitter"
                        placeholder="(without the @)"
                        onChange={handleChange}
                        value={creator.twitter}
                    />
                </label>
                <label htmlFor="facebook">
                    Facebook:
                    <input
                        type="text"
                        name="facebook"
                        placeholder="(without the @)"
                        onChange={handleChange}
                        value={creator.facebook}
                    />
                </label>
                <button type="submit" className="btn-save">Add</button>
            </div>
        </form>
    </section>
}

export default AddCreator;