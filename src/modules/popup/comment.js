export default class Comment {
  constructor() {
    // involvement api id
    this.apiId = 'ADpSxDpwUPgCdf9pEAJyop';
    this.requestURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${this.apiId}`;
  }

  // get data from involvement api
  getCommentsFromApi = async (id) => {
    const res = await fetch(`${this.requestURL}/comments?item_id=${id}`, {
      method: 'GET',
    });
    if (res.status === 500) {
      // if not found, return  false
      return [];
    }
    return res.json();
  }
  // display comment
  // TODO: ADD NEW COMMENT TO API

  // TODO: ADD NEW COMMENT INPUT
}