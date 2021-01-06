const users = [];

function userJoin(id, username) {
  const user = {id, username};

  users.push(user);

  return user;
}

function userLeaves(id) {
  const index = users.findIndex(user => user.id === id);
  if(index !== 1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin, userLeaves
}