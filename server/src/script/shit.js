
const bcrypt = require('bcrypt');
const hash = "$2a$10$wT8h5uKjL66o70FmHsz5hO1tH5yQ82M60jYmRrn4PekgPms36eTWW";


const password = "Password@123";
const saltRounds = 10; // Số vòng lặp chuẩn thường dùng

bcrypt.hash(password, saltRounds).then(hash => {
    console.log("Copy chuỗi này dán vào database:", hash);
});