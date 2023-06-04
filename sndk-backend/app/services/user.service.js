import db from '../config/database';

class UserService {
  constructor() {}

  getUserDetails = (id) => {
    return db('users').select('*').where({ id: id });
  };

  updateUserDetails = (data, id) => {
    return db('users')
      .select()
      .where({
        id: id,
      })
      .update(data);
  };
  list() {
    return db('users').select();
  }
}

export default new UserService();
