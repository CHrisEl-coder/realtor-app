import axios from "axios";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import {v4 as uuidv4} from "uuid";
import { db } from "./firebase";


const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
const apiUrl = process.env.REACT_APP_OPENCAGE_URL;



export const Geolocation = async (address) => {
  if (!apiKey) {
    throw new Error("Missing Api Key");
  }

  if (!address) {
    throw new Error("Missing Address");
  }

  try {
    const response = await axios.get(
      `${apiUrl}`,
      {
        params: {
          q: address,
          key: apiKey,
        },
      }
    );

      const result = response?.data?.results[0];

      if (!result) {
        throw new Error("No result found")
      }
    
      return {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        formattedAddress: result.formatted,
      };
   
  } catch (error) {
    console.error("Error fecthng geolocation data: ", error.message || error);
    throw new Error("Failed to fetch location coordinates.");
  }
};

export const storeImage = async (image, currentUser) => {

  if (!image || !image.name) {
    throw new Error("No Image Provided")
  }

  const storage = getStorage();
  const filename = `${currentUser}-${image.name}-${uuidv4()}`;
  const storageRef  = ref(storage, filename);

  const uploadTask = uploadBytesResumable(storageRef, image);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      null,
      error => {
        reject(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((resolve)).catch(
          reject
        )
      }
    )
  })
}

export const formatCurrency = (value) => {
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

return formatter.format(value);
}

export const DeleteListing = async (id, onDelete) => {

  const confirmDelete = window.confirm("Are you sure you want to delete the listing?");

  if (confirmDelete) {
    try {

        // Delete the listing from Firestore

      const listingRef = doc(db, "listings", id);
      
      const docSnap = await getDoc(listingRef);
      if (!docSnap.exists()) {
        throw new Error("Listing does not exist");
      };

      const listingData = docSnap.data();

      if(listingData.imageUrls && Array.isArray(listingData.imageUrls)) {
        const storage = getStorage();
        
        const deleteImages = listingData.imageUrls.map(url => {
          const fileName = decodeURIComponent(new URL(url).pathname.split("/o/")[1]).split("?")[0];
          return deleteObject(ref(storage, fileName))
        })

        await Promise.all(deleteImages)
      }

       await deleteDoc(listingRef)
       toast.success("Listing deleted");
       
       if (onDelete) onDelete(id);
       
    } catch (error) {
      console.error("Error deleting listing: ", error.message || error);
      toast.error("Could not delete listing");
    }
   
   
    
  }

}