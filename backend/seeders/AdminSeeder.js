import { database } from '../database.js';
import bcrypt from 'bcrypt'

const SaltRounds = 10;
const AdminSeeder = async () => {
    const HashedPassword = await bcrypt.hash('', SaltRounds)
    const AdminData = {
        firstname: '',
        lastname: '',
        username: '',
        bio: '',
        avatar: '',
        email: '',
        backupemail: null,
        password: HashedPassword
    }

    const query = "INSERT INTO admin(`firstname`, `lastname`, `username`, `bio`, `avatar`, `email`, `backupemail`, `password`)VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    database.query(query, Object.values(AdminData), (err, data) => {
        if (err) { console.error('Failed to seed admin:', err); }
        else { console.log('Admin seeded successfully:', data); }
    })
}

AdminSeeder();