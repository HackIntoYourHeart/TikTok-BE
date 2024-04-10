const allRoles = {
  user: ['uploadImage', 'uploadVideo'],
  admin: ['getUsers', 'manageUsers', 'uploadImage', 'uploadVideo'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
