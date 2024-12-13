const DisplayAvatar = (avatar) => {
    const DefaultAvatar = (string) => { 
        const Pattern = /^https?:\/\//i; 
        return !!Pattern.test(string);
    }
    
    if (avatar) {
        if (DefaultAvatar(avatar)) {
            return <img src = { avatar } alt = "" />
        }
        else {
            return <img src = { `../upload/admin/img/${avatar}` } alt = "" />
        }
    }
}

const defaultAvatar = 'https://imgur.com/AhaZ0qB.jpg';

export { DisplayAvatar, defaultAvatar }