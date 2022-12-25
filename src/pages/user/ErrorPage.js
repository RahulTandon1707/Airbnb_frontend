import {NavLink} from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily
                        unavailable.<NavLink to={"/"}>Return to homepage</NavLink></p>
                </div>
            </div>
        </>
    )
}