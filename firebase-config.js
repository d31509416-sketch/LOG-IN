
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyADj4RiYIraSIpeVCfi6YAjDzXWtjXmlOY",
  authDomain: "log-in-54565.firebaseapp.com",
  projectId: "log-in-54565",
  appId: "1:192864638374:web:3faa3b62db22e242212b67"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
