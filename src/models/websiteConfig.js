const mongoose = require('mongoose');

const websiteConfigSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  adminPhoneNumber: String,
  // Add more configuration fields as needed
});

const WebsiteConfig =
  mongoose.models.WebsiteConfig ||
  mongoose.model('WebsiteConfig', websiteConfigSchema);

module.exports = WebsiteConfig;
