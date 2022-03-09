export default class Comment {
  constructor() {
    // involvement api id
    this.apiId = 'Bo7KD2ofBm7gwCZEOwMt';
    this.requestURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${this.apiId}`;
  }

  // get data from involvement api
  getCommentsFromApi = async (id) => {
    const url = `${this.requestURL}/comments?item_id=${id}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    }).then((data) => data.json());

    if (res.error) {
      return [];
    }
    return res;
  };

  addComments = async (formObj) => {
    const {
      username,
      comment,
      id,
    } = formObj;

    const url = `${this.requestURL}/comments`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  commentsCounter = (comments) => {
    if (comments) return comments.length;
    return 0;
  }
}