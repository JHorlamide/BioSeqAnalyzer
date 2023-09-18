export const getAuthUser = (decodedUser: any) => {
  const authUser = JSON.parse(decodedUser)
  return authUser;
}