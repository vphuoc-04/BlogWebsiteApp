const IsValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
    return emailRegex.test(email);
}

export { IsValidEmail }
