import React from "react"
// import DeleteItem from "./DeleteItem"

const ListItem = (props) => {

    return(
        <>
            {props.wholeList.length > 0 ?
            props.wholeList.map((listItem, key) => 
            <li id={'item' + key} className='listItem'><span>{listItem}</span><button className="buttons" onClick={((e) => props.removeItem(key))}>X</button></li>) :
            null
            }
        </>
    )
}

export default ListItem