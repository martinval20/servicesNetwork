import { onAuthStateChanged } from "firebase/auth";
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  setDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { toast } from "react-toastify";

//All of these are used to create a database collection where I'm gonna put my data
let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let interestRef = collection(firestore, "interests");
let commentsRef = collection(firestore, "comments");
let contactRef = collection(firestore, "contacts");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("¡Tu publicación se ha subido con éxito!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Important!! Remember to use "desc" to indicate the correct order
export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

// This function let me to list all users
export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

//This function let to the users post their own data
export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

//This function let us to indetificate the current user

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

//This function let to the user, update his own information
export const editProfile = (userID, payLoad) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payLoad)
    .then(() => {
      toast.success("¡Tu información ha sido actualizada!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function let me to get just one particular post 
export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


//THis function let me to get just one single user
export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};


//This function let the user show interest about one post
export const interestPost = (userId, postId, interested) => {
  try {
    let docToInterest = doc(interestRef, `${userId}_${postId}`);
    if (interested) {
      deleteDoc(docToInterest);
    } else {
      setDoc(docToInterest, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

//This functions will be use to get the count of Interest's of user
export const getInterestsByUser = (
  userId,
  postId,
  setInterested,
  setInterestsCount
) => {
  try {
    let interestQuery = query(interestRef, where("postId", "==", postId));

    onSnapshot(interestQuery, (response) => {
      let interests = response.docs.map((doc) => doc.data());
      let interestsCount = interests?.length;

      const isInterested = interests.some(
        (interest) => interest.userId === userId
      );

      setInterestsCount(interestsCount);
      setInterested(isInterested);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (postId, comment, timeStamp, name, lastname) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
      lastname,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));
    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("¡La publicación ha sido actualizada correctamente!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("¡La publicación ha sido eliminada correctamente!");
  } catch (err) {
    console.log(err);
  }
};

export const addContact = (userId, targetId) => {
  try {
    let contactToAdd = doc(contactRef, `${userId}_${targetId}`);
    setDoc(contactToAdd, { userId, targetId });
    toast.success("¡Has conectado con este usuario!");
  } catch (err) {
    console.log(err);
  }
};

export const getContacts = (userId, targetId, setIsContacted) => {
  try {
    let contactsQuery = query(contactRef, where("targetId", "==", targetId));

    onSnapshot(contactsQuery, (response) => {
      let contacts = response.docs.map((doc) => doc.data());

      const isContacted = contacts.some((contact) => contact.userId === userId);
      setIsContacted(isContacted);
    });
  } catch (err) {
    console.log(err);
  }
};
