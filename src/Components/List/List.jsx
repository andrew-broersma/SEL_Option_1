import React, {useState} from 'react';
import './list.css'
import ListItem from './ListItem';

const List = () => {

    const [userText, setUserText] = useState("");
    const [wholeList, setWholeList] = useState([]);

    const submitButton = (e) => {
        e.preventDefault()

        setWholeList([...wholeList, userText])

    }

    const removeItem = (idKey) => {
        let newArr = [...wholeList]
        newArr.splice(idKey, 1)
        setWholeList(newArr)
    }

    return(
        <div className='List'>
            <form onSubmit={submitButton} className='form'>
                <input onChange={(e) => setUserText(e.target.value)} type={'text'}/>
                <input type={'submit'}></input>
            </form>
            <ul>
                <ListItem wholeList={wholeList} removeItem={removeItem} />
            </ul>
        </div>
    )

}

export default List