import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCreator } from "../client";

function EditCreator({ data, saveCreator }) {

    const [creator, setCreator] = useState({
        name: "",
        imageURL: "",
        description: "",
        twitter: "",
        youtube: "",
        facebook: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const creator = data.find(e => e.id == id);
        if (creator)
            setCreator(creator);
        else
            navigate('/');
    }, []);

    const handleChange = (e) => {
        setCreator({ ...creator, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await updateCreator(creator);
        if (data)
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
                <button type="submit" className="btn-save">Save</button>
            </div>
        </form>
    </section>
}

export default EditCreator;