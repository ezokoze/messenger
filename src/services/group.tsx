import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

const saveGroup = async (userArray: any, createdBy: any, name: any, type: any) => {

    const group = {
        createdAt: new Date(),
        createdBy,
        members: userArray,
        name,
        type
    } as any;

    try {
        const groupRef = collection(db, 'group');
        const snapshot = await addDoc(groupRef, group);
        group.id = snapshot.id;
        return group;
    } catch (err: any) {
        console.error('err', err);
        alert(`error while saveGroup : ${err.message}`);
    }
};

const filterGroup = async (userArray: any) => {
    try {
        const groupRef = await collection(db, 'groups');
        userArray.forEach((userId: any) => {
            const groupQuery = query(groupRef, where('members', '==', userId));
            onSnapshot(groupQuery, (snapshot) => {
                const allGroups = [] as any;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    allGroups.push(data);
                });
                if (allGroups.length > 0) {
                    return allGroups[0];
                } else {
                    return null;
                }
            });
        });
    } catch (err: any) {
        console.error(err);
        alert(`error while filterGroup ${err.message}`);
    }
};

const fetchGroupsByUserId = async (uid: string) => {
    try {
        const groupRef = await collection(db, 'group');
        const groupQuery = query(groupRef, where('members', 'array-contains', uid));
        return groupQuery;
    } catch (err: any) {
        console.error(err);
        alert(`error while fetchGroupsByUserId ${err.message}`);
    }
}

export {
    saveGroup,
    filterGroup,
    fetchGroupsByUserId
};
