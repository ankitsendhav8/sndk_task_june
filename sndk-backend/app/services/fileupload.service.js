import db from '../config/database';

class FileuploadService {
  constructor() {}

  signup = (data) => {
    return db('users').insert(data);
  };

  getUserDetailByEmail = (email) => {
    return db('users').select('*').where('vEmail', email);
  };
  getUserDetailById = (id) => {
    return db('users').select('*').where('id', id);
  };
  updateUserAccessKey = (id, accessKey) => {
    return db('users').select('*').where('id', '=', id).update({
      vAccessKey: accessKey,
    });
  };
  logoutUser = (id) => {
    return db('users')
      .select()
      .where({
        id: id,
      })
      .update({ vAccessKey: '' });
  };
}

export default new FileuploadService();
