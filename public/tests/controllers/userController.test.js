const app = require('../../../index');
const supertest = require('supertest');
const userModel = require('../../models/userModel');
const leaveModel = require('../../models/leaveModel');
const emailHelper = require('../../helpers/email');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// mock logger to remove test logs
jest.mock('../../helpers/logger', () => {
  return {
    log: {
      out: jest.fn(),
      debug: jest.fn(),
      error: jest.fn()
    }
  };
});
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
  verify: jest.fn().mockReturnValue({ foo: 'bar' }) // overwrite verify
}));

jest.mock('../../models/userModel', () => {
  return {
    createUser: jest.fn().mockImplementation(async () => {}),
    getUsers: jest.fn().mockImplementation(async () => {}),
    editUser: jest.fn().mockImplementation(async () => {}),
    deleteUserById: jest.fn().mockImplementation(async () => {}),
    enableUser: jest.fn().mockImplementation(async () => {}),
    disableUser: jest.fn().mockImplementation(async () => {}),
    findUserByEmail: jest.fn().mockImplementation(async () => {}),
    generatePassword: jest.fn().mockImplementation(async () => {}),
    getB2BUsers: jest.fn().mockImplementation(async () => []),
    findUserById: jest.fn().mockImplementation(async () => {
      return {};
    }),
    getUserDetails: jest.fn().mockImplementation(async () => {
      return {};
    }),
    changeUserRole: jest.fn().mockImplementation(async () => {}),
    updateB2BUserStatus: jest.fn().mockImplementation(async () => {}),
    changePassword: jest.fn().mockImplementation(async () => {}),
    verifyPassword: jest.fn().mockImplementation(async () => {})
  };
});

jest.mock('../../models/leaveModel', () => {
  return {
    createLeaveRecordByEmployeeId: jest.fn().mockImplementation(async () => {})
  };
});

jest.mock('../../helpers/email', () => {
  return {
    sendEmail: jest.fn().mockImplementation(async () => {})
  };
});

let user = {
  id: 1,
  firstName: 'Meryl',
  lastName: 'Seow',
  email: 'merylseoww+3@gmail.com',
  role: 'INTERN',
  tier: 'Tier 5',
  password: 'password'
};

test('Create user', async () => {
  userModel.createUser.mockImplementation(async () => {
    return {};
  });
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(user)
    .then(() => {
      expect(200);
    });

  //tier undefined
  const userNoTier = {
    firstName: 'Meryl',
    lastName: 'Seow',
    email: 'merylseoww+3@gmail.com',
    role: 'INTERN',
    password: 'password'
  };
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(userNoTier)
    .then(() => {
      expect(200);
    });
});

test('Create user, user already exist', async () => {
  userModel.createUser.mockImplementation(async () => {
    return {};
  });

  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(user)
    .then(() => {
      expect(400);
    });
});

test('Create user, send email error', async () => {
  userModel.createUser.mockImplementation(async () => {
    return {};
  });

  userModel.findUserByEmail.mockImplementation(async () => {});
  emailHelper.sendEmail.mockImplementation(async () => {
    throw new Error();
  });
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(user)
    .then(() => {
      expect(400);
    });
});

test('Create user, model error', async () => {
  userModel.createUser.mockImplementation(async () => {
    throw new Error();
  });

  userModel.findUserByEmail.mockImplementation(async () => {});
  leaveModel.createLeaveRecordByEmployeeId.mockImplementation(async () => {
    return {};
  });
  emailHelper.sendEmail.mockImplementation(async () => {});
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(user)
    .then(() => {
      expect(400);
    });
});

test('Create user, model error', async () => {
  userModel.createUser.mockImplementation(async () => {});

  userModel.findUserByEmail.mockImplementation(async () => {});
  leaveModel.createLeaveRecordByEmployeeId.mockImplementation(async () => {
    throw new Error();
  });
  emailHelper.sendEmail.mockImplementation(async () => {});
  await supertest(app)
    .post('/user')
    .set('origin', 'jest')
    .send(user)
    .then(() => {
      expect(400);
    });
});

test('Create B2B user', async () => {
  const b2bUser = {
    firstName: 'B2B',
    lastName: 'User',
    email: 'b2btest@gmail.com',
    status: 'PENDING',
    company: 'ALGOTECH',
    contactNo: '+6591111111'
  };
  await supertest(app)
    .post('/user/b2b')
    .set('origin', 'jest')
    .send(b2bUser)
    .then(() => {
      expect(200);
    });
});

test('Create B2B user, user email exists', async () => {
  const b2bUser = {
    firstName: 'B2B',
    lastName: 'User',
    email: 'b2btest@gmail.com',
    status: 'PENDING',
    company: 'ALGOTECH',
    contactNo: '+6591111111'
  };

  userModel.findUserByEmail.mockImplementation(async () => {
    return b2bUser;
  });

  await supertest(app)
    .post('/user/b2b')
    .set('origin', 'jest')
    .send(b2bUser)
    .then(() => {
      expect(200);
    });
});

test('Create B2B user, model error', async () => {
  const b2bUser = {
    firstName: 'B2B',
    lastName: 'User',
    email: 'b2btest@gmail.com',
    status: 'PENDING',
    company: 'ALGOTECH',
    contactNo: '+6591111111'
  };

  userModel.findUserByEmail.mockImplementation(async () => {});
  userModel.createUser.mockImplementation(async () => {
    throw new Error();
  });

  await supertest(app)
    .post('/user/b2b')
    .set('origin', 'jest')
    .send(b2bUser)
    .then(() => {
      expect(400);
    });
});

test('Get one user', async () => {
  const verify = jest.spyOn(jwt, 'verify');
  verify.mockImplementation(() => () => user);

  await supertest(app)
    .get('/user')
    .set('origin', 'jest')
    .set('x-access-token', 'test')
    .then(() => {
      expect(200);
    });
});

test('Get one user,find user error', async () => {
  const verify = jest.spyOn(jwt, 'verify');
  verify.mockImplementation(() => () => user);

  userModel.findUserById.mockImplementation(() => {
    throw new Error();
  });

  await supertest(app)
    .get('/user')
    .set('origin', 'jest')
    .set('x-access-token', 'test')
    .then(() => {
      expect(400);
    });
});

test('Get user details', async () => {
  await supertest(app)
    .get('/user/details/2')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get user details, get user details error', async () => {
  userModel.getUserDetails.mockImplementation(() => {
    throw new Error();
  });
  await supertest(app)
    .get('/user/details/2')
    .set('origin', 'jest')
    .then(() => {
      expect(400);
    });
});

test('Auth user', async () => {
  const body = {
    email: 'merylseoww+3@gmail.com',
    password: 'password'
  };

  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });
  await supertest(app)
    .post('/user/auth')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Auth user, user disabled/rejected/pending', async () => {
  const body = {
    email: 'merylseoww+3@gmail.com',
    password: 'password'
  };
  const encryptedPassword = await bcrypt.hash('password', 10);
  user.status = 'DISABLED';
  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });
  await supertest(app)
    .post('/user/auth')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(400);
    });

  user.status = 'REJECTED';
  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });
  await supertest(app)
    .post('/user/auth')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(400);
    });

  user.status = 'PENDING';
  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });
  await supertest(app)
    .post('/user/auth')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(400);
    });

  user.status = 'ACTIVE';
  user.password = encryptedPassword;
  userModel.findUserByEmail.mockImplementation(async () => {
    return user;
  });

  await supertest(app)
    .post('/user/auth')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get all users', async () => {
  userModel.getUsers.mockImplementation(() => {
    return [user];
  });
  const verify = jest.spyOn(jwt, 'verify');
  verify.mockImplementation(() => () => user);

  await supertest(app)
    .get('/user/all')
    .set('origin', 'jest')
    .set('x-access-token', 'test')
    .then(() => {
      expect(200);
    });
});

test('Get all users, model error', async () => {
  userModel.getUsers.mockImplementation(() => {
    throw new Error();
  });
  const verify = jest.spyOn(jwt, 'verify');
  verify.mockImplementation(() => () => user);

  await supertest(app)
    .get('/user/all')
    .set('origin', 'jest')
    .set('x-access-token', 'test')
    .then(() => {
      expect(400);
    });
});

test('Delete user', async () => {
  await supertest(app)
    .delete('/user/1')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Edit user', async () => {
  const editedUser = {
    id: 1,
    firstName: 'Test',
    lastName: 'Two',
    email: 'test2@gmail.com',
    role: 'ADMIN'
  };
  await supertest(app)
    .put('/user')
    .set('origin', 'jest')
    .send(editedUser)
    .then(() => {
      expect(200);
    });
});

test('Enable user', async () => {
  await supertest(app)
    .put('/user/enable/1')
    .set('origin', 'jest')
    .then((response) => {
      expect(response.body).toStrictEqual({ message: 'User enabled' });
    });
});

test('Disable user', async () => {
  await supertest(app)
    .put('/user/disable/1')
    .set('origin', 'jest')
    .then((response) => {
      expect(response.body).toStrictEqual({ message: 'User disabled' });
    });
});

test('Change user role', async () => {
  await supertest(app)
    .put('/user/role/1/intern')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Send forget email password', async () => {
  const body = {
    recipientEmail: ''
  };
  await supertest(app)
    .post('/user/forgetpw')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Update password (same password)', async () => {
  const body = {
    userEmail: '',
    currentPassword: 'password',
    newPassword: 'password'
  };
  await supertest(app)
    .post('/user/updatepw')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Update password (user does not exist) ', async () => {
  const body = {
    userEmail: '',
    currentPassword: 'password',
    newPassword: 'password2'
  };

  await supertest(app)
    .post('/user/updatepw')
    .send(body)
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Approve b2b user', async () => {
  await supertest(app)
    .put('/user/approve/1')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Reject b2b user', async () => {
  await supertest(app)
    .put('/user/reject/1')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get all B2B users', async () => {
  await supertest(app)
    .get('/user/b2b/all')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get all pending B2B users', async () => {
  await supertest(app)
    .get('/user/b2b/pending')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get all non B2B users', async () => {
  await supertest(app)
    .get('/user/nonb2b/all')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});

test('Get number of users', async () => {
  await supertest(app)
    .get('/user/pending/count')
    .set('origin', 'jest')
    .then(() => {
      expect(200);
    });
});
