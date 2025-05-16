export const ROUTES = {
  HOME: "home",
  ADMIN: {
    DASHBOARD: "admin.dashboard",
    SETTINGS: {
      PROFILE: {
        EDIT: "admin.profile.edit",
        UPDATE: "admin.profile.update",
        DESTROY: "admin.profile.destroy",
      },
      PASSWORD: {
        EDIT: "admin.password.edit",
        UPDATE: "admin.password.update",
      },
      APPEARANCE: "admin.appearance",
    },
  },
  AUTH: {
    REGISTER: "register",
    LOGIN: "login",
    LOGOUT: "logout",
    PASSWORD: {
      REQUEST: "password.request",
      EMAIL: "password.email",
      RESET: "password.reset",
      STORE: "password.store",
      CONFIRM: "password.confirm",
    },
    VERIFICATION: {
      NOTICE: "verification.notice",
      VERIFY: "verification.verify",
      SEND: "verification.send",
    },
  },
};
