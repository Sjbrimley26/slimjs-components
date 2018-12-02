const createSidebar = () => {
  const sidebar = document.createElement("side-bar");
  sidebar.setAttribute(
    "data-links",
    `[
      {
        "icon": "https://lh3.ggpht.com/A0x3jzuH1qRkE10HcTiT4qQr_6iAqVg-CTsoIqxnoIFyv92V91WI3KqiVlOvLtfoMRg",
        "label": "Home",
        "action": "../"
      },
      {
        "icon": "https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/question-mark-2-128.png",
        "action": "../about",
        "label": "About"
      },
      {
        "icon": "https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/question-mark-2-128.png",
        "action": "openMenu Menu 1",
        "label": "About"
      },
      {
        "icon": "https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/question-mark-2-128.png",
        "action": "openMenu Menu 2",
        "label": "About"
      },
      {
        "icon": "https://cdn2.iconfinder.com/data/icons/flaticons-stroke/16/question-mark-2-128.png",
        "action": "../about",
        "label": "About"
      }
    ]`
  );
  return () => {
    return sidebar;
  };
};

const constructor = createSidebar();

module.exports = constructor;
