export const markupImages = array => {
  return array
    .map(el => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = el;
      return `
    <div class="photo-card">
        <a href='${largeImageURL}'>
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width= '400' height='300'/>
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`;
    })
    .join('');
};
