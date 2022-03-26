import React, {useState, useEffect} from 'react';
import './list.css'
import ListItem from './ListItem';

const List = () => {

    const [userText, setUserText] = useState("");
    const [wholeList, setWholeList] = useState([]);

    let cookie = document.cookie
    let getLength = cookie.length
    // console.log(wholeList.length)
    // console.log(getLength)


    const submitButton = (e) => {
        e.preventDefault()

        setWholeList([...wholeList, userText])
        setUserText("")
    }

    const removeItem = (idKey) => {
        let newArr = [...wholeList]
        newArr.splice(idKey, 1)
        setWholeList(newArr)

    }

    const pageLoad = () => {
        if (wholeList.length === 0 && cookie.length > 7) {
            let cutCookie = cookie.slice(5, getLength)
            let cookieArr = JSON.parse(cutCookie)
            setWholeList(cookieArr)
        } 
    }

    useEffect(() => {
        pageLoad()
        if (cookie.length !== wholeList.length) {
        let date = new Date()
        date.setTime(date.getTime() + 3*24*60*60*1000)
        let expires = "expires=" + date.toUTCString()
        let newCookie = JSON.stringify(wholeList)
        document.cookie = "list=" + newCookie + ";" + expires
        console.log(document.cookie)
        } else {
            pageLoad()
        }

    }, [wholeList])

    return(
        <div className='List'>
            <form onSubmit={submitButton} className='form'>
                <input id="textBox" onChange={(e) => setUserText(e.target.value)} value={userText} type={'text'} placeholder='Text here...'/>
                <input id="submitButton" className='buttons' type={'submit'} value={"+ Add"} />
            </form>
            <ul className='ulBox'>
                <ListItem wholeList={wholeList} removeItem={removeItem} />
            </ul>
        </div>
    )

}

export default List