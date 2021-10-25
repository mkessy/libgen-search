export default {
  port: 3000,
  host: "localhost",
  libgen: {
    mirrors: {
      default: "https://libgen.is/",
      mirror1: "",
    },
    searchFields: {
      id: "id",
      title: "title",
      author: "author",
      md5: "md5",
      identifier: "identifier",
      filesize: "filesize",
    },
    searchColumns: {
      title: "title",
      identifier: "identifier",
    },
  },
};
