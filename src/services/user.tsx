import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase";


const getUsers = async (userId: string) => {
    try {
        const q = query(collection(db, "users"), where("uid", "!=", userId));
        const docs = await getDocs(q);
        const users = [] as any;
        docs.forEach(element => {
            users.push(element.data());
        });

        return users;
        // await onSnapshot(userRef, (snapshot) => {
        //     snapshot.docs.forEach((doc) => {
        //     });
        // });

    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUsers ${err.message}`);
    }
}

const getUser = async (userId: string) => {
    try {
        return await query(collection(db, "users"), where("uid", "==", userId));
    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUserNameByUserId ${err.message}`);
    }
};

const getUserNameByUserId = async (userId: string) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const docs = await getDocs(q);
        const user = docs.docs[0].data();
        return user;
    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUserNameByUserId ${err.message}`);
    }
};

const updateUser = async (userId: string, data: any) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const docs = await getDocs(q);

        docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setDoc(doc.ref, data, { merge: true });
        });
    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUserNameByUserId ${err.message}`);
    }
};

const createUserIfNotExisting = async (userId: string) => {
    const usersRef = collection(db, "users");
    const document = doc(usersRef, userId);
    const documentSnap = await getDoc(document);

    if (!documentSnap.exists()) {
        setDoc(doc(usersRef, userId), {
            uid: userId,
            displayName: userId,
            authProvider: "metamask",
            photoURL: 'https://icon-library.com/images/anonymous-icon/anonymous-icon-0.jpg'
        });
    }
};

export {
    getUser,
    getUsers,
    getUserNameByUserId,
    updateUser,
    createUserIfNotExisting
};

