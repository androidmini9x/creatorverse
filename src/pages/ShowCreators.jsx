import ContentCreator from "../components/ContentCreator";

function ShowCreators({ creators }) {

    return <section>

        <div className="showCreators">
            {creators.length > 0 ?
                creators.map(e => {
                    return <ContentCreator key={e.id} creator={e} />
                })
                : <h1 className="msg-no">No Creatorverse Yet.</h1>
            }
        </div>
    </section >
}

export default ShowCreators;