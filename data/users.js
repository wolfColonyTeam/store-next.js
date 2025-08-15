const users = [
  {
    name: "John Doe",
    email: "test@test.com",
    password: "123456",
  },
  {
    name: "John Does Wife",
    email: "test1@test.com",
    password: "123456",
  },
];

export const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};
