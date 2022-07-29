import React from "react";
import { Link } from "react-router-dom";

export const Buttons = (button) => {

    return(<><Link to={"/categories"} state={{ categoryID: button.id, categoryName: button.name }}>
        <div className="playlistItem noselect">
            {button.icons.length ? <img width={"200rem"} src={button.icons[0].url} alt=""/>: <div>No Image</div>}
            <p>{button.name}</p>
        </div></Link>
    </>)
}