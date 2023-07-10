import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCreator, getCraetor } from "../client";
import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

function ViewCreator({ delCreator }) {

    const navigate = useNavigate();
    const modelRef = useRef(null);
    const { id } = useParams();
    const [creator, setCreator] = useState(null);

    const toggleModal = () => {
        if (modelRef.current.hasAttribute("open") && modelRef.current.getAttribute("open") != "false") {
            modelRef.current.removeAttribute("open");
        } else {
            modelRef.current.setAttribute("open", true);
        }
    }

    useEffect(() => {
        const getData = async (id) => {
            const { data, error } = await getCraetor(id);
            if (!error) {
                setCreator(data);
            } else {
                navigate('/');
            }
        }
        getData(id);
    }, [])

    if (creator == null) {
        return <h1 aria-busy="true" className="loading">Loading...</h1>
    }

    return <section className="container">
        <div className="grid">
            <div className="view-img">
                <img src={creator.imageURL} alt={creator.name} />
            </div>
            <div className="view-body">
                <h2>{creator.name}</h2>
                <div className="card-social">
                    {creator.facebook.length > 0 &&
                        <a href={`https://fb.com/${creator.facebook}`} className="social fa" >
                            <FontAwesomeIcon icon={faFacebook} size="lg" /></a>}
                    {creator.twitter.length > 0 &&
                        <a href={`https://twitter.com/${creator.twitter}`} className="social tw" >
                            <FontAwesomeIcon icon={faTwitter} size="lg" /></a>}
                    {creator.youtube.length > 0 &&
                        <a href={`https://youtube.com/${creator.youtube}`} className="social ytb">
                            <FontAwesomeIcon icon={faYoutube} size="lg" /></a>}
                </div>
                <h6>Description:</h6>
                <p>{creator.description}</p>
            </div>
        </div>

        <dialog id="modal-example" ref={modelRef}>
            <article>
                <a href="#close"
                    className="close"
                    onClick={toggleModal}>
                </a>
                <h3>Confirm your action!</h3>
                <p>
                    Are you sure you want to delete {creator.name} ???
                </p>
                <footer>
                    <a href="#cancel"
                        role="button"
                        className="secondary"
                        onClick={toggleModal}>
                        Cancel
                    </a>
                    <a href="#confirm"
                        role="button"
                        onClick={() => {
                            const isDeleted = deleteCreator(creator.id);
                            if (isDeleted) {
                                delCreator(creator.id);
                                navigate('/');
                            }
                        }}>
                        Confirm
                    </a>
                </footer>
            </article>
        </dialog>
        <div className="grid view-footer">
            <Link to={`/edit/${creator.id}`}>
                <button className="btn-edit">
                    <FontAwesomeIcon icon={faUserPen} color="#fff" size="xs" style={{ marginRight: "0.5rem" }} />Edit</button>
            </Link>
            <button onClick={() => {
                toggleModal()
                // delCreator(creator.id);
                // navigate('/');
            }} className="btn-del"><FontAwesomeIcon icon={faTrash} color="#fff" size="xs" style={{ marginRight: "0.5rem" }} />DELETE</button>
        </div>
    </section >
}

export default ViewCreator;