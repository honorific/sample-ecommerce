import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(12);

export default salt;
