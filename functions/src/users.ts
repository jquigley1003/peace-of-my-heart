import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const setUserRoles = functions.auth.user().onCreate(async (user) => {
  await admin.auth().updateUser(user.uid, {
    emailVerified: true,
  });
  await admin.auth().setCustomUserClaims(user.uid, {
    admin: false,
    revokeTime: 1,
  }).then(() => {
    return console.log("User Role Admin set to false for ", user.email );
  });
});

export const addAdmin = functions.https.onCall((data, context) => {
  if (context.auth) {
    /* CHECK USER FOR CONTEXT.AUTH.TOKEN.ADMIN - ONLY ADMINS AUTHORIZED */
    // if (context.auth.token.admin !== true) {
    //   return {
    //     error: `Request not authorized.
    //     You must be an admin to grant request for ${data.email}.`,
    //   };
    // }
    const userEmail = data.email;
    const userId = data.uid;
    const fullName = data.firstName + " " + data.lastName;

    return grantAdminRole(userId).then(() => {
      const users = admin.firestore().collection("users");
      return users.doc(userId).set({
        roles: {
          admin: true,
          revokeTokenTime: 0,
        },
      }, {merge: true}).then(() => {
        return {
          result: `${fullName} is now an admin! 
          User email ${userEmail} updated.`,
        };
      }).catch((err) => {
        console.log(err);
      });
    });
  } else {
    return null;
  }
});

export const removeAdmin = functions.https.onCall((data, context) => {
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized.
        You must be an admin to remove this role for ${data.email}.`,
      };
    }
    const userEmail = data.email;
    const userId = data.uid;
    const fullName = data.firstName + " " + data.lastName;
    return removeAdminRole(userId).then(() => {
      const users = admin.firestore().collection("users");
      return users.doc(userId).set({
        roles: {
          admin: false,
          revokeTokenTime: Math.round(new Date().getTime() / 1000),
        },
      }, {merge: true}).then(() => {
        return {
          result: `${fullName} removed as admin. 
          User email ${userEmail} updated.`,
        };
      }).catch((err) => {
        console.log(err);
      });
    });
  } else {
    return null;
  }
});

// automatically delete user from firebase authentication
export const deleteUser = functions.firestore.document("users/{userID}")
    .onDelete((snap, context) => {
      return admin.auth().deleteUser(snap.id)
          .then(() => console.log("Deleted user with ID:" + snap.id))
          .catch((error) => console.error(
              "There was an error while deleting user:", error));
    });

/**
 * @param {string} userId - user id
 * @return {void}
 */
function grantAdminRole(userId: string): Promise<void> {
  return admin.auth().setCustomUserClaims(userId, {
    admin: true,
    revokeTime: 0,
  }).then(() => {
    return console.log("CustomUserClaim Admin set to true for ", userId );
  });
}

/**
 * @param {string} userId - user id
 * @return {void}
 */
function removeAdminRole(userId: string): Promise<void> {
  return admin.auth().revokeRefreshTokens(userId).then(() => {
    return admin.auth().getUser(userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).then((userRecord: any) => {
    return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
  }).then((timestamp) => {
    admin.auth().setCustomUserClaims(userId, {
      admin: false,
      revokeTime: timestamp,
    });
    console.log(`Tokens revoked at: ${timestamp}`);
  });
}
