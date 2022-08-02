import { addDoc, collection, Firestore, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";

const saveGroup = async (userArray: any, createdBy: any, name: any, type: any) => {

    const group = {
        createdAt: new Date(),
        createdBy,
        members: userArray,
        name,
        type,
        id: ''
    };

    try {
        const groupRef = collection(db, 'group');
        const snapshot = await addDoc(groupRef, group)

        // update id
        group.id = snapshot.id;
        updateDoc(snapshot, { ...group });

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
        const groupQuery = query(groupRef, where('members', 'array-contains', uid), orderBy('recentMessage.sentAt', 'desc'));
        // where('members', 'array-contains'
        return groupQuery;
    } catch (err: any) {
        console.error(err);
        alert(`error while fetchGroupsByUserId ${err.message}`);
    }
}

const markConversationAsRead = async (conversationId: string) => {
    try {
        const q = query(collection(db, "group"), where("id", "==", conversationId));
        const docs = await getDocs(q);

        docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setDoc(doc.ref, { recentMessage: { readen: true } }, { merge: true });
        });
    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUserNameByUserId ${err.message}`);
    }
};

export {
    saveGroup,
    filterGroup,
    fetchGroupsByUserId,
    markConversationAsRead
};
