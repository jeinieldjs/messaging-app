import React, {useState, useContext, useEffect} from 'react';
import SessionContext from '../contexts/SessionContext';

const {session} = useContext(SessionContext);
const [channel, setChannel] = useState(); 
const [users, setUsers] = useState();
const [user, setUser] = useState();
const [userIds, setUserIds] = useState([]);
const [channelName,setChannelName] = useState('');