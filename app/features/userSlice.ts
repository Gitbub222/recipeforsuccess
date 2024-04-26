import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { FieldValue, doc, collection, updateDoc } from 'firebase/firestore';


export const addRecipeToFavorites = createAsyncThunk(
  'user/addRecipeToFavorites',
  async (recipeId: number, uid) => {
    const userId = uid
    const usersCollection = collection(db, 'users');

    await updateDoc(doc(usersCollection as any, userId as any), {
      favorites: (FieldValue as any).arrayUnion(recipeId)
    });

    return recipeId; // Return the recipe ID for UI updates
  }
);

export const removeRecipeFromFavorites = createAsyncThunk(
  'user/removeRecipeFromFavorites',
  async (recipeId: number, uid) => {
    const userId = uid
    const usersCollection = collection(db as any, 'users');

    await updateDoc(doc(usersCollection as any, userId as any), {
      favorites: (FieldValue as any).arrayRemove(recipeId)
    });

    return recipeId;
  }
);


export interface USER {
  uid: any,
  email: string,
  firstName: string,
  lastName: string,
  favorites: []
}

const initialState = {
  isLoggedIn: false,
  user: null as USER | null,
  savedRecipes: new Array(), //  Add savedRecipes state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log("FAVS: ", state.user?.favorites)
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.savedRecipes = []; // Clear saved recipes on logout 
    },
    addRecipe: (state: any, action: any) => {
      // Assuming your user object has a favorites array
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            favorites: [...state.user.favorites, action.payload]
          }
        };
      } else {
        return state;  // Return unchanged state if the user is undefined
      }
    },
    removeRecipe: (state: any, action: any) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            favorites: state.user.favorites.filter((id: any) => id !== action.payload)
          }
        };
      } else {
        return state;
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecipeToFavorites.fulfilled, (state, action) => {
        // Successfully added to Firestore; you might not need to update Redux state
      })
      .addCase(addRecipeToFavorites.rejected, (state, action) => {
        // Handle error adding to Firestore 
      })
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        // ... (Similar to adding)
      })
      .addCase(removeRecipeFromFavorites.rejected, (state, action) => {
        // ... (Handle error)
      });
  },
});

export const { setUser, clearUser, addRecipe, removeRecipe } = userSlice.actions;
export default userSlice.reducer;
