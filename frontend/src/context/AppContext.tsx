import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext({});
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const AppContextProvider = (props) => { 


    const { getToken } = useAuth();
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState<string | boolean>(false);
    const { isSignedIn } = useUser();
    const{openSignIn} = useClerk();


   const removeBg = async (selectedImage) => {
     try {
         if (!isSignedIn) {
           return openSignIn()
         }
         setImage(selectedImage);
         setResultImage(false);

         const token = await getToken();
         const formData = new FormData();
         selectedImage && formData.append('file', selectedImage);
         const {data: base64Image } = await axios.post(`${backendUrl}/images/remove-background`, formData, {
             headers: {
                Authorization: `Bearer ${token}`,
              }
         }) 

         setResultImage(`data:image/png;base64,${base64Image}`);

     } catch (error) {
         console.error("Error removing background:", error);
         toast.error("Failed to remove background. Please try again.");
         setImage(false);
         setResultImage(false);
     }
   };

    const contextValue = {
        backendUrl,
        image,
        setImage,
        resultImage,
        setResultImage,
        removeBg
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;