const parseHTML = html => {
  return document
    .createRange()
    .createContextualFragment(html);
};

module.exports = {
  parseHTML
};
