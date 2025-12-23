/// create user service functions
export const getUsers = async () => {
  // fetch users from jsonplaceholder
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
}   