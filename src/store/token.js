export const setToken = id => {
    localStorage.setItem("token", id);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setEmail = Email => {
    let email = Email;
    let semail = email.split('.');
    email = ''
    for (let i of semail) {
        email += i
    }
    semail = email.split('@');
    email = ''
    for (let i of semail) {
        email += i
    }
    localStorage.setItem("email", email);
};

export const getEmail = () => {
    return localStorage.getItem("email");
};