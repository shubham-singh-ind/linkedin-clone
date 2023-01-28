// import { auth, provider } from ".firebase";

import db, { auth, provider, storage } from "../_firebase";
import { SET_USER, SET_LOADING_STATUS, SET_ARTICLES } from "./actiontype";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles: articles,
});

export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress ${progress}%`);
          }
        },
        (error) => console.log("Error: ", error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          console.log("Download URL: ", downloadURL);
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            sharedImage: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        sharedImage: "",
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(setArticles(payload));
      });
  };
}
