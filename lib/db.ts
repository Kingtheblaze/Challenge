/**
 * Local Database System (Browser-Based)
 * Used to ensure the application is 100% functional without external Supabase connectivity.
 */

export const localDB = {
  // Key for local storage
  KEY: "go_viral_db",

  // Initialize DB if not exists
  _init() {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify({
        users: [],
        analyses: [],
        currentUser: null
      }));
    }
  },

  // Get current state
  _get() {
    this._init();
    return JSON.parse(localStorage.getItem(this.KEY) || "{}");
  },

  // Save state
  _save(data: any) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  // Auth: Signup
  signUp(email: string, password: string) {
    const db = this._get();
    if (db.users.find((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser = { 
      id: Math.random().toString(36).substr(2, 9), 
      email, 
      password, 
      isPro: false,
      created_at: new Date().toISOString()
    };
    db.users.push(newUser);
    db.currentUser = newUser;
    this._save(db);
    return newUser;
  },

  // Auth: Login
  login(email: string, password: string) {
    const db = this._get();
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    db.currentUser = user;
    this._save(db);
    return user;
  },

  // Auth: Logout
  logout() {
    const db = this._get();
    db.currentUser = null;
    this._save(db);
  },

  // Auth: Get Current
  getCurrentUser() {
    const db = this._get();
    return db.currentUser;
  },

  // Subscription: Upgrade
  upgrade(userId: string) {
    const db = this._get();
    const user = db.users.find((u: any) => u.id === userId);
    if (user) {
      user.isPro = true;
      if (db.currentUser?.id === userId) {
        db.currentUser.isPro = true;
      }
      this._save(db);
    }
    return user;
  },

  // Subscription: Downgrade
  downgrade(userId: string) {
    const db = this._get();
    const user = db.users.find((u: any) => u.id === userId);
    if (user) {
      user.isPro = false;
      if (db.currentUser?.id === userId) {
        db.currentUser.isPro = false;
      }
      this._save(db);
    }
    return user;
  }
};
