module.exports = [
  {
    methods: '*',
    path: '/dota/heroes',
    handler: '/api/controllers/heroes@start',
  },
];
