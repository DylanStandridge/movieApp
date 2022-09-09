import { Box, Typography } from "@mui/material";
import './NoPage.css'
function NoPage() {
return (
    <body className="notFoundBody">
    <section className="notFound">
        <div className="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div className="text">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <a href="/" className="yes">YES</a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">NO</a>
        </div>
    </section>
</body>
   
);
}

export default NoPage;