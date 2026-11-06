require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@lamsa-simicard.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with this email');
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      name: 'Admin',
      phone: '0500000000', // You can change this
      email: 'admin@lamsa-simicard.com',
      password: 'Lamsa@2025!', // Will be hashed automatically by the pre-save hook
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: Lamsa@2025!');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

createAdmin();
