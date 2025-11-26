// ========== CONFIGURACIÓN MSAL ==========
const msalConfig = {
    auth: {
        clientId: "ddc5c2cb-1157-4967-bf0a-f8f9b338f9c1",
        authority: "https://login.microsoftonline.com/8d58f40b-55de-4ac5-9838-498005242b2e/",
        redirectUri: "https://ms365-cyan.vercel.app/auth.html"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// Se inicializa cuando MSAL YA ESTÁ CARGADO (gracias al orden correcto)
const msalInstance = new msal.PublicClientApplication(msalConfig);


// ========== INICIALIZADOR UI ==========
async function initializeAuth() {
    try {
        const accounts = msalInstance.getAllAccounts();

        if (accounts.length > 0) {
            updateUIForLoggedInUser(accounts[0]);
        } else {
            updateUIForLoggedOutUser();
        }
    } catch (err) {
        console.error("Error during initialization:", err);
    }
}


// ========== LOGIN / LOGOUT ==========
function loginRedirect() {
    msalInstance.loginRedirect({
        scopes: ["openid", "profile", "email"]
    });
}

function logoutRedirect() {
    const account = msalInstance.getAllAccounts()[0];

    msalInstance.logoutRedirect({
        account: account,
        postLogoutRedirectUri: "https://ms365-cyan.vercel.app/"
    });
}


// ========== UI ==========
function updateUIForLoggedInUser(account) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("welcome-msg").innerText = `Hola, ${account.username}`;
}

function updateUIForLoggedOutUser() {
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("welcome-msg").innerText = "No has iniciado sesión";
}
