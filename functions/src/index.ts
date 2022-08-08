import * as admin from "firebase-admin";

export {setUserRoles, addAdmin, removeAdmin, deleteUser} from "./users";

admin.initializeApp();
