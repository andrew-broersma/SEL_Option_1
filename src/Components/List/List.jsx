import React, {useState, useEffect} from 'react';
import './list.css'
import CryptoJS from 'crypto-js'
import ListItem from './ListItem';

const List = () => {

    const [userText, setUserText] = useState("");
    const [wholeList, setWholeList] = useState([]);

    let cookie = document.cookie
    let getLength = cookie.length


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
            let decryptCookie = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(cutCookie, "p177a")))
            setWholeList(decryptCookie)
        } 
    }

    useEffect(() => {
        pageLoad()
        if (cookie.length !== wholeList.length) {
        let date = new Date()
        date.setTime(date.getTime() + 3*24*60*60*1000)
        let expires = "expires=" + date.toUTCString()
        let newCookie = JSON.stringify(wholeList)
        let encryptCookie = CryptoJS.AES.encrypt(newCookie, "p177a")
        document.cookie = "list=" + encryptCookie + ";" + expires
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