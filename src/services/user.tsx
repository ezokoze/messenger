import { collection, getDocs, query, where } from "firebase/firestore";
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

const getUserNameByUserId = async (userId: string) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const docs = await getDocs(q);
        const user = docs.docs[0].data();
        return user.displayName;
    } catch (err: any) {
        console.error('err', err);
        alert(`error while getUserNameByUserId ${err.message}`);
    }
}

export {
    getUsers,
    getUserNameByUserId
};
