const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { handleUserPoint } = require('../utils/common');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserPoint = async (userId, giverId, action, donate) => {
  const user = await getUserById(userId);
  const giver = await getUserById(giverId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  let userPoint = user.userPoint;
  switch (action) {
    case 'like':
      if (userId == giverId) {
        Object.assign(user, { userPoint });
      } else {
        userPoint = handleUserPoint(user.userPoint, action);
        Object.assign(user, { userPoint });
      }
      break;
    case 'donate':
      const point = handleUserPoint(giver.userPoint, action, ApiError, donate);
      Object.assign(user, { userPoint: user.userPoint + donate });
      Object.assign(giver, { userPoint: point.giverPoint });
      break;
    case 'receive':
      userPoint = handleUserPoint(user.userPoint, action);
      Object.assign(user, { userPoint });
      break;
    default:
      break;
  }
  await user.save();
  await giver.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

/**
 * @param {Request} req - Đối tượng yêu cầu Express.
 * @param {Response} res - Đối tượng phản hồi Express.
 * @param {NextFunction} next - Middleware tiếp theo.
 */
const getUserRankings = async () => {
  try {
    const userRankings = await User.find().sort({ userPoint: -1 });
    return userRankings;
  } catch (error) {
    console.error(error);
  }
};

const updateRanking = () => {
  User.find({})
    .sort({ userPoint: -1 })
    .exec((err, users) => {
      if (err) {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
        return;
      }

      let rank = 1;
      let previousUserPoint = -1;

      users.forEach((user) => {
        if (user.userPoint !== previousUserPoint) {
          previousUserPoint = user.userPoint;
          user.yesterdayRank = rank;
        }
        rank++;
      });

      // Bước 3: Lưu người dùng sau khi cập nhật
      users.forEach((user) => {
        user.save((saveErr) => {
          if (saveErr) {
            console.error('Lỗi khi lưu người dùng:', saveErr);
          }
        });
      });
    });
};

/**
 * Search users by displayName
 * @param {string} displayName
 * @returns {Promise<Array<User>>}
 */
const searchUsersByDisplayName = async (displayName) => {
  const users = await User.find({ displayName: { $regex: displayName, $options: 'i' } });
  return users;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserRankings,
  updateUserById,
  updateUserPoint,
  updateRanking,
  deleteUserById,
  searchUsersByDisplayName,
};
