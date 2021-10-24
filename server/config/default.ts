export default {
  port: 3000,
  host: "localhost",
  libgen: {
    mirrors: {
      default: "https://libgen.is/",
    },
    searchFields: {
      id: "id",
      title: "title",
      author: "author",
      md5: "md5",
      identifier: "identifier",
      filesize: "filesize",
    },
  },
};
