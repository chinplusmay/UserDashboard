let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
];

let tokens = {};

function generateToken() {
  return 'mock_token_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function createUser({ name, email, password }) {
  const newUser = {
    id: String(users.length + 1),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export function updateUser(id, updates) {
  const userIndex = users.findIndex((user) => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  if (updates.name) users[userIndex].name = updates.name;
  if (updates.email) users[userIndex].email = updates.email.toLowerCase();
  
  const { password: _, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
}

export function validateCredentials(email, password) {
  const user = findUserByEmail(email);
  
  if (!user || user.password !== password) {
    return null;
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function createToken(userId) {
  const token = generateToken();
  tokens[token] = userId;
  return token;
}

export function validateToken(token) {
  return tokens[token] || null;
}

export function invalidateToken(token) {
  delete tokens[token];
}

export function getUserByToken(token) {
  const userId = validateToken(token);
  if (!userId) return null;
  
  const user = findUserById(userId);
  if (!user) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
