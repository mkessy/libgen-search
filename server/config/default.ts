export default {
  port: 3000,
  host: "localhost",
  libgen: {
    mirrors: {
      default: "https://libgen.fun/",
    },
    searchFields: {
      title: "title",
      author: "author",
      md5: "md5",
      identifier: "identifier",
      filesize: "filesize",
    },
  },
};
