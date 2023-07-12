const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://h8qbvaj2kh.execute-api.ap-southeast-1.amazonaws.com/dev/graphql", // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/graphql": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
