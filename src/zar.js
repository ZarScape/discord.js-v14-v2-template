// src/zar.js
require('dotenv').config({ quiet: true });
const { ClusterManager } = require('discord-hybrid-sharding');
const path = require('path');
const config = require('./config/config.json');

const manager = new ClusterManager(
  path.join(__dirname, 'index.js'),
  {
    totalShards: 'auto',
    shardsPerClusters: 2,
    totalClusters: 'auto',
    mode: 'process',
    token: process.env.TOKEN
  }
);

manager.on('clusterCreate', cluster => {
  console.log(`Cluster ${cluster.id} created`);
});

manager.spawn({ timeout: -1 });
