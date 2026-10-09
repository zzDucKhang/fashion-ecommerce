const API_BASE = 'http://localhost:3000/api/v1'; 

// CẬP NHẬT ADDRESS ID TỪ KẾT QUẢ CỦA FILE SEED BÊN TRÊN VÀO ĐÂY:
// CHINH LAI ADDRESS:
const users = [
  { email: 'binh.tran@fashionstore.com', password: 'Password@123', addressId: 13 }, 
  { email: 'cuc.le@fashionstore.com', password: 'Password@123', addressId: 14 }   
];

async function fetchToken(email, password) {
  const response = await fetch(`${API_BASE}/identity/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(`Login failed for ${email}`);
  return data.data.accessToken; 
}

// Truyền thêm tham số addressId vào hàm checkout
async function checkout(token, email, addressId) {
  const response = await fetch(`${API_BASE}/cart-order/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      shippingAddressId: addressId, // Sử dụng ID địa chỉ hợp lệ của riêng user này
      paymentMethod: 'COD'  
    })
  });
  
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return { email, status: response.status, data };
  } catch (err) {
    return { email, status: response.status, data: text };
  }
}

async function runRaceConditionTest() {
  try {
    console.log('1. Fetching tokens...');
    const token1 = await fetchToken(users[0].email, users[0].password);
    const token2 = await fetchToken(users[1].email, users[1].password);

    console.log('2. Firing concurrent checkouts...');
    // Gọi checkout đồng thời và truyền đúng addressId
    const results = await Promise.all([
      checkout(token1, users[0].email, users[0].addressId),
      checkout(token2, users[1].email, users[1].addressId)
    ]);

    console.log('\n--- KẾT QUẢ RACE CONDITION ---');
    results.forEach(res => {
      console.log(`User: ${res.email}`);
      console.log(`HTTP Status: ${res.status}`);
      console.log(`Response:`, res.data);
      console.log('----------------');
    });

  } catch (error) {
    console.error('Lỗi script:', error.message);
  }
}

runRaceConditionTest();