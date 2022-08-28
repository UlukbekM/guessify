import React,{useState, useEffect} from "react";
import { Header } from "./Header";
import {fetchData, putData, updateItem} from './AwsFunctions';
import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const Testing = () => {

    // const [item, setItem] = useState("")

    // const fetchDataFromDynamoDb = () => {
    //     fetchData('Leaderboard')
    // }

    // const addDataToDynamoDB = async () => {
    //     const userData = {
    //         playlistID:"37i9dQZF1DX0XUsuxWHRQd",
    //         score: 11,
    //         userName: "uluuuuu"
    //     }
        
    //     await putData('Leaderboard' , userData)
    // }

    // useEffect(() => {
    //     getData('Leaderboard')
    // }, [])

    // const getData = (tableName) => {
    //     var params = {
    //         TableName: tableName
    //     }
    
    //     docClient.scan(params, function (err, data) {
    //         if (!err) {
    //             // console.log(data)
    //             // return(data)
    //             setItem(data)
    //         } else {
    //             console.log(err)
    //         }
    //     })
    // }

    // useEffect(() => {
    //     console.log(item)
    // }, [item])

    // const updateData = async () => {
    //     const userData = {
    //         playlistID:"37i9dQZF1DX0XUsuxWHRQd",
    //         score: 11,
    //         userName: "uluuuuu"
    //     }
    //     await updateItem(userData)
    // }

    return(<>
        <Header/>
        {/* <button onClick={() => fetchDataFromDynamoDb()}> Fetch </button> */}
        {/* <button onClick={() => addDataToDynamoDB()}> Put </button> */}
        {/* <button onClick={() => updateData()}> Update </button> */}
    </>)
}