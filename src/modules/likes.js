const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bo7KD2ofBm7gwCZEOwMt/likes/';

const sendLike = async (data) => {
  const response = await fetch(LIKE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const status = await response;
  return status;
};

const getlikes = async () => {
  const response = await fetch(LIKE_URL);
  const likesList = await response.json().catch(() => false);
  if (!likesList) return false;
  const likesObj = {};
  likesList.forEach((item) => {
    likesObj[item.item_id] = item.likes;
  });
  return likesObj;
};

export { sendLike, getlikes };
