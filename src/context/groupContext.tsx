import { onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "services/firebase";
import { fetchGroupsByUserId } from "services/group";

interface IGroupContext {
    theme: string;
}

export const GroupContext = createContext<Partial<IGroupContext>>({});

const GroupContextProvider = (props: any) => {
    const [theme, setTheme] = useState("light");

    return (
        <GroupContext.Provider value={{ theme }}>
            {{ ...props.children }}
        </GroupContext.Provider>
    )
};

export default GroupContextProvider;
// const GroupContextProvider = () => {

//     const firebaseAuth = auth;

//     const [userId, setUserId] = useState('');
//     const [group, setGroup] = useState([] as any);

//     console.log('userId from provider', userId)

//     useEffect(() => {
//         if (userId) {
//             getGroups();
//         }
//     }, []);


//     const getGroups = () => {
//         console.log('groups')
//         fetchGroupsByUserId(userId).then((query: any) => {
//             onSnapshot(query, (snapshot: any) => {
//                 const allGroups = [] as any;
//                 snapshot.forEach((doc: any) => {
//                     const data = doc.data();
//                     data.id = doc.id;
//                     // if (data.recentMessage) allGroups.push(data);
//                     allGroups.push(data);
//                 });
//                 setGroup(allGroups);
//             });
//         });
//     }

//     const getUserId = () => {
//         console.log('coucou')
//         if (firebaseAuth.currentUser?.uid) {
//             setUserId(firebaseAuth.currentUser.uid);
//         }
//     }


//     const value = { userId, group };

//     return (
//         <GroupContext.Provider value={{ userId, group }}>
//         </GroupContext.Provider>
//     )
// }

// export default GroupContextProvider();
