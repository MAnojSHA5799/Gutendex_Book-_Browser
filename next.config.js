module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/books',
          destination: 'http://skunkworks.ignitesol.com:8000/books',
        },
      ];
    },
  };