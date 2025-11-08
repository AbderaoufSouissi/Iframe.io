import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";



const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
    const [synced, setSynced] = useState<boolean>(false);
    const { backendUrl } = useContext(AppContext);
    
    useEffect(() => {
        const saveUser = async () => { 
            if(!isLoaded || !isSignedIn || !user || synced) return;

            try {
                const token = await getToken();
                const UserData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress?.emailAddress || "",
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                };

                await axios.post(`${backendUrl}/users`, UserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // if (response.data.success === true) {
                //     toast.success("Account created successfully");
                    
                // } else {
                //     toast.error("Unable to create account");
                // }
                setSynced(true);
            } catch (error) {
                console.error("Error syncing user:", error);
                toast.error("Unable to create account");
            }
        }

        saveUser();
    }, [isLoaded, isSignedIn, user, getToken, synced]);

    return null;
};

export default UserSyncHandler;