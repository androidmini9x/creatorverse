import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

function ContentCreator({ creator }) {
    return <article key={creator.id} className="card">
        <div className="image">
            <img src={creator.imageURL} alt={creator.name} />
        </div>
        <h6 className="card-name">{creator.name}</h6>
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
        <p className="card-desc">{creator.description}</p>
        <div className="grid">
            <Link to={`/${creator.id}`}>
                <button className="btn-normal">View</button>
            </Link>
        </div>
        <Link to={`/edit/${creator.id}`} className="btn-edit">
            <FontAwesomeIcon icon={faUserPen} color="#000" size="1x" />
        </Link>
    </article>
}

export default ContentCreator;