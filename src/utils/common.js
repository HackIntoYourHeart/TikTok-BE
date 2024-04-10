const checkUserIdInLikeList = (array, id) => {
  const index = array.indexOf(id);
  if (index === -1) {
    array.push(id);
    return array;
  } else {
    return array.remove(id);
  }
};

const checkUserUsedToLikeVideo = (arr, id) => {
  if (arr.includes(id)) {
    return { usedToLike: arr, isUsedToLike: true };
  } else {
    arr.push(id);
    return { usedToLike: arr, isUsedToLike: false };
  }
};
const handleUserPoint = (userPoint, action, ApiError, donate) => {
  switch (action) {
    case 'like':
      return (userPoint += 1);
    case 'receive':
      return (userPoint += donate);
    case 'donate':
      if (userPoint - donate > 0) {
        return { giverPoint: (userPoint -= donate) };
      } else {
        throw new ApiError(406, "You don't have enough point to donate");
      }
    default:
      break;
  }
};

module.exports = { checkUserIdInLikeList, checkUserUsedToLikeVideo, handleUserPoint };
