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
