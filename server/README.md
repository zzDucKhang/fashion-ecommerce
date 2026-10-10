# fashion-ecommerce
chạy lệnh này để tạo table 
npx prisma generate
npx prisma migrate dev --name init

-----seed data: 
npx prisma db seed
node src/database/seeds/seed.js

------xóa db tạo mới: 
npx prisma db push
npx prisma generate



---payment:
B1: https://dashboard.ngrok.com/signup                            : login
    https://dashboard.ngrok.com/get-started/your-authtoken.       :  copy token

B2: npx ngrok config add-authtoken <TOKEN_CUA_BAN>                : dán vào terminal
B3: npx ngrok http 3000                                           : chạy terminal
