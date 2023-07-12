import { makeVar } from "@apollo/client";

// LOCAL VALUES
export const loginUser = makeVar(localStorage.getItem("loginUser"));

// CREATE MOMENT
export const momentURL_ID = makeVar(null);
export const titleVar = makeVar("test");
export const momentFormVar = makeVar({});
// export const momentFormVar = makeVar({
//   "id": "cc854c4e-c89c-4faf-a4fe-0cc10a537b65",
//   "date": "2023-03-26 00:00:00",
//   "title": "My Greatest Travel",
//   "content": "I travelled to Vietnam",
//   "commentCount": null,
//   "likeCount": null,
//   "media": [],
//   "__typename": "Moment",
// });
export const momentImagesVar = makeVar({
  0: { id: 0, visible: false },
  1: { id: 1, visible: false },
  2: { id: 2, visible: false },
});

export const onPreviewVar = makeVar(null);
export const uploadingVar = makeVar(false);

//HIGHLIGHTS
export const momentHL_Var = makeVar([]);
export const onPreviewHLVar = makeVar(null);
export const titleHLVar = makeVar("test");
// export const highlightFormVar = makeVar({});
export const highlightFormVar = makeVar({
  // "id": "cc854c4e-c89c-4faf-a4fe-0cc10a537b65",
  // "date": "2023-03-26 00:00:00",
  // "supplier": "Supplier 1",
  // "title": "My Greatest Travel",
  // "review": "I travelled to Vietnam",
  // "category": "category-sample",
  // "rating": "9",
  // "package_avail": "9",
  // "commentCount": null,
  // "likeCount": null,
  // "media": [],
});
export const highlightImagesVar = makeVar({
  0: { id: 0, visible: false },
  1: { id: 1, visible: false },
  2: { id: 2, visible: false },
});

// PAGINATION VAR
export const cursorVar = makeVar([""]);
export const disabledNextVar = makeVar(false);
export const perPageVar = makeVar(10);
export const queryVar = makeVar("");
export const pageVar = makeVar(1);
export const lastPageVar = makeVar(1);

// FILTER
export const filterIsActiveVar = makeVar("");
export const filterWithAccessContVar = makeVar("");
export const filterDeletedVar = makeVar(false);
export const identifierKeyVar = makeVar("");
export const specialVar = makeVar("");

// NOTIFICATION
export const notifAlertVar = makeVar(false);
export const notifMessageVar = makeVar({ message: "test notif", type: "success" });

//MODAL
export const modalShowVar = makeVar(false);

// LOADING VAR
export const isLoadingVar = makeVar(false);
export const isLoadingModalVar = makeVar(false);

// API
export const allApiVar = makeVar([]);
export const permissionNewVar = makeVar();

// ROLE
export const apisVar = makeVar();
export const api_permissionsVar = makeVar({});

//AUTH
export const authVar = makeVar(false);
export const authCheckVar = makeVar(true);
export const rememberMeVar = makeVar(true);

// ------ ACCOUNTS ----
export const rolesVar = makeVar([]);
export const denseVar = makeVar(true);

//sort
export const orderVar = makeVar("asc");
export const orderByVar = makeVar("id");

//access key
export const newGenAccessKeyVar = makeVar(null);

// MPIN
export const initialMpinReqVar = makeVar({});
export const searchMpinReqVar = makeVar({});
export const statusVar = makeVar(null);
