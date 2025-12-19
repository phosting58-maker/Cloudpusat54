
// Util: get & save single user account
function getUserAccount() {
  const raw = localStorage.getItem('userAccount');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch(e){ return null; }
}
function saveUserAccount(user) {
  localStorage.setItem('userAccount', JSON.stringify(user));
}

// Register with email verification
function register(){
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;

  if(!name || !email || !pass){
    alert('Semua field harus diisi!');
    return;
  }

  const code = ('' + Math.floor(100000 + Math.random()*900000));
  const user = {
    name,
    email,
    pass,
    verified: false,
    verificationCode: code,
    createdAt: new Date().toISOString()
  };
  saveUserAccount(user);
  localStorage.removeItem('userLogged');
  alert('Akun berhasil dibuat! Silakan verifikasi email Anda.');
  window.location.href = 'verify.html';
}

// Login
function login(){
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const user = getUserAccount();
  if(!user){
    alert('Belum ada akun terdaftar. Silakan registrasi dulu.');
    return;
  }
  if(email !== user.email || pass !== user.pass){
    alert('Email atau password salah!');
    return;
  }
  if(!user.verified){
    alert('Email Anda belum diverifikasi. Silakan verifikasi terlebih dahulu.');
    window.location.href = 'verify.html';
    return;
  }
  localStorage.setItem('userLogged','true');
  alert('Login berhasil!');
  window.location.href = 'order.html';
}

// Check login before accessing protected pages
function checkLogin(){
  if(localStorage.getItem('userLogged') !== 'true'){
    window.location.href = 'login.html';
  }
}

// Logout
function logout(){
  localStorage.removeItem('userLogged');
  alert('Anda telah logout.');
  window.location.href = 'login.html';
}
