const createSidebar = require('../../components/main/BarAndLinks');

module.exports = (app, router) => () => {
  const header = document.createElement('header-bar');
  header.setAttribute('data-title', 'Rewards.Radio');
  const sidebar = createSidebar();
  const body = document.createElement('main-content');
  body.setAttribute(
    'data-contents',
    `<p style="color:white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem mollis aliquam ut porttitor leo a. Gravida dictum fusce ut placerat orci nulla pellentesque. <br/> Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Tincidunt nunc pulvinar sapien et ligula. Convallis tellus id interdum velit laoreet id donec ultrices. Lectus arcu bibendum at varius. Pellentesque massa placerat duis ultricies lacus sed turpis. Eleifend quam adipiscing vitae proin sagittis nisl. Id porta nibh venenatis cras. Non curabitur gravida arcu ac tortor dignissim convallis. Viverra nam libero justo laoreet sit amet cursus sit. Tempus quam pellentesque nec nam aliquam. Turpis egestas sed tempus urna et. Cursus risus at ultrices mi tempus imperdiet. Auctor eu augue ut lectus arcu bibendum at varius vel. Eu mi bibendum neque egestas congue. Eu mi bibendum neque egestas. In est ante in nibh mauris cursus mattis.

        Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Porta non pulvinar neque laoreet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Amet cursus sit amet dictum sit amet justo donec. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Nulla facilisi etiam dignissim diam quis enim. Eget magna fermentum iaculis eu. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Leo vel fringilla est ullamcorper eget. Vitae et leo duis ut diam quam. Dui ut ornare lectus sit amet est placerat. At elementum eu facilisis sed odio morbi quis commodo.</p>
        `
  );
  app.appendChild(header);
  app.appendChild(body);
  app.appendChild(sidebar);
};
