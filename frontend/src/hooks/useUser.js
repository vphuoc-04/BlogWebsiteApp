import { useEffect, useState } from "react";
import { GetUser } from "../services/UserService";
import moment from 'moment';

// Fetch user data
const UseFetchUser = () => {
    const [user, setUser] = useState([]);
    const [timeMessage, setTimeMessage] = useState('');
    const [previousUser, setPreviousUser] = useState([]); 

    useEffect(() => {
        GetUser(setUser); 
    }, []); 

    useEffect(() => {
        setPreviousUser(user);
    }, [user]);

    useEffect(() => {
        if (user.length > 0 || previousUser.length > 0) { 
            const todayAddedCount = user.filter(u => moment(u.created_at).isSame(moment(), 'day')).length;
            const removedUsersCount = previousUser.filter(prevUser => !user.some(currentUser => currentUser.id === prevUser.id)).length;
    
            let message = '';
    
            if (todayAddedCount > 0) {
                message += `+${todayAddedCount} today`;
            } 
            if (removedUsersCount > 0) {
                message += `-${removedUsersCount} today`;
            }
            if (message === '') {
                message = 'No changes today';
            }
    
            setTimeMessage(message.trim());
        } 
        else {
            setTimeMessage('No users found');
        }
        
    }, [user, previousUser  ]);

    return { user, timeMessage };
}

export { UseFetchUser };
